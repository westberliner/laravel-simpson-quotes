<template>
    <table v-if="usersLoaded" class="">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.created_at }}</td>
                <td>{{ user.updated_at }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    beforeMount() {
        if (!this.$store.getters.usersLoaded) {
            this.$store.dispatch('USER_LIST')
        }
    },
    computed: {
        ...mapGetters(['users', 'usersLoaded'])
    }
}
</script>
