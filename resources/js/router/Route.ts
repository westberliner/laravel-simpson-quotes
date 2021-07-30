import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    }, {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guestOnly: true }
    }, {
        path: "/logout",
        name: "Logout",
        component: {},
        meta: { guestOnly: true }
    }, {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { authOnly: false }
    }];

const router = createRouter({
    history: createWebHistory(),
    routes
});

function isLoggedIn() {
    return localStorage.getItem('auth');
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        if (!isLoggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        if (isLoggedIn()) {
            next({
                path: '/dashboard',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
