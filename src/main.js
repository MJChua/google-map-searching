import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use("Loading", Loading);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
