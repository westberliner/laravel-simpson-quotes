<template>
    <table class="">
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
                <td>
                    <router-link class="text-blue-500 hover:text-blue-800" :to="`/users/${user.id}/edit`">Edit</router-link>
                    <router-link class="text-blue-500 hover:text-blue-800" :to="`/users/${user.id}`">View</router-link>
                    <a class="text-blue-500 hover:text-blue-800">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
    <pagination v-bind:pagination="pagination" v-bind:path="'/users'"></pagination>
</template>

<script>
import {mapGetters} from 'vuex'
import pagination from '../../components/Pagination'

export default {
    props: {
    },
    components: {
        pagination
    },
    beforeMount() {
        const page = this.$route.query?.page || 1;
        if (!this.$store.getters.usersLoaded) {
            this.$store.dispatch('USER_LIST', parseInt(page))
        }
    },
    computed: {
        ...mapGetters(['users', 'usersLoaded', 'pagination'])
    },
    watch: {
        "$route": {
            immediate: true,
            handler(to, from) {
                if(
                    to !== undefined &&
                    to.query?.page !== this.pagination?.currentPage
                ) {
                    this.$store.dispatch('USER_LIST', parseInt(to.query.page))
                }
                this.page = to.query.page;
            }
        }
    }
}
</script>
