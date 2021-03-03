import Vue from "vue";
import Vuex from "vuex";

import mapModules from "./Map";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false
  },
  mutations: {
    updateLoading(context, status) {
      context.commit("LOADING", status);
    }
  },
  actions: {
    LOADING(state, status) {
      state.isLoading = status;
    }
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
    mapModules
  }
});
