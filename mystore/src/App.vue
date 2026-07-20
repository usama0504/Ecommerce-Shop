<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShop } from './composables/useShop'
import FooterSection from './components/FooterSection.vue'
import { useAuth } from './composables/useAuth'
import ToastNotification from './components/ToastNotification.vue'
import CartDrawer from './components/CartDrawer.vue'
import { useDrawer } from './composables/useDrawer'

const { userProfile, isLoggedIn } = useAuth()
const router = useRouter()
const route = useRoute()

// Toggle Dashboard Logic
const toggleDashboard = () => {
  if (route.path === '/dashboard') {
    router.push('/')
  } else {
    router.push('/dashboard')
  }
}

const shop = useShop()
const { wishlist, cart, searchInput, loadFromStorage } = shop
const { openCart } = useDrawer()

const darkMode = ref(localStorage.getItem('dark_mode') === 'true')

watch(darkMode, (newVal) => {
  localStorage.setItem('dark_mode', newVal)
  if (newVal) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

onMounted(() => {
  loadFromStorage()
  if (typeof shop.startTimer === 'function') {
    shop.startTimer()
  }
})

onUnmounted(() => {
  if (typeof shop.stopTimer === 'function') {
    shop.stopTimer()
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#FCFAF6] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">

    <div class="bg-[#121212] w-full">
      <div class="text-white text-[11px] sm:text-xs py-2 px-4 max-w-7xl mx-auto flex justify-between items-center text-center">
        <span class="truncate">🚚 Lowest delivery price in Pakistan</span>
        <span class="hidden sm:inline">💵 Cash on Delivery available</span>
        <span class="hidden lg:inline">🛡️ 7-day easy returns</span>
        <span class="truncate">✔️ Verified Suppliers</span>
      </div>
    </div>

    <header class="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50 py-3 px-3 sm:px-6 shadow-sm">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
     
        <div class="flex items-center justify-between w-full lg:w-auto gap-3">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 cursor-pointer shrink-0">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#00A991] flex items-center justify-center font-black text-white text-base sm:text-xl">MS</div>
            <span class="text-xl sm:text-2xl font-black text-[#00A991]">MyStore</span>
          </router-link>

          <div class="flex items-center gap-2 lg:hidden">
            <button @click="darkMode = !darkMode" class="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full text-sm">
              {{ darkMode ? '☀️' : '🌙' }}
            </button>
            <button 
              v-if="isLoggedIn && userProfile" 
              @click="toggleDashboard" 
              class="w-7 h-7 rounded-full bg-[#00A991] flex items-center justify-center text-white text-xs font-bold"
            >
              {{ userProfile?.name?.charAt(0).toUpperCase() }}
            </button>
            <router-link v-else to="/login" class="text-[11px] font-bold px-2.5 py-1 bg-[#00A991] text-white rounded-md">Login</router-link>
          </div>
        </div>

        <!-- Search Bar (Flexible width, centers nicely on large screens) -->
        <div class="flex-1 w-full lg:max-w-xl flex">
          <input type="text" placeholder="Search products, brands & stores..." v-model="searchInput"
            class="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-l-full focus:outline-none focus:ring-1 focus:ring-[#00A991] dark:text-white text-xs sm:text-sm" />
          <button class="bg-[#00A991] hover:bg-[#008f7b] text-white px-4 sm:px-6 py-2 rounded-r-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap">Search</button>
        </div>

        <div class="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-medium shrink-0">
          <button @click="darkMode = !darkMode" class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition" title="Toggle Theme">
            {{ darkMode ? '☀️' : '🌙' }}
          </button>
          
          <router-link to="/orders" class="hover:text-[#00A991] whitespace-nowrap">📦 Orders</router-link>
          
          <router-link to="/wishlist" class="hover:text-[#00A991] whitespace-nowrap flex items-center gap-1">
            ❤️ Wishlist <span class="bg-[#00A991] text-white text-xs px-2 py-0.5 rounded-full font-bold">{{ wishlist.length }}</span>
          </router-link>
          
          <button @click="openCart" class="bg-[#00A991] hover:bg-[#008f7b] text-white px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap">
            🛒 Cart <span class="bg-white text-[#00A991] text-xs px-2 py-0.5 rounded-full font-bold">{{ cart.length }}</span>
          </button>
          
          <button 
            v-if="isLoggedIn && userProfile" 
            @click="toggleDashboard" 
            class="w-8 h-8 rounded-full bg-[#00A991] flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition shrink-0"
          >
            {{ userProfile?.name?.charAt(0).toUpperCase() }}
          </button>
          <router-link v-else to="/login" class="text-xs font-bold px-4 py-2 bg-[#00A991] text-white hover:bg-[#008f7b] rounded-lg shadow-sm whitespace-nowrap">Login</router-link>
        </div>

        <div class="flex lg:hidden w-full items-center justify-around pt-2 border-t border-zinc-100 dark:border-zinc-700 text-xs font-medium">
          <router-link to="/orders" class="hover:text-[#00A991] py-1">📦 Orders</router-link>
          <router-link to="/wishlist" class="hover:text-[#00A991] py-1">❤️ Wishlist <span class="bg-[#00A991] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">{{ wishlist.length }}</span></router-link>
          <button @click="openCart" class="text-[#00A991] font-bold py-1 flex items-center gap-1">🛒 Cart <span class="bg-[#00A991] text-white text-[10px] px-1.5 py-0.2 rounded-full">{{ cart.length }}</span></button>
        </div>

      </div>
    </header>

    <main class="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-4 sm:py-6">
      <router-view />
      <CartDrawer />
    </main>

    <toast-notification />
    <footer-section />
  </div>
</template>