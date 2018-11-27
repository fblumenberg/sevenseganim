import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Editor from "./views/Editor.vue";
import Storage from "./views/Storage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/edit",
      name: "edit",
      component: Editor
    },
    {
      path: "/storage",
      name: "storage",
      component: Storage
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
