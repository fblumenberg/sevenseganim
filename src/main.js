import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Buefy from "buefy";
import onlyInt from "vue-input-only-number";

import "buefy/dist/buefy.css";

Vue.use(onlyInt);
Vue.use(Buefy);

Vue.config.productionTip = false;

let vm = new Vue({
  store,
  router,
  render: h => h(App)
});

vm.$mount("#app");

window.vm = vm;
