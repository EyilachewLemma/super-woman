import { createStore } from 'vuex'

export default createStore({
    modules: {},
    state: {
        isLoading: null,
    },
    getters: {
        isLoading(state) {
            return state.isLoading
        },
    },
    mutations: {
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
    },
    actions: {

    },

})