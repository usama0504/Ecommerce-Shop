<script setup>
import { useShop } from '../composables/useShop'
import ProductCard from '../components/ProductCard.vue'

const { wishlist } = useShop()
</script>

<template>
  <div class="py-4 px-3 sm:px-4 max-w-7xl mx-auto">
    <!-- Header (Centered on large screens, left-aligned on mobile) -->
    <h1 class="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-center md:text-center flex items-center justify-center gap-2 text-zinc-900 dark:text-zinc-100">
      ❤️ My Wishlist
    </h1>

    <!-- Empty Wishlist State -->
    <div v-if="wishlist.length === 0" class="text-center py-16 px-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl sm:rounded-3xl shadow-sm">
      <div class="text-5xl sm:text-6xl mb-4">🤍</div>
      <p class="text-xs sm:text-sm text-zinc-500 font-medium">Your wishlist is currently empty.</p>
      <p class="text-[11px] sm:text-xs text-zinc-400 mt-1">Explore our products and tap the heart icon to save items here!</p>
      <router-link to="/" class="mt-6 inline-block bg-[#00A991] hover:bg-[#008f7b] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow transition active:scale-98">
        Browse Products
      </router-link>
    </div>

    <!-- Wishlist Products Grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      <ProductCard 
        v-for="product in wishlist" 
        :key="product.id" 
        :product="product"
      />
    </div>
  </div>
</template>