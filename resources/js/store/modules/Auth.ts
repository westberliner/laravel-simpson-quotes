import { login, logout, getAuthorizedUser } from '@api/queries/Auth.gql'
import apolloProvider from '@api/Client'

export default {
    state: () => ({
        token: localStorage.getItem('authorization') || "",
        status: "",
        authenticatedUser: null
    }),
    mutations: {
        'AUTH_REQUEST': (state: any) => {
            state.status = 'loading'
        },
        'AUTH_SUCCESS': (state: any, authorizationToken: string) => {
            state.status = 'success'
            state.token = authorizationToken
            localStorage.setItem('authorization', authorizationToken)
            apolloProvider.defaultClient.resetStore()
        },
        'AUTH_ERROR': (state: any) => {
            state.status = 'error'
            state.authenticatedUser = null
            localStorage.removeItem('authorization')
        },
        'AUTH_AUTHENTICATE': (state: any, authenticatedUser: any) => {
            state.status = 'success'
            state.authenticatedUser = authenticatedUser
        },
        'AUTH_INVALIDATE': (state: any) => {
            state.status = 'success'
            state.authenticatedUser = null
            state.token = null
            localStorage.setItem('authorization', '')
            apolloProvider.defaultClient.resetStore()
        }
    },
    actions: {
        'AUTH_REQUEST': ({commit, dispatch}: any, credentials: any) => {
            commit('AUTH_REQUEST');
            // todo: abstract request
            return apolloProvider.defaultClient.mutate({mutation: login, variables: credentials})
                .then(result => {
                    const authorizationToken = `${result.data.login.token_type} ${result.data.login.token}`;
                    commit('AUTH_SUCCESS', authorizationToken);
                }).catch(error => {
                    commit('AUTH_ERROR');

                    throw error.message;
                });
        },
        'AUTH_AUTHENTICATE': ({commit}: any) => {
            return apolloProvider.defaultClient.query({query: getAuthorizedUser})
                .then((result:any) => {
                    commit('AUTH_AUTHENTICATE', result.data.me);
                })
                .catch(error => {
                    commit('AUTH_ERROR');

                    throw error.message;
                });
        },
        'AUTH_INVALIDATE': ({commit}: any) => {
            return apolloProvider.defaultClient.mutate({mutation: logout})
                .then((result:any) => {
                    commit('AUTH_INVALIDATE');
                })
                .catch(error => {
                    commit('AUTH_ERROR');

                    throw error.message;
                });
        }

    },
    getters: {
        authenticatedUser: (state: any) => state.authenticatedUser,
        isAuthenticated: (state: any) => !!state.token,
        authStatus: (state: any) => state.status
    }
}
