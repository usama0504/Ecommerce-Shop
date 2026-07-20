<script setup>
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
    <div class="fixed top-25 right-10 z-50 flex flex-col gap-2 max-w-sm w-full sm:w-auto">
        <transition-group enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-for="toast in toasts" :key="toast.id" :class="[
                'p-4 rounded-xl shadow-lg border text-sm font-medium flex items-center justify-between gap-4 backdrop-blur-md',
                toast.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
            ]">
                <span>{{ toast.message }}</span>
                <button @click="removeToast(toast.id)" class="hover:opacity-75 font-mono text-xs">✕</button>
            </div>
        </transition-group>
    </div>
</template>