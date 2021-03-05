import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/search",
    name: "Search",
    component: function() {
      return import(/* webpackChunkName: "search" */ "../views/Search.vue");
    }
  },
  {
    path: "/nearby",
    name: "Nearby",
    component: function() {
      return import(/* webpackChunkName: "nearby" */ "../views/Nearby.vue");
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
