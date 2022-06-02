import { createStore } from 'vuex'
import admin from './admin/index'
import auth from './admin/auth'
export default createStore({
    modules: {
        admin,
        auth,
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