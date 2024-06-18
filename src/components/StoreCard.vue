<template>
      <div class="product__card">
        <div class="card__preview" style="background-image: url(./src/assets/img/products/food2.jpg);">
        </div>
        <div class="card__content">
			<div class="card__content-left">
			  <div class="card__content--title" @click="openStore">{{ store.name }}</div>
            <div class="card__content--info">
              <div class="card__content--price" :class="stateClass">
              	{{ store.state }}  
              </div>
            </div>
         </div>
        </div>
      </div>

	  <Dialog v-model:visible="showDialog" modal header="Store Products" :style="{ width: '35rem' }">
		<div v-if="products">
		  <div v-for="product in products" :key="product.id" class="flex items-center gap-4 mb-12">
			<span>{{ product.name }}</span>
			<InputNumber v-model="productQuantities[product.id]" :min="0" class="flex-auto" />
		  </div>
		  <Button label="Add to Cart" @click="addToCart" />
		</div>
		<div v-else>
		  Loading...
		</div>
	  </Dialog>
</template>

<script setup lang="ts">
	import { defineProps, computed, ref } from 'vue'
	import type { Product } from '@/types/product'	
	import { useProductStore } from '@/stores/ProductStore'
	import { useCartStore } from '@/stores/CartStore'
	
	const productStore = useProductStore();
	const cartStore = useCartStore();
	const products = ref<Product[]>();	
	const productQuantities = ref({});
	const showDialog = ref(false)

	const props = defineProps<{
	  store: {
		id: number;
		user_id: number;
		name: string;
		created_at: string;
		updated_at: string;
		state: string;
	  }
	}>()
	
	function openStore() {
		console.log(props.store.id.toString());
		productStore.fetchStoreProducts(props.store.id.toString()).then((fetchedProducts) => {
			console.log(fetchedProducts); // testing fetch
			products.value = fetchedProducts
			showDialog.value = true
			productQuantities.value = fetchedProducts.reduce((acc, product) => {
			  acc[product.id] = 0
			  return acc
			}, {})
		})
	}

	function addToCart() {
	  const selectedProducts = products.value.filter(product => productQuantities.value[product.id] > 0)
	  selectedProducts.forEach(product => {
		cartStore.addProduct({ ...product, quantity: productQuantities.value[product.id] })
	  })
	  showDialog.value = false
	}

	const stateClass = computed(() => {
	  return props.store.state === 'open' ? 'state-open' : 'state-closed'
	})
</script>

<style scoped>
.state-open {
  color: green;
}

.state-closed {
  color: red;
}
</style>
