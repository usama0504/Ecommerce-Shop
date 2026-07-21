<script setup>
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
    <!-- Wrapper: Responsive alignment & pointer-events bypass -->
    <div class="fixed top-16 sm:top-20 inset-x-3 sm:inset-x-auto sm:right-6 z-1000 flex flex-col items-center sm:items-end gap-2.5 max-w-md w-auto sm:w-96 pointer-events-none mx-auto sm:mx-0">
        
        <transition-group 
            enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="-translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-6"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-200" 
            leave-from-class="opacity-100 translate-y-0 sm:translate-x-0"
            leave-to-class="opacity-0 -translate-y-3 sm:translate-y-0 sm:translate-x-6"
        >
            <div v-for="toast in toasts" :key="toast.id" 
                class="pointer-events-auto w-full p-3.5 sm:p-4 rounded-xl shadow-xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 backdrop-blur-xl transition-all"
                :class="[
                    toast.type === 'success'
                        ? 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 shadow-emerald-500/5'
                        : 'bg-amber-50/95 dark:bg-amber-950/90 border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 shadow-amber-500/5'
                ]">
                
                <!-- Icon and Message -->
                <div class="flex items-center gap-2.5 min-w-0">
                    <span class="text-base sm:text-lg shrink-0">
                        {{ toast.type === 'success' ? '✅' : '⚠️' }}
                    </span>
                    <span class="leading-snug truncate sm:whitespace-normal">{{ toast.message }}</span>
                </div>

                <!-- Close Button -->
                <button @click="removeToast(toast.id)" 
                    class="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 active:scale-90">
                    <span class="opacity-70 hover:opacity-100 font-mono text-xs text-current">✕</span>
                </button>
            </div>
        </transition-group>
        
    </div>
</template>