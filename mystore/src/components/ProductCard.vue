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
  <div
    class="bg-white dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative h-full">

    <!-- Wishlist Button -->
    <button @click="handleWishlistClick"
      class="absolute top-2 right-2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md p-1.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all z-10 text-xs"
      aria-label="Wishlist">
      {{ isProductInWishlist(product.id) ? '❤️' : '🤍' }}
    </button>

    <!-- 🌟 Discount Badge -->
    <span v-if="product.discount > 0"
      class="absolute top-2 left-2 bg-linear-to-r from-red-500 to-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
      {{ product.discount }}% OFF
    </span>

    <router-link :to="`/product/${product.id}`" class=" cursor-pointer flex-1 flex flex-col">

      <!-- Product Image Container -->
      <div
        class="w-full h-32 sm:h-36 md:h-40 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center p-3 relative overflow-hidden">
        <img :src="product.image" :alt="product.name" @error="handleImageError"
          class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
        <span
          class="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-medium truncate max-w-[70%]">
          {{ product.category }}
        </span>
      </div>

      <!-- Product Info -->
      <div
        class="p-2.5 sm:p-3 border-t border-zinc-100 dark:border-zinc-700/50 space-y-1.5 flex-1 flex flex-col justify-between">
        <h3
          class="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 h-8 sm:h-9 group-hover:text-[#00A991] transition-colors leading-snug">
          {{ product.name }}
        </h3>

        <!-- ⭐ Rating & Stock Info -->
        <div class="flex items-center justify-between text-[10px] sm:text-xs">
          <span
            class="text-amber-500 font-bold flex items-center gap-0.5 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded">
            ⭐ {{ product.rating || '4.5' }}
          </span>
          <span class="text-zinc-400 dark:text-zinc-500 font-medium">Stock: {{ product.stock }}</span>
        </div>

        <div class="flex items-center justify-between pt-0.5">
          <p class="text-sm sm:text-base font-black text-[#00A991]">${{ product.price }}</p>
        </div>
      </div>
    </router-link>

    <!-- Cart Button Section -->
    <div class="p-2.5 sm:p-3 pt-0">
      <button @click="handleCartClick" :disabled="product.stock <= 0" :class="[
        'w-full py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-98 shadow-sm',
        product.stock > 0
          ? 'bg-[#00A991] hover:bg-[#008f7b] text-white shadow-[#00A991]/20 shadow-md'
          : 'bg-zinc-100 dark:bg-zinc-700/50 text-zinc-400 cursor-not-allowed shadow-none'
      ]">
        {{ product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>