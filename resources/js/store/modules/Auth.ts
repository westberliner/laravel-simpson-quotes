import { login, getAuthorizedUser } from '@api/queries/Auth.gql'
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
                    commit('AUTH_ERROR', error);

                    throw error;
                });
        },
        'AUTH_AUTHENTICATE': ({commit, dispatch}: any) => {
            return apolloProvider.defaultClient.query({query: getAuthorizedUser})
                .then((result:any) => {
                    commit('AUTH_AUTHENTICATE', result.data.me);
                })
                .catch(error => {
                    commit('AUTH_ERROR', error);

                    throw error;
                });
        }
    },
    getters: {
        authenticatedUser: (state: any) => state.authenticatedUser,
        isAuthenticated: (state: any) => !!state.token,
        authStatus: (state: any) => state.status
    }
}
