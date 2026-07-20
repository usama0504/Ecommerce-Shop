<script setup>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { userProfile, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
    logout()
    router.push('/login')
}
</script>

<template>
    <div class="max-w-4xl mx-auto py-6 px-3 sm:px-4">
        <!-- Header (Centered on large screens, left-aligned on mobile) -->
        <h1 class="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-center md:text-center text-zinc-900 dark:text-zinc-100">
            My Dashboard
        </h1>

        <!-- Profile Card -->
        <div class="bg-white dark:bg-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-zinc-100 dark:border-zinc-700 shadow-sm mb-4 sm:mb-6">
            <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-[#00A991] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-black shrink-0">
                    {{ userProfile?.name?.charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0">
                    <h2 class="text-base sm:text-lg font-bold text-zinc-800 dark:text-white truncate">{{ userProfile?.name }}</h2>
                    <p class="text-xs sm:text-sm text-zinc-500 truncate mt-0.5">{{ userProfile?.email }}</p>
                </div>
            </div>
        </div>

        <!-- Quick Stats/Links -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            <router-link to="/orders"
                class="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 hover:border-[#00A991] transition shadow-sm active:scale-98">
                <h3 class="text-sm sm:text-base font-bold text-zinc-800 dark:text-white">📦 My Orders</h3>
                <p class="text-xs text-zinc-500 mt-1">Track your recent purchases</p>
            </router-link>

            <router-link to="/wishlist"
                class="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 hover:border-[#00A991] transition shadow-sm active:scale-98">
                <h3 class="text-sm sm:text-base font-bold text-zinc-800 dark:text-white">❤️ Wishlist</h3>
                <p class="text-xs text-zinc-500 mt-1">View your saved items</p>
            </router-link>
        </div>

        <!-- Logout Button -->
        <div class="text-center sm:text-left">
            <button @click="handleLogout" 
                class="w-full sm:w-auto text-red-500 font-bold text-xs sm:text-sm rounded-xl py-2.5 px-6 bg-white dark:bg-zinc-800 border border-red-100 dark:border-red-950/40 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition shadow-sm active:scale-98">
                Logout
            </button>
        </div>
    </div>
</template>