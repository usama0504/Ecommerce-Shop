import Cart from '@/views/Cart.vue'
import DashboardView from '@/views/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import OrderView from '@/views/OrderView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import WishlistView from '@/views/WishlistView.vue'

import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/cart', name: 'Cart', component: Cart},
    { path: '/orders', name: 'Order', component: OrderView},
    { path: '/wishlist', name: 'Wishlist', component: WishlistView},
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
     { path: '/login', name: 'Login', component: LoginView },
    { path: '/dashboard', name: 'Dashboard', component: DashboardView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router