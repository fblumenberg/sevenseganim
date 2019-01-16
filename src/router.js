import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Editor from "./views/Editor.vue";
import FrameEditor from "./views/FrameEditor.vue";
import Storage from "./views/Storage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/edit"
    },
    {
      path: "/edit",
      name: "edit",
      component: Editor
    },
    {
      path: "/frameedit",
      name: "frameedit",
      component: FrameEditor
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
