<template>
    <ul>
        <li v-for="index in pages">
            <span v-if="index === pagination.currentPage">{{index}}</span>
            <router-link v-if="index !== pagination.currentPage" class="text-blue-500 hover:text-blue-800" :to="{path: path, query: {page: index}}">{{index}}</router-link>
        </li>
    </ul>
</template>

<script>

export default {
    props: ['pagination', 'path'],
    computed: {
        pages() {
            if (this.pagination === undefined) {
                return 0;
            }
            let pages = parseInt(this.pagination.total / this.pagination.perPage)
            if (this.pagination.total % this.pagination.perPage !== 0) {
                pages++;
            }
            return pages
        }
    },
    methods: {
    }
};
</script>
