<script setup>
import { useShop } from '../composables/useShop'

const { orders, cancelOrder } = useShop()

const getStatusClass = (status) => {
    if (status.includes("Pending")) return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
    if (status.includes("Shipped")) return "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
}
</script>

<template>
    <div class="max-w-2xl mx-auto py-4 px-3 sm:px-4">
        <h1 class="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-center md:text-left text-zinc-900 dark:text-zinc-100">📦 Order Tracking</h1>

        <div v-if="orders.length === 0"
            class="text-center py-16 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl sm:rounded-3xl shadow-sm px-4">
            <div class="text-5xl sm:text-6xl mb-4">📋</div>
            <p class="text-xs sm:text-sm text-zinc-500 font-medium">No order activity found.</p>
        </div>

        <div v-else class="space-y-4 sm:space-y-6">
            <div v-for="order in orders" :key="order.id"
                class="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-4 sm:p-6 rounded-2xl shadow-sm">
                
                <!-- Order Header info -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 border-b border-zinc-100 dark:border-zinc-700 pb-3 sm:pb-4 mb-3 sm:mb-4">
                    <div>
                        <h3 class="text-xs font-bold text-zinc-400 uppercase tracking-wide">Order ID: #{{ order.id }}</h3>
                        <p class="text-[11px] sm:text-xs font-semibold text-zinc-500 mt-0.5">Order Placed: {{ order.date }} @ {{ order.time }}</p>
                    </div>
                    <span :class="['text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full', getStatusClass(order.status)]">
                        {{ order.status }}
                    </span>
                </div>

                <!-- Order Items -->
                <div class="space-y-3">
                    <div v-for="item in order.items" :key="item.name" class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3 overflow-hidden">
                            <img :src="item.image"
                                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-xl border border-zinc-100 dark:border-zinc-700 shrink-0" />
                            <div class="min-w-0">
                                <h4 class="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">{{ item.name }}</h4>
                                <p class="text-[10px] sm:text-xs text-zinc-400 mt-0.5">Qty: {{ item.quantity }}</p>
                            </div>
                        </div>
                        <span class="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 shrink-0">${{ item.price * item.quantity }}</span>
                    </div>
                </div>

                <!-- Bottom Total + Actions -->
                <div class="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-700 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <div>
                        <span class="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase">Total Paid</span>
                        <p class="text-base sm:text-lg font-black text-[#00A991]">${{ order.total }}</p>
                    </div>

                    <button v-if="order.status.includes('Delivered')" @click="cancelOrder(order.id)"
                        class="bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 hover:text-red-600 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition active:scale-98">
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>