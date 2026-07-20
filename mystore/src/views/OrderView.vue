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
    <div class="max-w-2xl mx-auto py-4">
        <h1 class="text-3xl font-black mb-8 text-center md:text-left">📦 Order Tracking</h1>

        <div v-if="orders.length === 0"
            class="text-center py-16 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-3xl shadow-sm">
            <div class="text-6xl mb-4">📋</div>
            <p class="text-zinc-500 font-medium">No order activity found.</p>
        </div>

        <div v-else class="space-y-6">
            <div v-for="order in orders" :key="order.id"
                class="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-6 rounded-2xl shadow-sm">
                <!-- Order Header info -->
                <div class="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-700 pb-4 mb-4">
                    <div>
                        <h3 class="text-xs font-bold text-zinc-400 uppercase">Order ID: #{{ order.id }}</h3>
                        <p class="text-xs font-semibold text-zinc-500 mt-1">Order Placed: {{ order.date }} @ {{
                            order.time }}
                        </p>
                    </div>
                    <span :class="['text-xs font-bold px-3 py-1 rounded-full', getStatusClass(order.status)]">
                        {{ order.status }}
                    </span>
                </div>

                <!-- Order Items -->
                <div class="space-y-3">
                    <div v-for="item in order.items" :key="item.name" class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img :src="item.image"
                                class="w-10 h-10 object-cover rounded-lg border border-zinc-100 dark:border-zinc-700" />
                            <div>
                                <h4 class="text-xs font-bold">{{ item.name }}</h4>
                                <p class="text-[10px] text-zinc-400 mt-0.5">Qty: {{ item.quantity }}</p>
                            </div>
                        </div>
                        <span class="text-xs font-bold">${{ item.price * item.quantity }}</span>
                    </div>
                </div>

                <!-- Bottom Total + Actions -->
                <div class="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-700 pt-4 mt-4">
                    <div>
                        <span class="text-xs font-semibold text-zinc-400">Total Paid</span>
                        <p class="text-lg font-black text-[#00A991]">${{ order.total }}</p>
                    </div>

                    <button v-if="order.status.includes('Delivered')" @click="cancelOrder(order.id)"
                        class="bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-xl text-xs font-bold transition">
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>