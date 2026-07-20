<script setup>
import { useShop } from '../composables/useShop'

const { cart, totalBill, discount, finalAmount, decreaseQuantity, addToCart, clearAll, checkoutLogic } = useShop()
</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <h1 class="text-3xl font-black mb-8 text-center md:text-left">🛒 Your Cart</h1>

    <div v-if="cart.length === 0" class="text-center py-16 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-3xl shadow-sm">
      <div class="text-6xl mb-4">🛍️</div>
      <p class="text-zinc-500 font-medium">Your shopping cart is currently empty.</p>
      <router-link to="/" class="mt-4 inline-block bg-[#00A991] hover:bg-[#008f7b] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow transition">
        Continue Shopping
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Cart list -->
      <div class="md:col-span-2 space-y-4">
        <div v-for="item in cart" :key="item.id" class="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl shadow-sm">
          <div class="flex items-center gap-4">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-xl border border-zinc-100 dark:border-zinc-700" />
            <div>
              <h3 class="font-bold text-sm">{{ item.name }}</h3>
              <p class="text-xs text-[#00A991] font-bold mt-1">${{ item.price }} x {{ item.quantity }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button @click="decreaseQuantity(item)" class="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 px-2.5 py-1 rounded-lg text-xs font-black">-</button>
            <span class="font-bold text-sm">{{ item.quantity }}</span>
            <button @click="addToCart(item)" class="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 px-2.5 py-1 rounded-lg text-xs font-black">+</button>
          </div>
        </div>
        
        <button @click="clearAll" class="text-red-500 hover:text-red-600 text-xs font-bold transition">
          🗑️ Clear Cart & Reset Stock
        </button>
      </div>

      <!-- Summary Card -->
      <div class="bg-white dark:bg-zinc-800 p-6 border border-zinc-100 dark:border-zinc-700 rounded-2xl shadow-sm flex flex-col justify-between h-max">
        <div>
          <h2 class="text-lg font-bold border-b border-zinc-100 dark:border-zinc-700 pb-4 mb-4">Summary</h2>
          
          <div class="space-y-3 text-sm font-medium">
            <div class="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>${{ totalBill }}</span>
            </div>
            <div class="flex items-center justify-between text-zinc-400 gap-2">
              <span>Promo Discount (%)</span>
              <input type="number" v-model.number="discount" min="0" max="100" class="w-16 px-2 py-1 text-right border dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 rounded text-xs font-bold focus:ring-1 focus:ring-[#00A991] outline-none" />
            </div>
            <div class="flex justify-between text-lg font-bold text-[#00A991] border-t border-zinc-100 dark:border-zinc-700 pt-3 mt-3">
              <span>Total Price</span>
              <span>${{ finalAmount }}</span>
            </div>
          </div>
        </div>

        <button @click="checkoutLogic" class="w-full bg-[#00A991] hover:bg-[#008f7b] text-white py-3 rounded-xl font-bold mt-6 shadow transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>