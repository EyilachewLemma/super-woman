import { createRouter, createWebHistory } from 'vue-router'
import adminrout from './admin/index'
const routes = [
    adminrout
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active'
})

export default router