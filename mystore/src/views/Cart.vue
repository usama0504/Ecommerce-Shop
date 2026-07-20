<script setup>
import { useShop } from '../composables/useShop'

const { cart, totalBill, discount, finalAmount, decreaseQuantity, addToCart, clearAll, checkoutLogic } = useShop()
</script>

<template>
  <div class="max-w-4xl mx-auto py-6 px-3 sm:px-4">
   
    <h1
      class="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-center md:text-center text-zinc-900 dark:text-zinc-100">
      🛒 Your Cart</h1>

    <div v-if="cart.length === 0"
      class="text-center py-16 px-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl sm:rounded-3xl shadow-sm">
      <div class="text-5xl sm:text-6xl mb-4">🛍️</div>
      <p class="text-xs sm:text-sm text-zinc-500 font-medium">Your shopping cart is currently empty.</p>
      <router-link to="/"
        class="mt-5 inline-block bg-[#00A991] hover:bg-[#008f7b] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow transition active:scale-98">
        Continue Shopping
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      <!-- Cart list -->
      <div class="md:col-span-2 space-y-3 sm:space-y-4">
        <div v-for="item in cart" :key="item.id"
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl shadow-sm">
          <div class="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
            <img :src="item.image" :alt="item.name"
              class="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-zinc-100 dark:border-zinc-700 shrink-0" />
            <div class="min-w-0">
              <h3 class="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 truncate">{{ item.name }}</h3>
              <p class="text-[11px] sm:text-xs text-[#00A991] font-bold mt-0.5">${{ item.price }} x {{ item.quantity }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-700">
            <div class="flex items-center gap-2.5">
              <button @click="decreaseQuantity(item)"
                class="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 px-2.5 py-1 rounded-lg text-xs font-black text-zinc-700 dark:text-zinc-200 active:scale-95">-</button>
              <span class="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">{{ item.quantity }}</span>
              <button @click="addToCart(item)"
                class="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 px-2.5 py-1 rounded-lg text-xs font-black text-zinc-700 dark:text-zinc-200 active:scale-95">+</button>
            </div>
          </div>
        </div>

        <div>
          <button @click="clearAll"
            class="text-red-500 hover:text-red-600 text-xs font-bold transition active:scale-98">
            🗑️ Clear Cart & Reset Stock
          </button>
        </div>
      </div>

      <div
        class="bg-white dark:bg-zinc-800 p-4 sm:p-6 border border-zinc-100 dark:border-zinc-700 rounded-2xl shadow-sm flex flex-col justify-between h-max">
        <div>
          <h2
            class="text-base sm:text-lg font-bold border-b border-zinc-100 dark:border-zinc-700 pb-3 sm:pb-4 mb-3 sm:mb-4 text-zinc-800 dark:text-zinc-100">
            Summary</h2>

          <div class="space-y-3 text-xs sm:text-sm font-medium">
            <div class="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span class="font-bold text-zinc-700 dark:text-zinc-300">${{ totalBill }}</span>
            </div>
            <div class="flex items-center justify-between text-zinc-400 gap-2">
              <span>Promo Discount (%)</span>
              <input type="number" v-model.number="discount" min="0" max="100"
                class="w-16 px-2 py-1 text-right border dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 rounded-lg text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:ring-1 focus:ring-[#00A991] outline-none" />
            </div>
            <div
              class="flex justify-between text-base sm:text-lg font-bold text-[#00A991] border-t border-zinc-100 dark:border-zinc-700 pt-3 mt-3">
              <span>Total Price</span>
              <span>${{ finalAmount }}</span>
            </div>
          </div>
        </div>

        <button @click="checkoutLogic"
          class="w-full bg-[#00A991] hover:bg-[#008f7b] text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold mt-5 sm:mt-6 shadow transition active:scale-98">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>