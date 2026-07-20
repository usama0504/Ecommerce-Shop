< <script setup>
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
        <div class="max-w-4xl mx-auto py-8">
            <h1 class="text-2xl font-bold text-zinc-800 dark:text-white mb-6">My Dashboard</h1>

            <!-- Profile Card -->
            <div
                class="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-700 shadow-sm mb-6">
                <div class="flex items-center gap-4">
                    <div
                        class="w-16 h-16 bg-[#00A991] rounded-full flex items-center justify-center text-white text-2xl font-black">
                        {{ userProfile?.name?.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-zinc-800 dark:text-white">{{ userProfile?.name }}</h2>
                        <p class="text-sm text-zinc-500">{{ userProfile?.email }}</p>
                    </div>
                </div>
            </div>

            <!-- Quick Stats/Links -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <router-link to="/orders"
                    class="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700 hover:border-[#00A991] transition">
                    <h3 class="font-bold text-zinc-800 dark:text-white">📦 My Orders</h3>
                    <p class="text-xs text-zinc-500 mt-1">Track your recent purchases</p>
                </router-link>

                <router-link to="/wishlist"
                    class="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700 hover:border-[#00A991] transition">
                    <h3 class="font-bold text-zinc-800 dark:text-white">❤️ Wishlist</h3>
                    <p class="text-xs text-zinc-500 mt-1">View your saved items</p>
                </router-link>
            </div>
            <button @click="handleLogout" class="mt-6 text-red-500 font-bold text-md rounded-lg py-2 px-5 bg-white hover:bg-red-500 hover:text-white">
                Logout 
            </button>
        </div>
    </template>