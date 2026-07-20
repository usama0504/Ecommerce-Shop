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
    window.scrollTo({ top: 300, behavior: "smooth" })
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
  <div class="px-2 sm:px-4 max-w-7xl mx-auto">
    <HeroBanners />

    <CategoryList @trigger-see-all="toggleProductsVisibility" />

    <!-- Header Section (Title & Sort) -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <div class="flex flex-wrap items-center gap-2">
        <h2 class="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
          {{ showLimit >= sortedProducts.length ? 'All Products' : 'Featured Products' }}
        </h2>
        <span class="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
          Showing {{ limitedProducts.length }} of {{ sortedProducts.length }}
        </span>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <label class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sort:</label>
        <select v-model="sortBy"
          class="text-xs font-semibold px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00A991] text-zinc-800 dark:text-zinc-200">
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Skeleton Loading Display (Shimmer Effect) -->
    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      <div v-for="i in 8" :key="i"
        class="border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3 animate-pulse bg-white dark:bg-zinc-900 shadow-sm">

        <!-- Image Placeholder -->
        <div class="bg-zinc-200 dark:bg-zinc-800 h-32 sm:h-40 rounded-xl w-full mb-3"></div>

        <!-- Category Placeholder -->
        <div class="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-2"></div>

        <!-- Title Placeholders -->
        <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-11/12 mb-2"></div>
        <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 mb-4"></div>

        <!-- Bottom Row -->
        <div class="flex justify-between items-center pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
          <div class="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
          <div class="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full w-7"></div>
        </div>

      </div>
    </div>

    <div v-else>
      <!-- Products Grid (Responsive: 2 on mobile, 3 on tablet, 4 on desktop) -->
      <div v-if="limitedProducts.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <ProductCard v-for="product in limitedProducts" :key="product.id" :product="product" />
      </div>

      <div v-else class="text-center py-20 text-zinc-400">
        <span class="text-4xl sm:text-5xl">🔍</span>
        <p class="mt-4 font-semibold text-base sm:text-lg">No products match your search!</p>
      </div>

      <!-- Bottom Dynamic Toggle Button & Progress -->
      <div v-if="sortedProducts.length > 8" class="mt-10 mb-6">

        <!-- Progress Bar Indicator -->
        <div class="max-w-xs mx-auto text-center mb-4 px-4">
          <p class="text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 mb-1.5 font-bold tracking-wide">
            YOU'VE VIEWED {{ limitedProducts.length }} OF {{ sortedProducts.length }} PRODUCTS
          </p>

          <!-- Progress Bar Track -->
          <div class="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
            <div class="h-full bg-[#00A991] transition-all duration-500 ease-out rounded-full"
              :style="{ width: `${(limitedProducts.length / sortedProducts.length) * 100}%` }"></div>
          </div>
        </div>

        <!-- Button Trigger -->
        <div class="flex justify-center">
          <button @click="toggleProductsVisibility"
            class="border-2 border-[#00A991] text-[#00A991] dark:border-[#00a991]/50 hover:bg-[#00A991] hover:text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 group active:scale-98">
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

    <!-- Back to Top Button -->
    <button v-if="showBackToTop" @click="scrollToTop"
      class="fixed bottom-5 right-2 p-3 bg-[#00A991] text-white rounded-full shadow-lg hover:bg-[#008f7a] transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center font-bold text-sm w-10 h-10 sm:w-11 sm:h-11"
      title="Back to Top">
      ↑
    </button>
  </div>
</template>