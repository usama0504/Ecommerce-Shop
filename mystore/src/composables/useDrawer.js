import { ref } from 'vue'

// State ko function se bahar rakha hai taake completely global rahe
// Aur kisi bhi component se call karne par same state mile
const isCartOpen = ref(false)

export function useDrawer() {
  
  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  return {
    isCartOpen,
    openCart,
    closeCart,
    toggleCart
  }
}