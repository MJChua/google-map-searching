import Vue from "vue";
import Vuex from "vuex";

import mapModules from "./Map";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    mapModules
  }
});
