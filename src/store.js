import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid/v4";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "sevenseganim"
    })
  ],
  state: {
    animItems: [],
    animFrames: {}
  },
  mutations: {
    newAnimFrame(state, id) {
      var frame = {
        id: id,
        segments: [0, 0, 0, 0]
      };
      Vue.set(state.animFrames, id, frame);
    },
    deleteAnimFrame(state, id) {
      Vue.delete(state.animFrames, id);
    },
    updateAnimFrame(state, frame) {
      Vue.set(state.animFrames, frame.id, frame);
    },
    clearAnimFrames(state) {
      Vue.set(state, "animFrames", {});
    },

    newAnimItem(state, fId) {
      var item = {
        id: uuidv4(),
        frameId: fId,
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
    updateAnimItems(state, newAnimItems) {
      console.log("Will update state", newAnimItems);
      Vue.set(state, "animItems", newAnimItems);
    },
    clearAnimItems(state) {
      Vue.set(state, "animItems", []);
    }
  },
  actions: {}
});
