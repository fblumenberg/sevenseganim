import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid/v4";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    animItems: []
  },
  mutations: {
    newAnimItem(state) {
      var item = {
        id: uuidv4(),
        segments: [0, 0, 0, 0],
        delay: 500
      };

      state.animItems.push(item);
    },
    updateAnimItem(state, animItem) {
      state.animItems.forEach(function(v, idx, arr) {
        if (animItem.id === v.id) {
          Vue.set(arr, idx, animItem);
          return;
        }
      });
    },
    deleteAnimItem(state, id) {
      state.animItems.forEach(function(v, idx, arr) {
        if (id === v.id) {
          arr.splice(idx, 1);
        }
      });
    },
    clearAnimItems(state) {
      Vue.set(state, "animItems", []);
    }
  },
  actions: {}
});
