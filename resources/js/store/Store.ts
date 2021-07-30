import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import Auth from './modules/Auth'
import User from './modules/User'


// define your typings for the store state
export interface State {
    count: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()
const debug = process.env.NODE_ENV !== "production";

export const store = createStore<State>({
    modules: {
        Auth,
        User
    },
    strict: debug
})
