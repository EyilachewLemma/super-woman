import { createStore } from 'vuex'
import admin from './admin'

export default createStore({
    modules: {
        admin,
    },
    state: {
        isItemLoading: null,
    },
    getters: {
        isItemLoading(state) {
            return state.isItemLoading
        },
    },
    mutations: {
        setIsItemLoading(state, isItemLoading) {
            state.isItemLoading = isItemLoading
        },
    },
    actions: {

    },

})