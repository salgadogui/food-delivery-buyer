import { defineStore } from 'pinia'
import type { Product } from '@/types/product'
import FetchService from "@/fetchService";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
 products: Product[];
}

export const useCartStore = defineStore('cart', {
  state: (): State  => ({
    products: JSON.parse(localStorage.getItem('cartProducts')) || '' 
  }),
  getters: {
	  productCount(state: State): number {
		return state.products.reduce((total, product) => total + product.quantity, 0)
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
    confirmOrder(userId: string) {
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
        }
      };

      fetchService.create(`stores/${storeId}/orders`, orderPayload)
        .then(response => {
          // Handle success, e.g., show confirmation message, clear cart, etc.
          this.clearCart();
          console.log('Order confirmed successfully:', response);
        })
        .catch(error => {
          // Handle error
          console.error('Error confirming order:', error);
        });
    },
    clearCart() {
      this.products = [];
	  localStorage.setItem('cartProducts', JSON.stringify(this.products));
    }
  }
})

