import { ref, computed, watch } from 'vue'
import { useToast } from './useToast'

const productList = ref([])
const cart = ref([])
const searchInput = ref('')
const selectedCategory = ref('All')
const sortBy = ref('default')
const darkMode = ref(false)
const wishlist = ref([])
const discount = ref(0)
const orders = ref([])
const isLoading = ref(false)

// ⭐ Product Reviews State (LocalStorage se load hogi)
const productReviews = ref(JSON.parse(localStorage.getItem('my_product_reviews')) || {})

// 🚀 Feature 1 State: Yeh internally safe rahegi
const pendingAction = ref(null) 

// 1. ALL PRODUCTS FETCH FROM API (Yahan hum har product par sample discount set kar rahe hain)
const fetchProductsFromAPI = async () => {
    try {
        isLoading.value = true
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()

        productList.value = data.map((product, index) => ({
            id: product.id,
            name: product.title,
            price: Number(product.price) || 0,
            // 🌟 Har teesre product par 15% discount laga rahe hain taake test ho sake
            discount: index % 3 === 0 ? 15 : 0, 
            category: product.category,
            image: product.image,
            stock: Math.floor(Math.random() * 8) + 2
        }))
    } catch (error) {
        console.error("Products fetch karne mein masla aya:", error)
    } finally {
        isLoading.value = false
    }
}

// 2. SINGLE PRODUCT DETAIL FETCH FROM API
const fetchSingleProduct = async (id) => {
    try {
        isLoading.value = true
        const cleanId = Number(id)

        const response = await fetch(`https://fakestoreapi.com/products/${cleanId}`)
        const data = await response.json()

        if (!data || data.id === undefined) {
            console.error("No product found for ID:", cleanId)
            return null
        }

        return {
            id: Number(data.id),
            name: data.title,
            price: Number(data.price) || 0,
            discount: Number(data.id) % 3 === 0 ? 15 : 0,
            category: data.category,
            description: data.description,
            image: data.image,
            rating: data.rating?.rate || 4.5,
            stock: Math.floor(Math.random() * 8) + 2
        }
    } catch (error) {
        console.error("Single product fetch error:", error)
        return null
    } finally {
        isLoading.value = false
    }
}

const loadFromStorage = async () => {
    const savedCart = localStorage.getItem('my_shopping_cart')
    const savedWish = localStorage.getItem('my_wishlist')
    const savedOrder = localStorage.getItem('my_newOrder')
    const savedDiscount = localStorage.getItem('discount')

    await fetchProductsFromAPI()

    if (savedCart) cart.value = JSON.parse(savedCart)
    if (savedWish) wishlist.value = JSON.parse(savedWish)
    if (savedOrder) orders.value = JSON.parse(savedOrder)
    if (savedDiscount) discount.value = Number(savedDiscount)
    
    updateOrderStatus()
}

watch(cart, (newCart) => {
    localStorage.setItem('my_shopping_cart', JSON.stringify(newCart))
}, { deep: true })

watch(wishlist, (newWish) => {
    localStorage.setItem('my_wishlist', JSON.stringify(newWish))
}, { deep: true })

watch(discount, (newDiscount) => {
    localStorage.setItem('discount', newDiscount)
})

// ⭐ Reviews Watcher for LocalStorage Persistence
watch(productReviews, (newReviews) => {
    localStorage.setItem('my_product_reviews', JSON.stringify(newReviews))
}, { deep: true })

// 4. COMPUTED PROPERTIES
const filteredProducts = computed(() => {
    return productList.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput.value.toLowerCase())
        const matchesCategory = selectedCategory.value === 'All' ||
            product.category.toLowerCase() === selectedCategory.value.toLowerCase()
        return matchesSearch && matchesCategory
    })
})

const sortedProducts = computed(() => {
    let productsCopy = [...filteredProducts.value]
    if (sortBy.value === 'lowToHigh') productsCopy.sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'highToLow') productsCopy.sort((a, b) => b.price - a.price)
    return productsCopy
})

// 🌟 Individual Item ke Discount ke sath calculated total bill
const totalBill = computed(() => {
  return cart.value.reduce((acc, item) => {
    const originalPrice = Number(item.price) || 0
    const discountPercent = item.discount ? Number(item.discount) : 0 
    
    const discountedPrice = originalPrice - (originalPrice * discountPercent / 100)
    return acc + (discountedPrice * item.quantity)
  }, 0)
})

const finalAmount = computed(() => Number((totalBill.value - (totalBill.value * discount.value / 100)).toFixed(2)))

// 5. CORE ACTIONS
const addToCart = (product) => {
    const { addToast } = useToast()
    const originalProduct = productList.value.find(p => p.id === product.id)
    
    if (!originalProduct || originalProduct.stock <= 0) {
        addToast('⚠️ This item is out of stock!', 'warning')
        return
    }

    const cartItem = cart.value.find(item => item.id === product.id)
    if (cartItem) {
        cartItem.quantity += 1
    } else {
        cart.value.push({
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            discount: product.discount ? Number(product.discount) : 0,
            quantity: 1,
            image: product.image
        })
    }
    originalProduct.stock -= 1
    addToast(`🛒 ${product.name} added to cart!`, 'success')
}

