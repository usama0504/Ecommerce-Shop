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
  { name: "Women's Clothing", icon: '👗' }
]

const handleSeeAllClick = () => {
  selectedCategory.value = 'All' // Category default kar dega
  emit('trigger-see-all') // Parent ko signal dega ke limit hata do
}
</script>

<template>
  <div class="mb-8">
    <h2 class="text-lg font-bold mb-4 flex justify-between items-center">
      Shop by category
      <!-- Trigger parent event on See All click -->
      <span 
        @click="handleSeeAllClick"
        class="text-xs text-[#00A991] font-bold cursor-pointer hover:underline select-none"
      >
        See all &rarr;
      </span>
    </h2>
    <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      <button 
        v-for="cat in categoriesData" 
        :key="cat.name"
        @click="selectedCategory = cat.name"
        class="flex flex-col items-center gap-2 group focus:outline-none"
      >
        <div 
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center text-2xl transition duration-300 shadow-sm border',
            selectedCategory.toLowerCase() === cat.name.toLowerCase() 
              ? 'bg-[#00A991] text-white border-transparent scale-105' 
              : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 group-hover:border-[#00A991]'
          ]"
        >
          {{ cat.icon }}
        </div>
        <span class="text-xs font-semibold whitespace-nowrap capitalize">{{ cat.name }}</span>
      </button>
    </div>
  </div>
</template>