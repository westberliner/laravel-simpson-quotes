import { createWebHistory, createRouter } from 'vue-router';
import { store } from '../store/Store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Users from '../views/User/List.vue';
import User from '../views/User/View.vue';
import UserEdit from '../views/User/Edit.vue';
import Characters from '../views/Characters.vue';

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
        path: '/users',
        name: 'Users',
        component: Users,

    },{
        path: '/users/:id',
        name: 'User View',
        component: User,
        meta: { routeOnly: true }
    },{
        path: '/users/:id/edit',
        name: 'User Edit',
        component: UserEdit,
        meta: { routeOnly: true }
    }, {
    path: '/characters',
    name: 'Characters',
    component: Characters,
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
