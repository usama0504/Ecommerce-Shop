<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useShop } from '../composables/useShop'

const props = defineProps({
    product: Object
})

const router = useRouter()
const { isLoggedIn } = useAuth()
const { isProductInWishlist, handleSecureAction } = useShop()

// Wishlist handle karne ke liye
const handleWishlistClick = () => {
    handleSecureAction(props.product, 'wishlist', isLoggedIn.value)
    
    if (!isLoggedIn.value) {
        router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath }
        })
    }
}

// Cart handle karne ke liye
const handleCartClick = () => {
    handleSecureAction(props.product, 'cart', isLoggedIn.value)
    
    if (!isLoggedIn.value) {
        router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath }
        })
    }
}

const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x300?text=No+Image'
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col group relative">
    
    <!-- Wishlist Button -->
    <button 
      @click="handleWishlistClick"
      class="absolute top-3 right-3 bg-white/80 dark:bg-zinc-700/80 p-2 rounded-full shadow-sm hover:scale-110 transition z-10"
    >
      {{ isProductInWishlist(product.id) ? '❤️' : '🤍' }}
    </button>

    <!-- 🌟 Discount Badge (Agar discount maujood ho) -->
    <span v-if="product.discount > 0" class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
      {{ product.discount }}% OFF
    </span>

    <router-link :to="`/product/${product.id}`" class="block cursor-pointer flex-1">
      
      <div class="w-full h-48 bg-white dark:bg-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
        <img 
          :src="product.image" 
          :alt="product.name" 
          @error="handleImageError"
          class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <span class="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
          {{ product.category }}
        </span>
      </div>

      <div class="p-4 border-t border-zinc-50 dark:border-zinc-700/55 space-y-1">
        <h3 class="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 h-10 group-hover:text-[#00A991] transition-colors">
          {{ product.name }}
        </h3>

        <!-- ⭐ Rating & Stock Info -->
        <div class="flex items-center justify-between text-xs pt-1">
          <span class="text-amber-500 font-semibold flex items-center gap-1">
            ⭐ {{ product.rating || '4.5' }}
          </span>
          <span class="text-zinc-400 dark:text-zinc-500 font-medium">Stock: {{ product.stock }}</span>
        </div>

        <p class="text-base font-black text-[#00A991] mt-1">${{ product.price }}</p>
      </div>
    </router-link>

    <!-- Cart Button -->
    <div class="p-4 pt-0">
      <button 
        @click="handleCartClick"
        :disabled="product.stock <= 0"
        :class="[
          'w-full py-2 rounded-xl text-xs font-bold transition duration-300',
          product.stock > 0 
            ? 'bg-[#00A991] hover:bg-[#008f7b] text-white shadow-sm' 
            : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
        ]"
      >
        {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>