require("./bootstrap");

import { createApp } from 'vue';
import { store, key } from './store/Store'
import router from './router/Route'
import mainMenu from './components/MainMenu.vue'

const app = createApp({
    mounted() {
        const store = this.$store.getters;
        if (store.isAuthenticated && store.authenticatedUser === null) {
            this.$store.dispatch('AUTH_AUTHENTICATE');
        }
    }
});
app.use(store, key);
app.use(router);
app.component('main-menu', mainMenu);

app.mount('#app');

