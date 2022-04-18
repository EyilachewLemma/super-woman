export default {
    state: {
      isAuthenticated: false,
      token: null,
      user: null,
    },
    getters: {
      isAuthenticated(state) {
        return state.isAuthenticated;
      },
      token(state) {
        return state.token;
      },
      user(state) {
        return state.user;
      },
    },
    mutations: {
      setIsAuthenticated(state, payload) {
        state.isAuthenticated = payload;
      },
      setToken(state, payload) {
        state.token = payload;
      },
      setUser(state, payload) {
        state.user = payload;
      },
    },
    actions: {},
  };
  