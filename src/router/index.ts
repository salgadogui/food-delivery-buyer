import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import AccountView from '@/views/AccountView.vue'
import UserStoresView from '@/views/UserStoresView.vue'
import UserProductsView from '@/views/UserProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/stores',
      name: 'stores',
      component: UserStoresView
    },
    {
      path: '/products',
      name: 'products',
      component: UserProductsView
    }
  ]
})

export default router
