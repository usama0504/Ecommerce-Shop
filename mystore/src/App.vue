<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router' // useRoute aur useRouter import karein
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
    router.push('/') // Agar Dashboard par hain, toh Home wapis
  } else {
    router.push('/dashboard') // Warna Dashboard par jao
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
  <div class="min-h-screen bg-[#FCFAF6] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">

    <!-- Top Info Bar -->
    <div class="bg-[#121212] w-full">
      <div class="text-white text-xs py-2 px-4 md:px-8 max-w-7xl mx-auto flex justify-between items-center overflow-x-auto whitespace-nowrap gap-6">
        <div class="flex gap-6 md:gap-8">
          <span>🚚 Lowest delivery price in Pakistan</span>
          <span>💵 Cash on Delivery available</span>
        </div>
        <div class="flex gap-6 md:gap-8">
          <span>🛡️ 7-day easy returns</span>
          <span>✔️ Verified Suppliers</span>
        </div>
      </div>
    </div>

    <!-- Header Navbar -->
    <header class="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50 py-4 px-4 md:px-8 shadow-sm">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 cursor-pointer">
          <div class="w-10 h-10 rounded-lg bg-[#00A991] flex items-center justify-center font-black text-white text-xl">MS</div>
          <span class="text-2xl font-black text-[#00A991]">MyStore</span>
        </router-link>

        <!-- Search Bar -->
        <div class="flex-1 max-w-xl mx-0 md:mx-6 flex">
          <input type="text" placeholder="Search products, brands & stores..." v-model="searchInput"
            class="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-l-full focus:outline-none focus:ring-1 focus:ring-[#00A991] dark:text-white text-sm" />
          <button class="bg-[#00A991] hover:bg-[#008f7b] text-white px-6 py-2 rounded-r-full text-sm font-semibold transition-colors">Search</button>
        </div>

        <!-- Right Side Nav -->
        <div class="flex items-center gap-6 text-sm font-medium">
          <button @click="darkMode = !darkMode" class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition">{{ darkMode ? '☀️ Light' : '🌙 Dark' }}</button>
          <router-link to="/orders" class="hover:text-[#00A991]">📦 Orders</router-link>
          <router-link to="/wishlist" class="hover:text-[#00A991]">❤️ Wishlist <span class="bg-[#00A991] text-white text-xs px-2 py-0.5 rounded-full font-bold">{{ wishlist.length }}</span></router-link>
          <button @click="openCart" class="bg-[#00A991] hover:bg-[#008f7b] text-white px-4 py-2 rounded-full flex items-center gap-2">🛒 Cart <span class="bg-white text-[#00A991] text-xs px-2 py-0.5 rounded-full font-bold">{{ cart.length }}</span></button>
        </div>

        <!-- Auth Panel (Dashboard Toggle) -->
        <div class="flex items-center gap-4">
          <button 
            v-if="isLoggedIn && userProfile" 
            @click="toggleDashboard" 
            class="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div class="w-8 h-8 rounded-full bg-[#00A991] flex items-center justify-center text-white text-xs font-bold">
              {{ userProfile.name.charAt(0).toUpperCase() }}
            </div>
            <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            <!-- <span class="capitalize text-[#00A991] font-bold">{{ userProfile.name }}</span> -->
            </span>
          </button>
          <router-link v-else to="/login" class="text-xs font-bold px-4 py-2 bg-[#00A991] text-white hover:bg-[#008f7b] rounded-lg shadow-sm">Login</router-link>
        </div>

      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <router-view />
      <CartDrawer />
    </main>

    <toast-notification />
    <footer-section />
  </div>
</template>