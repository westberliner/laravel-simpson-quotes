import { createWebHistory, createRouter } from 'vue-router';
import { store } from '../store/Store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guestOnly: true }
    }, {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    }];

const router = createRouter({
    history: createWebHistory(),
    routes
});

function isLoggedIn() {
    return localStorage.getItem('auth');
}

router.beforeEach((to, from, next) => {
    const isGuestOnly = to.matched.some(record => record.meta.guestOnly);

    if (isGuestOnly && !store.getters.isAuthenticated) {
        next()

        return;
    }

    if (isGuestOnly && store.getters.isAuthenticated) {
        next({
            path: '/dashboard'
        });

        return;
    }

    if (!isGuestOnly && !store.getters.isAuthenticated) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });

        return;
    }

    next();

});

export default router;
