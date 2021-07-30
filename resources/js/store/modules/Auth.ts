import { login, getAuthorizedUser } from '@api/queries/Auth.gql'
import apolloProvider from '@api/Client'

export default {
    state: () => ({
        token: localStorage.getItem("authorization") || "",
        status: "",
        hasLoadedOnce: false
    }),
    mutations: {
        'AUTH_REQUEST': (state: any) => {
            state.status = 'loading'
        },
        'AUTH_SUCCESS': (state: any, token: string) => {
            state.status = 'success'
            state.token = token
        },
        'AUTH_ERROR': (state: any) => {
            state.status = 'error'
        }
    },
    actions: {
        'AUTH_REQUEST': ({commit, dispatch}: any, credentials: any) => {
            return apolloProvider.defaultClient.mutate({mutation: login, variables: credentials})
                .then(result => {
                    commit('AUTH_REQUEST');
                    const authorizationToken = `${result.data.login.token_type} ${result.data.login.token}`;
                    localStorage.setItem('authorization', authorizationToken);
                    apolloProvider.defaultClient.resetStore();
                }).catch(error => {
                    commit('AUTH_ERROR', error)
                    localStorage.removeItem('authorization') // if the request fails, remove any possible user token if possible
                    throw error;
                });
        }
    },
    getters: {
        me(state: any, getters: object, rootState: object) {
            console.log(state);
            apolloProvider.defaultClient.query({query: getAuthorizedUser})
                .then((result:any) => {console.log(result)})
                .catch(error => {
                    throw error;
                });
        },
        isAuthenticated: (state: any) => !!state.token,
        authStatus: (state: any) => state.status
    }
}
