import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Buefy from "buefy";
import onlyInt from "vue-input-only-number";
import VueHighlightJS from "vue-highlightjs";
import VueClipboard from "vue-clipboard2";

import "buefy/dist/buefy.css";
import "highlight.js/styles/github.css";

Vue.use(onlyInt);
Vue.use(Buefy);
Vue.use(VueHighlightJS);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

let vm = new Vue({
  store,
  router,
  render: h => h(App)
});

vm.$mount("#app");

window.vm = vm;