const decreaseQuantity = (item) => {
    const cartItem = cart.value.find(t => t.id === item.id)
    const originalProduct = productList.value.find(p => p.id === item.id)

    if (cartItem) {
        cartItem.quantity -= 1
        if (originalProduct) originalProduct.stock += 1
         
        if (cartItem.quantity === 0) {
            cart.value = cart.value.filter(t => t.id !== item.id)
        }
    }
}

const toggleWishlist = (product) => {
    const { addToast } = useToast()
    const index = wishlist.value.findIndex(item => item.id === product.id)
    
    if (index > -1) {
        wishlist.value.splice(index, 1)
        addToast(`🤍 Removed from Wishlist.`, 'warning')
    } else {
        wishlist.value.push({
            ...product,
            price: Number(product.price) || 0
        })
        addToast(`❤️ Added to Wishlist!`, 'success')
    }
}

const isProductInWishlist = (productId) => wishlist.value.some(item => item.id === productId)

// ⭐ Review System Actions
const addReview = (productId, reviewText, rating) => {
    const { addToast } = useToast()
    
    if (!reviewText || !reviewText.trim()) {
        addToast('⚠️ Please write a review comment!', 'warning')
        return
    }

    if (!productReviews.value[productId]) {
        productReviews.value[productId] = []
    }

    productReviews.value[productId].unshift({
        id: Date.now(),
        text: reviewText,
        rating: Number(rating) || 5,
        date: new Date().toLocaleDateString()
    })

    addToast('⭐ Review submitted successfully!', 'success')
}

const getProductReviews = (productId) => {
    return productReviews.value[productId] || []
}

const handleSecureAction = (product, type, isLoggedIn) => {
    const { addToast } = useToast()
    
    if (isLoggedIn) {
        if (type === 'cart') addToCart(product)
        if (type === 'wishlist') toggleWishlist(product)
    } else {
        pendingAction.value = { product, type }
        addToast('🔑 Please login first! Your item is saved.', 'warning')
    }
}

const executePendingAction = () => {
    if (!pendingAction.value) return

    const { product, type } = pendingAction.value
    
    if (type === 'cart') addToCart(product)
    if (type === 'wishlist') toggleWishlist(product)

    pendingAction.value = null
}

const clearAll = () => {
    cart.value.forEach(item => {
        const product = productList.value.find(p => p.id === item.id)
        if (product) product.stock += item.quantity
    })
    cart.value = []
    localStorage.removeItem('my_shopping_cart')
}

// 6. ORDER & CHECKOUT LOGIC
const checkoutLogic = () => {
    const newOrder = {
        id: Date.now(),
        items: cart.value.map(item => ({ ...item })),
        total: finalAmount.value,
        discount: discount.value,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Pending...",
        createdAt: Date.now()
    }
    orders.value.unshift(newOrder)
    localStorage.setItem('my_newOrder', JSON.stringify(orders.value))
    
    const { addToast } = useToast()
    addToast(`🎉 Order Placed Successfully! Total: $${finalAmount.value}`, 'success')
    
    discount.value = 0 
    clearAll()
}

const cancelOrder = (orderId) => {
    orders.value = orders.value.filter(order => order.id !== orderId)
    localStorage.setItem('my_newOrder', JSON.stringify(orders.value))
    
    const { addToast } = useToast()
    addToast('❌ Your Order Has Been Cancelled', 'warning')
}

const updateOrderStatus = () => {
    orders.value.forEach(order => {
        const secondsPassed = (Date.now() - order.createdAt) / 1000
        if (secondsPassed >= 10) order.status = "Order is Delivered"
        else if (secondsPassed >= 5) order.status = "Order is Shipped"
        else order.status = "Pending...."
    })
    localStorage.setItem('my_newOrder', JSON.stringify(orders.value))
}

let intervalId;
const startTimer = () => {
    intervalId = setInterval(updateOrderStatus, 1000)
}
const stopTimer = () => {
    clearInterval(intervalId)
}

// 7. COMPOSABLE EXPORT FUNCTION
export function useShop() {
    return {
        productList, cart, searchInput, selectedCategory, sortBy, darkMode, wishlist, discount, orders, isLoading,
        sortedProducts, totalBill, finalAmount,
        loadFromStorage, addToCart, decreaseQuantity, clearAll, checkoutLogic, cancelOrder,
        toggleWishlist, isProductInWishlist, 
        addReview, getProductReviews, // ⭐ Review methods exported
        handleSecureAction, executePendingAction,
        fetchSingleProduct, fetchProductsFromAPI, startTimer, stopTimer
    }
}