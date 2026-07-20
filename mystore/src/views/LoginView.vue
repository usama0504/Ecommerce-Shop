<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useShop } from '../composables/useShop' 

const { login, signup, authLoading, authError, isLoggedIn } = useAuth()
const { executePendingAction } = useShop() 
const router = useRouter()

const isLoginMode = ref(true)
const username = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const successMessage = ref('')

const handleSubmit = async () => {
    successMessage.value = ''
    
    if (isLoginMode.value) {
        const success = await login(email.value, password.value)
        if (success) {
            executePendingAction()
            router.push('/')
        }
    } else {
        const success = await signup(username.value, email.value, password.value)
        if (success) {
            successMessage.value = '🎉 Account created successfully! Please sign in.'
            isLoginMode.value = true
            password.value = ''
            username.value = ''
        }
    }
}

const toggleMode = () => {
    isLoginMode.value = !isLoginMode.value
    username.value = ''
    email.value = ''
    password.value = ''
    successMessage.value = ''
}
</script>

<template>
    <div class="min-h-[70vh] max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] bg-[#F4F7F6] dark:bg-zinc-950 font-sans rounded-2xl overflow-hidden select-none my-6 border border-zinc-100 dark:border-zinc-900 shadow-sm sm:mx-auto">

        <!-- LEFT SIDE: FORM -->
        <div class="flex flex-col items-center justify-center py-6 px-4 sm:px-8 bg-[#F4F7F6] dark:bg-zinc-950">
            <div class="text-center mb-3 flex flex-col items-center">
                <svg class="w-12 h-9 text-[#00A991]" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 44V16L33 34L50 16V44" stroke="#00A991" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M50 16C55 9 66 9 72 16C78 23 71 29 64 31C53 34 51 43 58 47C65 51 76 50 82 44" stroke="#10B981" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h1 class="text-base font-bold text-[#0F2E2A] dark:text-white mt-0.5 tracking-tight">MyStore</h1>
            </div>

            <div class="w-full max-w-85 bg-white dark:bg-zinc-900 rounded-xl px-5 py-5 border border-zinc-100 dark:border-zinc-800">
                <div class="text-center mb-4">
                    <h2 class="text-base font-bold text-zinc-800 dark:text-white tracking-tight">
                        {{ isLoginMode ? 'Welcome Back!' : 'Create Account' }}
                    </h2>
                    <p class="text-[11px] text-zinc-400 mt-0.5">
                        {{ isLoginMode ? 'Sign in to access your MyStore account.' : 'Sign up to build your local profile.' }}
                    </p>
                </div>

                <div v-if="isLoggedIn" class="text-center py-2 space-y-2">
                    <p class="text-xs font-semibold text-emerald-500">🎉 Securely signed in!</p>
                    <router-link to="/" class="block w-full text-center bg-[#00A991] text-white py-2 rounded-lg text-xs font-bold">
                        Go to Home Feed
                    </router-link>
                </div>

                <form v-else @submit.prevent="handleSubmit" class="space-y-3">
                    <div v-if="authError" class="p-2 bg-red-50 dark:bg-red-950/20 border border-red-100 rounded-lg text-[10px] text-red-500 font-medium">⚠️ {{ authError }}</div>
                    <div v-if="successMessage" class="p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-lg text-[10px] text-emerald-600 font-medium">{{ successMessage }}</div>

                    <!-- Username Field -->
                    <div v-if="!isLoginMode" class="space-y-1">
                        <label class="text-[11px] font-semibold text-zinc-500">Username</label>
                        <input type="text" v-model="username" required placeholder="e.g. mor_2314" class="w-full px-4 py-2 bg-[#EAEFF1] dark:bg-zinc-800 rounded-lg text-xs border-none focus:ring-1 focus:ring-[#00A991]" />
                    </div>

                    <!-- Email Field -->
                    <div class="space-y-1">
                        <label class="text-[11px] font-semibold text-zinc-500">Email Address</label>
                        <input type="email" v-model="email" required placeholder="name@example.com" class="w-full px-4 py-2 bg-[#EAEFF1] dark:bg-zinc-800 rounded-lg text-xs border-none focus:ring-1 focus:ring-[#00A991]" />
                    </div>

                    <!-- Password Field -->
                    <div class="space-y-1">
                        <label class="text-[11px] font-semibold text-zinc-500">Password</label>
                        <div class="relative">
                            <input :type="showPassword ? 'text' : 'password'" v-model="password" required placeholder="••••••••" class="w-full px-4 py-2 bg-[#EAEFF1] dark:bg-zinc-800 rounded-lg text-xs border-none focus:ring-1 focus:ring-[#00A991]" />
                            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-2 text-[10px] font-bold text-zinc-500 hover:text-[#00A991]">
                                {{ showPassword ? 'Hide' : 'Show' }}
                            </button>
                        </div>
                    </div>

                    <button type="submit" :disabled="authLoading" class="w-full bg-[#00A991] hover:bg-[#009680] text-white py-2 rounded-lg text-xs font-bold transition-all mt-2">
                        {{ authLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up') }}
                    </button>

                    <div v-if="isLoginMode" class="text-center pt-0.5"><a href="#" class="text-[10px] font-semibold text-zinc-400 hover:underline">Forgot Password?</a></div>

                    <div class="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-1">
                        <p class="text-xs text-zinc-500">
                            {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
                            <button type="button" @click="toggleMode" class="font-bold text-[#00A991] hover:underline ml-0.5">
                                {{ isLoginMode ? 'Sign Up' : 'Sign In' }}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>

        <!-- RIGHT SIDE: IMAGE (Hidden on small, visible on md+) -->
        <div class="hidden md:block relative h-full w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=500&auto=format&fit=crop&q=60" alt="Bazaar" class="absolute inset-0 w-full h-full object-cover" />
        </div>
    </div>
</template>