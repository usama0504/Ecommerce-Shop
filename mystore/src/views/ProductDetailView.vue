<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShop } from '../composables/useShop'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { fetchSingleProduct, addToCart, toggleWishlist, isProductInWishlist, isLoading, addReview, getProductReviews } = useShop()
const { isLoggedIn } = useAuth()

const product = ref(null)

// ⭐ Review Form Local States
const newReviewText = ref('')
const newRating = ref(5)

onMounted(async () => {
  const productId = route.params.id
  if (productId) {
    const data = await fetchSingleProduct(productId)
    product.value = data
  }
})

// Auth check function jo block karke user ko rotating login card par bhejega
const verifyAuthOrRedirect = () => {
  if (!isLoggedIn.value) {
    router.push({
      path: '/login',
      query: { redirect: router.currentRoute.value.fullPath }
    })
    return false
  }
  return true
}

// Protected Add to Cart Handler
const handleAddToCartClick = () => {
  if (product.value) {
    if (isLoggedIn.value) {
      addToCart(product.value)
    } else {
      pendingAction.value = { product: product.value, type: 'cart' }
      router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
    }
  }
}

// Protected Wishlist Handler
const handleWishlistClick = () => {
  if (product.value && verifyAuthOrRedirect()) {
    toggleWishlist(product.value)
  }
}

// ⭐ Submit Review Handler
const submitReviewForm = (productId) => {
  addReview(productId, newReviewText.value, newRating.value)
  newReviewText.value = ''
  newRating.value = 5
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60'
}
</script>

<template>
  <div class="py-6 max-w-5xl mx-auto">
    <!-- Back Button -->
    <button @click="router.back()"
      class="flex items-center gap-2 text-xs font-bold text-[#00A991] mb-6 hover:underline">
      &larr; Back to Catalog
    </button>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A991] mb-4"></div>
      <p class="text-sm text-zinc-400">Loading product details...</p>
    </div>

    <!-- Product Details Card -->
    <div v-else-if="product && product.id" class="space-y-8">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-sm">

        <!-- Left: Big Product Image -->
        <div
          class="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 flex items-center justify-center min-h-75 md:min-h-100 border border-zinc-100 dark:border-zinc-800 relative">
          <img :src="product.image" :alt="product.name" @error="handleImageError"
            class="max-h-87.5 max-w-full object-contain hover:scale-105 transition duration-300" />
          <!-- Category Badge -->
          <span
            class="absolute top-4 left-4 bg-[#00A991]/10 text-[#00A991] dark:bg-[#00A991]/20 text-xs font-bold px-3 py-1 rounded-full capitalize">
            {{ product.category }}
          </span>
        </div>

        <!-- Right: Content Information -->
        <div class="flex flex-col justify-between">
          <div class="space-y-4">
            <h1 class="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              {{ product.name }}
            </h1>

            <!-- Rating & Stock Badge -->
            <div class="flex items-center gap-4 text-sm font-semibold">
              <span class="text-amber-500 flex items-center gap-1">⭐ {{ product.rating }}</span>
              <span class="text-zinc-300">|</span>
              <span :class="product.stock > 0 ? 'text-emerald-500' : 'text-red-500'">
                {{ product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock' }}
              </span>
            </div>

            <hr class="border-zinc-100 dark:border-zinc-700" />

            <!-- Price Display -->
            <div class="space-y-1">
              <span class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Best Price</span>
              <p class="text-3xl font-black text-[#00A991]">${{ product.price }}</p>
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <h3 class="text-sm font-bold text-zinc-500 dark:text-zinc-400">Product Description</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {{ product.description || 'No description available for this product at the moment.' }}
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 mt-8">
            <!-- Add to Cart Button -->
            <button @click="handleAddToCartClick" :disabled="product.stock <= 0" :class="[
              'flex-1 py-3.5 rounded-xl text-sm font-bold transition duration-300 text-center shadow-md',
              product.stock > 0
                ? 'bg-[#00A991] hover:bg-[#008f7b] text-white'
                : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
            ]">
              {{ product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock' }}
            </button>

            <!-- Toggle Wishlist Button -->
            <button @click="handleWishlistClick"
              class="px-4 py-3.5 border border-zinc-200 dark:border-zinc-600 hover:border-red-500 hover:text-red-500 dark:hover:border-red-500 rounded-xl font-bold transition duration-300 flex items-center justify-center text-lg">
              {{ isProductInWishlist(product?.id) ? '❤️' : '🤍' }}
            </button>
          </div>

        </div>
      </div>

      <!-- ⭐ Customer Reviews & Ratings Section -->
      <div
        class="bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-sm space-y-6">
        <h3 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">Customer Reviews & Ratings</h3>

        <!-- Leave Your Review Form -->
        <div class="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-3">
          <h4 class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Leave Your Review</h4>

          <div class="flex items-center gap-2">
            <label class="text-xs text-zinc-500">Rating:</label>
            <select v-model.number="newRating"
              class="px-2 py-1 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200">
              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
              <option value="4">⭐⭐⭐⭐ (4/5)</option>
              <option value="3">⭐⭐⭐ (3/5)</option>
              <option value="2">⭐⭐ (2/5)</option>
              <option value="1">⭐ (1/5)</option>
            </select>
          </div>

          <textarea v-model="newReviewText" rows="2" placeholder="Write your experience with this product..."
            class="w-full p-2.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#00A991]"></textarea>

          <button @click="submitReviewForm(product.id)"
            class="bg-[#00A991] hover:bg-[#009680] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">
            Submit Review
          </button>
        </div>

        <!-- Reviews Display List -->
        <div class="space-y-3">
          <div v-if="getProductReviews(product.id).length === 0" class="text-xs text-zinc-400 italic">
            No reviews yet. Be the first one to review this product!
          </div>

          <div v-for="rev in getProductReviews(product.id)" :key="rev.id"
            class="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-500">
                {{ '⭐'.repeat(rev.rating) }}
              </span>
              <span class="text-[10px] text-zinc-400">{{ rev.date }}</span>
            </div>
            <p class="text-xs text-zinc-600 dark:text-zinc-300">{{ rev.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!isLoading" class="text-center py-20 text-zinc-400">
      <span class="text-5xl">⚠️</span>
      <p class="mt-4 font-semibold text-lg">Product not found!</p>
    </div>
  </div>
</template>