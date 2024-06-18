<template>
    <h3 class="setting__right--side-title">Your Orders</h3>
    <section class="products__list" style="margin-top: 15px;">
        <OrdersTable/>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useOrderStore } from '@/stores/OrderStore';
    import type { Order } from '@/types/order';
    import OrdersTable from './OrdersTable.vue';

    
    const orderStore = useOrderStore()
    const orders = ref<Order[]>(orderStore.getOrders)

    onMounted(async () => {
        await orderStore.fetchOrders();
        orders.value = orderStore.fetchOrders;
    });

</script>
