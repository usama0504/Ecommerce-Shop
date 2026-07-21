<script setup>
import { useShop } from '../composables/useShop'
import { useDrawer } from '../composables/useDrawer'

const { cart, decreaseQuantity, addToCart, totalBill, finalAmount, discount, checkoutLogic } = useShop()
const { isCartOpen, closeCart } = useDrawer()

const getDiscountedPrice = (item) => {
    const originalPrice = Number(item.price) || 0
    const discountPercent = Number(item.discount) || 0
    return originalPrice - (originalPrice * discountPercent / 100)
}

const handleCheckout = () => {
    checkoutLogic()
    closeCart()
}
</script>

<template>
    <div>
        <!-- Backdrop -->
        <div v-if="isCartOpen" @click="closeCart"
            class="fixed inset-0 bg-black/50 z-998 transition-opacity duration-300"></div>

        <!-- Sidebar Drawer Container -->
        <div :class="[
            'fixed top-0 right-0 w-[90%] sm:w-95 h-screen bg-white dark:bg-zinc-900 shadow-2xl z-999 flex flex-col p-4 sm:p-6 transition-transform duration-300 ease-in-out',
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
        ]">

            <!-- Header Block -->
            <div class="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                <h3 class="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Shopping Cart ({{ cart.reduce((acc, item) => acc + item.quantity, 0) }})
                </h3>
                <button @click="closeCart"
                    class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold transition text-xs active:scale-95">
                    ✕
                </button>
            </div>

            <!-- Cart Items Container -->
            <div class="flex-1 overflow-y-auto py-3 space-y-3">
                <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-48 text-center">
                    <span class="text-3xl mb-2">🛒</span>
                    <p class="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Your cart is empty.</p>
                </div>

                <div v-else v-for="item in cart" :key="item.id"
                    class="flex items-center gap-3 p-2.5 sm:p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                    
                    <img v-if="item.image" :src="item.image" :alt="item.name"
                        class="w-12 h-12 rounded-lg object-contain bg-white dark:bg-zinc-900 p-1 shrink-0 border border-zinc-100 dark:border-zinc-800" />

                    <!-- Item Info & Individual Discount Breakdown -->
                    <div class="flex-1 min-w-0">
                        <h4 class="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                            {{ item.name }}
                        </h4>
                        
                        <div class="mt-1 space-y-0.5">
                            <div v-if="Number(item.discount) > 0" class="flex gap-2 items-center text-[10px] sm:text-[11px]">
                                <span class="line-through text-zinc-400">${{ (Number(item.price) || 0).toFixed(2) }}</span>
                                <span class="text-red-500 font-semibold">{{ item.discount }}% OFF</span>
                            </div>
                            
                            <div class="flex justify-between items-center gap-1">
                                <p class="text-[10px] sm:text-[11px] text-zinc-400 truncate">
                                    Price: ${{ getDiscountedPrice(item).toFixed(2) }}
                                </p>
                                <p class="text-xs font-black text-[#00A991] shrink-0">
                                    ${{ (getDiscountedPrice(item) * item.quantity).toFixed(2) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Quantity Actions -->
                    <div class="flex flex-col items-end gap-1.5 shrink-0">
                        <button @click="() => { while(item.quantity > 0) decreaseQuantity(item) }"
                            class="text-zinc-400 hover:text-red-500 text-xs transition active:scale-95 p-0.5">
                            🗑️
                        </button>
                        <div class="flex items-center bg-zinc-200/70 dark:bg-zinc-700/70 rounded-lg p-0.5">
                            <button @click="decreaseQuantity(item)"
                                class="w-5 h-5 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-600 rounded active:scale-95">
                                -
                            </button>
                            <span class="w-5 text-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                                {{ item.quantity }}
                            </span>
                            <button @click="addToCart(item)"
                                class="w-5 h-5 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-600 rounded active:scale-95">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Block: Custom Discount Input & Final Breakdown -->
            <div v-if="cart.length > 0" class="pt-3 sm:pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3 shrink-0">
                
                <!-- 🎛️ Manual Discount Input Field -->
                <div class="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <span class="text-xs font-bold text-zinc-600 dark:text-zinc-300">Custom Discount (%)</span>
                    <input type="number" v-model.number="discount" min="0" max="100" placeholder="0"
                        class="w-16 px-2 py-1 text-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded-lg text-xs font-bold text-[#00A991] focus:outline-none focus:ring-1 focus:ring-[#00A991]" />
                </div>

                <!-- Bill Calculations Breakdown -->
                <div class="space-y-1 text-xs">
                    <div class="flex justify-between text-zinc-500">
                        <span>Subtotal:</span>
                        <span>${{ (Number(totalBill) || 0).toFixed(2) }}</span>
                    </div>
                    <div v-if="discount > 0" class="flex justify-between text-green-500 font-medium">
                        <span>Discount ({{ discount }}%):</span>
                        <span>-${{ ((totalBill * discount) / 100).toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between items-center text-sm pt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <span class="font-semibold text-zinc-700 dark:text-zinc-300">Total Payable:</span>
                        <span class="text-base font-black text-[#00A991]">${{ (Number(finalAmount) || 0).toFixed(2) }}</span>
                    </div>
                </div>

                <button @click="handleCheckout"
                    class="w-full bg-[#00A991] hover:bg-[#009680] text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition duration-300 shadow-sm active:scale-98">
                    Proceed to Checkout
                </button>
            </div>

        </div>
    </div>
</template>