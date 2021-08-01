<template>
    <ul class="flex">
        <li class="mr-6"><router-link class="text-blue-500 hover:text-blue-800" to="/">Home</router-link></li>
        <li class="mr-6"><router-link class="text-blue-500 hover:text-blue-800" to="/dashboard">Dashboard</router-link></li>
        <li v-if="!isAuthenticated" class="mr-6"><router-link class="text-blue-500 hover:text-blue-800" to="/login">Login</router-link></li>
        <li v-if="isAuthenticated" class="mr-6"><a href="#" @click="logout" class="text-blue-500 hover:text-blue-800">Logout</a></li>
        <li>{{ authenticatedUser?.name }}</li>
    </ul>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'authenticatedUser'])
    },
    methods: {
        logout() {
            this.$store.dispatch('AUTH_INVALIDATE').then(() => {
                this.$router.push('Login');
            })
        }
    }
};
</script>
