import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: "AIzaSyCd6kNCPNNnVZnd45Es3WTY8xfzeYdhUQQ",
    libraries: "places"
  }
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
