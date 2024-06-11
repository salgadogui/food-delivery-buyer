<template>
      <div class="product__card">
        <div class="card__preview" style="background-image: url(./src/assets/img/products/food2.jpg);">
        </div>
        <div class="card__content">
			<div class="card__content-left">
			  <div class="card__content--title">{{ store.name }}</div>
            <div class="card__content--info">
              <div class="card__content--price" :class="stateClass">
              	{{ store.state }}  
              </div>
            </div>
         </div>
        </div>
      </div>
</template>

<script setup lang="ts">
	import { defineProps, computed } from 'vue'

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
