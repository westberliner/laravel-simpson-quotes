<template>
    <ul class="flex">
        <template v-for="(route, index) in routes" :key="index">
            <li v-if="isVisible(route, this)" class="mr-6">
                <router-link class="text-blue-500 hover:text-blue-800" to="{{route.path}}">{{route.name}}</router-link>
            </li>
        </template>
        <li v-if="isAuthenticated" class="mr-6"><a href="#" @click="logout" class="text-blue-500 hover:text-blue-800">Logout</a></li>
        <li>{{ authenticatedUser?.name }}</li>
    </ul>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'authenticatedUser']),
        routes() {
            return this.$router.options.routes;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('AUTH_INVALIDATE').then(() => {
                this.$router.push('Login');
            })
        },
        isVisible(route, self) {
            if(!self.isAuthenticated && route.meta?.guestOnly) {
                return true;
            }
            if(self.isAuthenticated && !route.meta?.guestOnly) {
                return true;
            }

            return false;
        }
    }
};
</script>
