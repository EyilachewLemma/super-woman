import { createRouter, createWebHistory } from 'vue-router'
import adminrout from './admin/index'
const routes = [
    adminrout,
    {
        path: '/login',
        name: 'Login',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/admin/Login.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
    if (
        to.matched.some((record) => record.meta.adminAuth) &&
        !localStorage.getItem("tokenB")
    ) {
        return next({ name: "Login", query: { to: to.path } });
    }
    return next();
});
export default router