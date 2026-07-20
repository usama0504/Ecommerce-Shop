<script setup>
import { useShop } from '../composables/useShop'
const { selectedCategory } = useShop()

// Define the custom event we will trigger
const emit = defineEmits(['trigger-see-all'])

// Map category response names to stylish icons
const categoriesData = [
  { name: 'All', icon: '🛍️' },
  { name: 'Electronics', icon: '💻' },
  { name: 'Jewelery', icon: '💎' },
  { name: "Men's Clothing", icon: '👕' },
  { name: "Women's Clothing", icon: '👗' },
]

const handleSeeAllClick = () => {
  selectedCategory.value = 'All' // Category default kar dega
  emit('trigger-see-all') // Parent ko signal dega ke limit hata do
}
</script>

<template>
  <div class="mb-6 sm:mb-8">
    <h2
      class="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex justify-between items-center text-zinc-900 dark:text-zinc-100">
      <span>Shop by category</span>
      <!-- Trigger parent event on See All click -->
      <span @click="handleSeeAllClick"
        class="text-xs text-[#00A991] font-bold cursor-pointer hover:underline select-none active:scale-95 transition">
        See all &rarr;
      </span>
    </h2>

    <!-- Categories Horizontal Scroll Container -->
    <div
      class="flex gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-3 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <button v-for="cat in categoriesData" :key="cat.name" @click="selectedCategory = cat.name"
        class="flex flex-col items-center gap-1.5 sm:gap-2 group focus:outline-none shrink-0">
        <div :class="[
          'w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition duration-300 shadow-sm border active:scale-95',
          selectedCategory.toLowerCase() === cat.name.toLowerCase()
            ? 'bg-[#00A991] text-white border-transparent scale-105 shadow-md shadow-[#00A991]/20'
            : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 group-hover:border-[#00A991]'
        ]">
          {{ cat.icon }}
        </div>
        <span
          class="text-[11px] sm:text-xs font-semibold whitespace-nowrap text-zinc-600 dark:text-zinc-300 capitalize tracking-tight">{{
            cat.name }}</span>
      </button>
    </div>
  </div>
</template>