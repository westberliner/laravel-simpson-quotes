import { getUsers, getUser, updateUser } from '@api/queries/User.gql'
import apolloProvider from '@api/Client'

export default {
    state: () => ({
        status: '',
        users: {},
        user: {}
    }),
    mutations: {
        'USER_LIST': (state: any, users: any) => {
            state.users = {};
            users.forEach((user: any) => {
                state.users[user.id] = user
            })
            state.status = 'loaded'
        },
        'USER_GET': (state: any, user: any) => {
            state.user = user
        },
        'USER_CREATE': (state: any) => {},
        'USER_UPDATE': (state: any, user: any) => {
            state.user = user
        },
        'USER_DELETE': (state: any) => {},
        'USER_ERROR': (state: any) => {
            state.status = 'error'
        },
        USER_PAGINATION: (state: any, paginatorInfo: any) => {
            state.pagination = paginatorInfo
        }
    },
    actions: {
        'USER_LIST': ({commit}: any, page: number) => {
            return apolloProvider.defaultClient.query({query: getUsers, variables: {page: page}})
                .then(result => {
                    commit('USER_LIST', result.data.users.data);
                    commit('USER_PAGINATION', result.data.users.paginatorInfo);
                }).catch(error => {
                    commit('USER_ERROR');

                    throw error.message;
                });
        },
        'USER_GET': ({commit}: any, id: number) => {
            return apolloProvider.defaultClient.query({query: getUser, variables: {id: id}})
                .then(result => {
                    commit('USER_GET', result.data.user);
                }).catch(error => {
                    commit('USER_ERROR');

                    throw error.message;
                });
        },
        'USER_CREATE': (state: any) => {},
        'USER_UPDATE': ({commit}: any, user: any) => {
            console.log(user)
            return apolloProvider.defaultClient.mutate({mutation: updateUser, variables: user})
                .then(result => {
                    console.log(result.data.user)
                    commit('USER_UPDATE', result.data.updateUser);
                }).catch(error => {
                    commit('USER_ERROR');

                    throw error.message;
                });
        },
        'USER_DELETE': (state: any) => {}
    },
    getters: {
        users: (state: any) => state.users,
        user: (state: any) => state.user,
        pagination: (state: any) => state.pagination,
        usersLoaded: (state: any) => state.status === 'loaded'
    }
}
