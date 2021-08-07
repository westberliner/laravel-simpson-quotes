<template>
    <form v-if="user">
        <label for="name">Name:</label>
        <input
            type="text"
            :value="user.name"
            ref="name"
            class="form-control"
            id="name"
        /><br>
        <label for="email">E-Mail:</label>
        <input
            type="text"
            :value="user.email"
            ref="email"
            class="form-control"
            id="email"
        /><br>
        <label for="name">Password:</label>
        <input
            type="text"
            :value="user.password"
            ref="password"
            class="form-control"
            id="password"
        /><br>
        <button @click.prevent="update" class="btn btn-primary btn-block">Login</button>
    </form>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters(['user'])
    },
    beforeMount() {
        const id = Number(this.$route.params.id)
        this.$store.dispatch('USER_GET', id)
    },
    methods: {
        update() {
            const user = {
                id: this.user.id,
                name: this.$refs.name.value ?? this.user.name,
                email: this.$refs.email.value ?? this.user.email,
                password: this.$refs.password.value ?? this.user.password
            };

            this.$store.dispatch('USER_UPDATE', user)
        }
    }
}
</script>
