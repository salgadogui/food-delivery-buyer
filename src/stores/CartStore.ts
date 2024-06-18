import { defineStore } from 'pinia'
import type { Product } from '@/types/product'
import FetchService from "@/fetchService";
import { fetchEventSource } from '@microsoft/fetch-event-source';

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
 products: Product[];
}

export const useCartStore = defineStore('cart', {
  state: (): State  => ({
    products: JSON.parse(localStorage.getItem('cartProducts')) || [] 
  }),
  getters: {
    productCount(state: State): number {
      return state.products.reduce((total, product) => total + product.quantity, 0);
    },

    getValue(state: State): number {
      return state.products.reduce((total, product) => {
        return total + (product.price * product.quantity);
      }, 0);
    }
  },
  actions: {
    addProduct(product: Product) {
      const existingProduct = this.products.find(p => p.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += product.quantity
      } else {
        this.products.push(product)
		localStorage.setItem('cartProducts', JSON.stringify(this.products));
      }
    },
    confirmOrder(userId: string, paymentDetails: any) {
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      if (this.products.length === 0) {
        console.error('Cart is empty');
        return;
      }

      const storeId = this.products[0].store_id;	  

      const productsInCart = this.products.map(product => ({
        product_id: product.id,
        quantity: product.quantity
      }));

      const orderPayload = {
        order: {
          user_id: userId,
          order_items_attributes: productsInCart
        },
		payment: paymentDetails
      };

      fetchService.create(`stores/${storeId}/orders`, orderPayload)
        .then(response => {
          this.clearCart();
          console.log('Order confirmed successfully:', response);
		  this.listenToOrderStatus(response.id, response.store_id);
        })
        .catch(error => {
          console.error('Error confirming order:', error);
        });
    },
	listenToOrderStatus(orderId: string, storeId: string) {
		fetchEventSource(`http://localhost:3000/stores/${storeId}/orders/${orderId}/status`, {
		  method: 'GET',
		  headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer "${authToken}"`,
			'X-API-KEY': import.meta.env.VITE_X_API_KEY
		  },
		  async onopen(response) {
			if (response.ok) {
			  console.log("connected!");
			  return; 
			}
		  },
		  onmessage(event) {
			const data = JSON.parse(event.data);
			console.log(data);

			switch (data.status) {
			  case 'order_placed':
				  return data
				break;
			  case 'preparing_order':
				  return data
				break;
			  case 'out_for_delivery':
				  return data
				break;
			  case 'delivered':
				  return data
				break;
			  case 'payment_failed':
				  return data
				break;
			}
		  },
		  onclose() {
			console.log('Connection closed');
		  },
		  onerror(err) {
			console.error('EventSource failed:', err);
		  }
		});
	},
	clearCart() {
      this.products = [];
	  localStorage.setItem('cartProducts', JSON.stringify(this.products));
    }
  }
})

