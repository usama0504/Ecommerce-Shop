<script setup>
import { ref, computed } from 'vue'
import { useShop } from '../composables/useShop'
import HeroBanners from '../components/HeroBanners.vue'
import CategoryList from '../components/CategoryList.vue'
import ProductCard from '../components/ProductCard.vue'

const { sortedProducts, sortBy, isLoading } = useShop()

const showLimit = ref(8)

const limitedProducts = computed(() => {
  return sortedProducts.value.slice(0, showLimit.value)
})

const toggleProductsVisibility = () => {
  if (showLimit.value < sortedProducts.value.length) {
    showLimit.value += 8
    if (showLimit.value > sortedProducts.value.length) {
      showLimit.value = sortedProducts.value.length
    }
  } 
  else {
    showLimit.value = 8
     window.scrollTo({ top: 300,behavior: "smooth" })
  }
}

const showBackToTop = ref(false)

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
  
    showBackToTop.value = window.scrollY > 900
  })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>
  <div>
    <HeroBanners />

    <CategoryList @trigger-see-all="toggleProductsVisibility" />

    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-black">
          {{ showLimit >= sortedProducts.length ? 'All Products' : 'Featured Products' }}
        </h2>
        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-850 text-zinc-400">
          Showing {{ limitedProducts.length }} of {{ sortedProducts.length }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sort:</label>
        <select v-model="sortBy"
          class="text-xs font-semibold px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00A991]">
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Skeleton Loading Display (Shimmer Effect) -->
    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Yeh loop 8 dummy cards generate karega jab tak data load ho raha hai -->
      <div v-for="i in 8" :key="i"
        class="border border-zinc-100 dark:border-zinc-850 rounded-xl p-3 animate-pulse bg-white dark:bg-zinc-900 shadow-sm">

        <!-- Image Placeholder -->
        <div class="bg-zinc-200 dark:bg-zinc-800 h-40 rounded-lg w-full mb-3"></div>

        <!-- Category Placeholder -->
        <div class="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-2"></div>

        <!-- Title Placeholders (Two lines) -->
        <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-11/12 mb-2"></div>
        <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 mb-4"></div>

        <!-- Bottom Row (Price & Wishlist Button Placeholder) -->
        <div class="flex justify-between items-center pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
          <div class="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
          <div class="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full w-7"></div>
        </div>

      </div>
    </div>

    <div v-else>
      <!-- Products Grid -->
      <div v-if="limitedProducts.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ProductCard v-for="product in limitedProducts" :key="product.id" :product="product" />
      </div>

      <div v-else class="text-center py-20 text-zinc-400">
        <span class="text-5xl">🔍</span>
        <p class="mt-4 font-semibold text-lg">No products match your search!</p>
      </div>

      <!-- Bottom Dynamic Toggle Button -->
      <!-- Product Progress & Dynamic Toggle Button -->
      <div v-if="sortedProducts.length > 8" class="mt-10 mb-6">

        <!-- Progress Bar Indicator -->
        <div class="max-w-xs mx-auto text-center mb-4">
          <p class="text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-bold tracking-wide">
            YOU'VE VIEWED {{ limitedProducts.length }} OF {{ sortedProducts.length }} PRODUCTS
          </p>

          <!-- Progress Bar Track -->
          <div class="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
            <!-- Dynamic Filled Bar -->
            <div class="h-full bg-[#00A991] transition-all duration-500 ease-out rounded-full"
              :style="{ width: `${(limitedProducts.length / sortedProducts.length) * 100}%` }"></div>
          </div>
        </div>

        <!-- Button Trigger -->
        <div class="flex justify-center">
          <button @click="toggleProductsVisibility"
            class="border-2 border-[#00A991] text-[#00A991] dark:border-[#00a991]/50 hover:bg-[#00A991] hover:text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 group">
            <span>
              {{ showLimit >= sortedProducts.length ? 'View Less Products' : 'View More Products' }}
            </span>
            <span class="transition-transform duration-300 group-hover:scale-120">
              {{ showLimit >= sortedProducts.length ? '↑' : '↓' }}
            </span>
          </button>
        </div>

      </div>
    </div>

    <button v-if="showBackToTop" @click="scrollToTop"
      class="fixed bottom-6 right-6 p-3 bg-[#00A991] text-white rounded-full shadow-lg hover:bg-[#008f7a] transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center font-bold text-sm w-11 h-11"
      title="Back to Top">
      ↑
    </button>
  </div>


</template>