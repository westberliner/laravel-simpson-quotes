import { getUsers } from '@api/queries/User.gql'
import apolloProvider from '@api/Client'

export default {
    state: () => ({
        status: '',
        users: {}
    }),
    mutations: {
        'USER_LIST': (state: any, users: any) => {
            users.forEach((user: any) => {
                state.users[user.id] = user;
            })
            state.status = 'loaded'
        },
        'USER_GET': (state: any) => {},
        'USER_CREATE': (state: any) => {},
        'USER_UPDATE': (state: any) => {},
        'USER_DELETE': (state: any) => {},
        'USER_ERROR': (state: any) => {
            state.status = 'error'
        }
    },
    actions: {
        'USER_LIST': ({commit}: any) => {
            return apolloProvider.defaultClient.mutate({mutation: getUsers, variables: {page: 1}})
                .then(result => {
                    commit('USER_LIST', result.data.users.data);
                }).catch(error => {
                    commit('USER_ERROR');

                    throw error.message;
                });
        },
        'USER_GET': (state: any) => {},
        'USER_CREATE': (state: any) => {},
        'USER_UPDATE': (state: any) => {},
        'USER_DELETE': (state: any) => {}
    },
    getters: {
        users: (state: any) => {
            return state.users
        },
        usersLoaded: (state: any) => state.status === 'loaded'
    }
}
