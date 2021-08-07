import { Cache } from 'apollo-cache'
import { getUsers, getUser, updateUser, deleteUser } from '@api/queries/User.gql'
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
        'USER_DELETE': (state:any, id: any) => {
            delete state.users[id]
        },
        'USER_ERROR': (state: any) => {
            state.status = 'error'
        },
        USER_PAGINATION: (state: any, paginatorInfo: any) => {
            state.pagination = paginatorInfo
        }
    },
    actions: {
        'USER_LIST': ({commit}: any, page: number, refetch = false) => {
            return apolloProvider.defaultClient.query({
                query: getUsers,
                variables: {page: page}
            }).then(result => {
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
            return apolloProvider.defaultClient.mutate({mutation: updateUser, variables: user})
                .then(result => {
                    commit('USER_UPDATE', result.data.updateUser);
                }).catch(error => {
                    commit('USER_ERROR');

                    throw error.message;
                });
        },
        'USER_DELETE': ({commit, dispatch, state}: any, id: Number) => {
            return apolloProvider.defaultClient.mutate({mutation: deleteUser, variables: {id: id}})
                .then(() => {
                    commit('USER_DELETE', id)
                }).catch(error => {
                    commit('USER_ERROR');

                    throw error.message;
                });
        }
    },
    getters: {
        users: (state: any) => state.users,
        user: (state: any) => state.user,
        pagination: (state: any) => state.pagination,
        usersLoaded: (state: any) => state.status === 'loaded'
    }
}
