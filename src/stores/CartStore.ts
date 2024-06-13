import { defineStore } from 'pinia'
import type { Product } from '@/types/product'


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
    }
  }
})

