<script setup>
import { ref } from 'vue'

const currentYear = new Date().getFullYear()

const emailInput = ref('')
const subscribed = ref(false)

const handleSubscribe = () => {
    if (emailInput.value.trim() !== '') {
        subscribed.value = true
        emailInput.value = ''
        setTimeout(() => {
            subscribed.value = false
        }, 4000)
    }
}
</script>

<template>
    <footer
        class="bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">

        <div class="max-w-7xl mx-auto px-4 md:px-8 py-6 sm:py-8 border-b border-zinc-100 dark:border-zinc-900">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div
                    class="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
                    <span class="text-2xl sm:text-3xl shrink-0">🚀</span>
                    <div class="min-w-0">
                        <h4 class="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 truncate">Fastest
                            Delivery</h4>
                        <p class="text-[11px] sm:text-xs text-zinc-400 truncate">All across Pakistan</p>
                    </div>
                </div>
                <div
                    class="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
                    <span class="text-2xl sm:text-3xl shrink-0">💵</span>
                    <div class="min-w-0">
                        <h4 class="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 truncate">Cash on
                            Delivery</h4>
                        <p class="text-[11px] sm:text-xs text-zinc-400 truncate">Pay when you receive</p>
                    </div>
                </div>
                <div
                    class="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
                    <span class="text-2xl sm:text-3xl shrink-0">🔄</span>
                    <div class="min-w-0">
                        <h4 class="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 truncate">7-Day Return
                        </h4>
                        <p class="text-[11px] sm:text-xs text-zinc-400 truncate">Easy refund & exchange</p>
                    </div>
                </div>
                <div
                    class="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/40">
                    <span class="text-2xl sm:text-3xl shrink-0">🛡️</span>
                    <div class="min-w-0">
                        <h4 class="font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 truncate">100% Original
                        </h4>
                        <p class="text-[11px] sm:text-xs text-zinc-400 truncate">Verified product quality</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">

                <div class="lg:col-span-2 space-y-4">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00A991] flex items-center justify-center font-black text-white text-base sm:text-lg shadow-sm shadow-[#00A991]/20">
                            MS</div>
                        <span class="text-xl sm:text-2xl font-black text-[#00A991] tracking-tight">MyStore</span>
                    </div>
                    <p class="text-xs sm:text-sm leading-relaxed max-w-sm text-zinc-500 dark:text-zinc-400">
                        Pakistan's leading social commerce platform clone. We empower local resellers and offer quality
                        products at wholesale prices directly to your doorstep.
                    </p>

                    <div class="flex gap-3 pt-2">
   
                        <a href="https://facebook.com" target="_blank"
                            class="group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 transition-colors duration-300 group-hover:text-white"
                                viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        <a href="https://instagram.com" target="_blank"
                            class="group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-[#d40248] hover:border-[#d40248] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 transition-colors duration-300 group-hover:text-white"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>

                        <a href="https://youtube.com" target="_blank"
                            class="group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-[#FF0000] hover:border-[#FF0000] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                            <img src="https://img.icons8.com/ios-filled/50/6b7280/youtube-play.png"
                                class="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                                alt="YouTube" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4
                        class="font-bold text-zinc-800 dark:text-zinc-200 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                        Quick Links
                    </h4>
                    <ul class="space-y-2.5 text-xs sm:text-sm">
                        <li><router-link to="/" class="hover:text-[#00A991] transition">Catalog</router-link></li>
                        <li><router-link to="/wishlist" class="hover:text-[#00A991] transition">Wishlist</router-link>
                        </li>
                        <li><router-link to="/cart" class="hover:text-[#00A991] transition">Shopping Cart</router-link>
                        </li>
                        <li><router-link to="/orders" class="hover:text-[#00A991] transition">Track Orders</router-link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4
                        class="font-bold text-zinc-800 dark:text-zinc-200 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                        Customer Care
                    </h4>
                    <ul class="space-y-2.5 text-xs sm:text-sm">
                        <li><a href="#" class="hover:text-[#00A991] transition">FAQs</a></li>
                        <li><a href="#" class="hover:text-[#00A991] transition">Shipping Policy</a></li>
                        <li><a href="#" class="hover:text-[#00A991] transition">Return & Exchange</a></li>
                        <li><a href="#" class="hover:text-[#00A991] transition">Contact Support</a></li>
                    </ul>
                </div>

                <div class="space-y-3 sm:space-y-4">
                    <h4 class="font-bold text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm uppercase tracking-wider">
                        Newsletter
                    </h4>
                    <p class="text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        Subscribe to get notified about flash sales and new arrivals!
                    </p>

                    <form @submit.prevent="handleSubscribe" class="space-y-2">
                        <div class="relative">
                            <input type="email" placeholder="Email Address" v-model="emailInput" required
                                class="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00A991] text-xs font-medium text-zinc-800 dark:text-zinc-200" />
                            <button type="submit"
                                class="absolute right-1 top-1 bottom-1 bg-[#00A991] hover:bg-[#008f7b] text-white px-3.5 rounded-lg text-xs font-bold transition duration-300 active:scale-95 shadow-sm">
                                Send
                            </button>
                        </div>
                    </form>
                    <p v-if="subscribed" class="text-xs text-emerald-500 font-semibold transition duration-300">
                        🎉 Subscribed successfully!
                    </p>
                </div>

            </div>
        </div>

        <div class="bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-100 dark:border-zinc-900 py-5 sm:py-6">
            <div
                class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

                <p class="text-xs sm:text-sm text-zinc-400">
                    &copy; {{ currentYear }} MyStore. Built with ❤️ in Pakistan. All rights reserved.
                </p>

                <div
                    class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-400 font-medium">
                    <span class="mr-1">We Accept:</span>
                    <span
                        class="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md font-bold text-[10px] hover:bg-blue-500 hover:text-white transition shadow-sm">COD</span>
                    <span
                        class="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md font-bold text-[10px] text-orange-500 hover:bg-orange-500 hover:text-white transition shadow-sm">EasyPaisa</span>
                    <span
                        class="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md font-bold text-[10px] text-green-600 hover:bg-green-600 hover:text-white transition shadow-sm">JazzCash</span>
                </div>

            </div>
        </div>

    </footer>
</template>