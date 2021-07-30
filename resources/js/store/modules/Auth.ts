import { login } from '@api/queries/Auth.gql'
import apolloProvider from '@api/Client'

export default {
    state: () => ({
        token: localStorage.getItem("authorization") || "",
        status: "",
        hasLoadedOnce: false
    }),
    mutations: {
        "AUTH_REQUEST": (state: any) => {
            state.status = 'loading'
        },
        "AUTH_SUCCESS": (state: any, token: string) => {
            state.status = 'success'
            state.token = token
        },
        "AUTH_ERROR": (state: any) => {
            state.status = 'error'
        }
    },
    actions: {
        "AUTH_REQUEST": ({commit, dispatch}: any, credentials: any) => {

            apolloProvider.defaultClient.mutate({mutation: login, variables: credentials});
            // return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            //     commit(AUTH_REQUEST)
            //     axios({url: 'auth', data: user, method: 'POST' })
            //         .then(resp => {
            //             const token = resp.data.token
            //             localStorage.setItem('authorization', token) // store the token in localstorage
            //             commit(AUTH_SUCCESS, token)
            //             // you have your token, now log in your user :)
            //             dispatch(USER_REQUEST)
            //             resolve(resp)
            //         })
            //         .catch(err => {
            //             commit(AUTH_ERROR, err)
            //             localStorage.removeItem('authorization') // if the request fails, remove any possible user token if possible
            //             reject(err)
            //         })
            // })
        }
    },
    getters: {
        me(state: any, getters: object, rootState: object) {
            console.log(this)
        },
        isAuthenticated: (state: any) => !!state.token,
        authStatus: (state: any) => state.status
    }
}
