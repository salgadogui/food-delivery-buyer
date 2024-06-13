import { defineStore } from "pinia";
import FetchService from "@/fetchService";
import type { Product } from "@/types/product";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
  products: Product[];
}

export const useProductStore = defineStore('product', {
  state: (): State => ({
    products: [],
  }),

  getters: {
    getProducts: (state): Product[] => state.products
  },

  actions: {
    async fetchProducts() {
      const data: Product[] = await fetchService.fetchAll('products');
      this.products = data;
    },
	async fetchStoreProducts(storeId: string) {
		const data: Product[] = await fetchService.fetchAll<Product>(`stores/${storeId}/products`)
		return data
	},
    async createProduct(
      productName: string, productPrice: number, storeId: number) {
        await fetchService.create<Product>(`stores/${storeId}/products`, { name: productName, price: productPrice, store_id: storeId });
        await this.fetchProducts();
    },
	async deleteProduct(productId: string, storeId: string){ 
		await fetchService.delete(`stores/${storeId}/products`, productId);
		await this.fetchProducts();
	},
	async updateProduct(productId: string, productName: string, productPrice: number, storeId: number) {
		await fetchService.update<Product>(`stores/${storeId}/products`, productId, { name: productName, price: productPrice, store_id: storeId})
	}
  }
});
