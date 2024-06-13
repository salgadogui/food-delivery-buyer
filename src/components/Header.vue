<template>
  <header class="header__menu">
    <div class="container">
      <div class="header__navbar">
        <div class="header__menu--left-side">
          <a href="/">
            <img class="header__menu--logo" src="@/assets/img/main_logo.svg" alt="Food delivery website logo" />
          </a>

          <div v-if="path == '/'" class="header__menu--search">
            <input class="header__menu--search-input" type="text" placeholder="Search " />
            <i class="header__menu--search-icon fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

          <div class="header__menu--right-side">
            <nav class="header__menu--link">
			  <div class="header__menu--icon">
				<a href="#"><img class="header__menu--icon-item" src="@/assets/img/shopping bag.svg" alt="shopping bag icon" /></a>
				<span class="header__menu--icon-number">{{ productCount }}</span>
			  </div>
              <span class="header__menu--divider-vertical"></span>
              <div v-if="!auth.loggedIn">
                <a class="menu_link active" href="/signin">Sign In</a>
              </div>
              <div v-if="auth.loggedIn">
                <a class="menu_link active" href="/orders">My Orders</a>
                <a class="menu_link active" href="/account">Account</a>
              </div>
            </nav>
            <img class="header__menu--icon-mobile" src="@/assets/img/menu.svg" alt=" header menu icon " />
          </div>
	  </div>
    </div>
  </header>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { computed } from 'vue';
	import { useAuthStore } from '@/stores/AuthStore';
	import { useCartStore } from '@/stores/CartStore';

	const cartStore = useCartStore()
	const auth = useAuthStore()
	const route = useRoute()
	const path = computed( () => route.path )

	const productCount = computed(() => cartStore.productCount);
</script>
