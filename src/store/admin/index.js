// import apiClient from '../../components/baseurl/index.js'
import apiClient from '../../components/baseurl'
export default {
    namespaced: true,
    state() {
        return {
            fields: [],
            writers: [],
            notifications: [],
        }
    },
    getters: {
        fields(state) {
            return state.fields
        },
        writers(state) {
            return state.writers
        },
        notifications(state) {
            return state.notifications
        }
    },
    mutations: {
        setFields(state, field) {
            state.fields = field
        },
        setWriters(state, writer) {
            state.writers = writer
        },
        setNotifications(state, notification) {
            state.notifications = notification
        }
    },
    actions: {
        async fetchFields({ commit, rootState }) {
            rootState.isItemLoading = true
            try {
                var respons = await apiClient.get('api/fields')
                if (respons.status === 200) {
                    commit('setFields', respons.data)
                }
            } finally {
                rootState.isItemLoading = false
            }
        },
        async fetchWriter({ commit, rootState }, searchUserBy) {
            rootState.isItemLoading = true
            try {
                var response = await apiClient.get(`api/employees?search=${searchUserBy}`)
                if (response.status === 200) {
                    console.log('data coming form server', response.data)
                    commit('setWriters', response.data)
                }
            } finally {
                rootState.isItemLoading = false
            }
        },
        async fetchNotifications({ commit }) {
            var response = await apiClient.get(`api/admin_notifications`)
            if (response.status === 200) {
                console.log('notifications come form server', response.data)
                commit('setNotifications', response.data)
            }
        }

    }
}