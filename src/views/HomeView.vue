<template>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Food Delivery</title>
    <!-- Normalize default styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
    <!-- font awesome link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter&family=Lato:wght@300&family=Nunito:wght@400;500&display=swap"
      rel="stylesheet" />
    <!-- Main styles -->
    <link rel="stylesheet" href="./main.css" />
  </head>

  <body>
    <div class="container">
      <section class="products__list">
        <StoreCard 
          v-for="store in stores"
          :key="store.id"
          :store="store"
		/>
      </section>
    </div>
  </body>

  </html>

</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import StoreCard from '@/components/StoreCard.vue';
	import { useStoreStore } from '@/stores/StoreStore';
	import type { Store } from '@/types/store'

	const storeStore = useStoreStore()
	const stores = ref<Store[]>([])

	onMounted(async () => {
	  await storeStore.fetchStores()
	  stores.value = storeStore.getStores
	});
</script>

