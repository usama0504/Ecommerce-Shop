<script setup>
import { useShop } from '../composables/useShop'
import ProductCard from '../components/ProductCard.vue'

const { wishlist } = useShop()
</script>

<template>
  <div class="py-4">
    <h1 class="text-3xl font-black mb-8 text-center md:text-left flex items-center gap-2">
      ❤️ My Wishlist
    </h1>

    <!-- Empty Wishlist State -->
    <div v-if="wishlist.length === 0" class="text-center py-16 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-3xl shadow-sm">
      <div class="text-6xl mb-4">🤍</div>
      <p class="text-zinc-500 font-medium">Your wishlist is currently empty.</p>
      <p class="text-xs text-zinc-400 mt-1">Explore our products and tap the heart icon to save items here!</p>
      <router-link to="/" class="mt-6 inline-block bg-[#00A991] hover:bg-[#008f7b] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow transition">
        Browse Products
      </router-link>
    </div>

    <!-- Wishlist Products Grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <ProductCard 
        v-for="product in wishlist" 
        :key="product.id" 
        :product="product"
      />
    </div>
  </div>
</template>