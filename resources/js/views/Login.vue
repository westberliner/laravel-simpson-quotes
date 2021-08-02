<template>
    <div class="">
        <h1 class="text-center">Login</h1>
        <form>
            <p v-if="errors.message">{{ errors.message }}</p>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input
                    type="email"
                    v-model="form.email"
                    class="form-control"
                    id="email"
                />
                <span class="text-danger" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input
                    type="current-password"
                    v-model="form.password"
                    class="form-control"
                    id="password"
                />
                <span class="text-danger" v-if="errors.password">{{ errors.password }}</span>
            </div>
            <button @click.prevent="login" class="btn btn-primary btn-block">Login</button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: '',
                message: ''
            }
        };
    },
    methods: {
        login() {
            const credentials = this.form;

            if(!this.checkForm()) {
                return;
            }

            this.$store.dispatch('AUTH_REQUEST', credentials).then(() => {
                this.$store.dispatch('AUTH_AUTHENTICATE');
                this.$router.push('/')
            }).catch(error => {
                this.errors.message = error
            })
        },
        checkForm() {
            this.errors = {email: '', password: '', message: ''};
            let noError = true;

            if (!this.form.email) {
                this.errors.email = 'Email required.';
                noError = false;
            }
            if (!this.form.password) {
                this.errors.password = 'Password required.';
                noError = false;
            }

            return noError;
        }
    }
};
</script>
