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
    animFrames: {},
    animations: {}
  },
  mutations: {
    newAnimation(state, name) {
      var frame = {
        name: name,
        items: []
      };
      Vue.set(state.animations, name, frame);
    },
    deleteAnimation(state, name) {
      Vue.delete(state.animations, name);
    },
    updateAnimation(state, animation) {
      Vue.set(state.animations, animation.name, animation);
    },
    clearAnimations(state) {
      Vue.set(state, "animations", {});
    },
    updateAnimations(state, newAnimations) {
      console.log("Will update state", newAnimations);
      Vue.set(state, "animations", newAnimations);
    },

    newAnimFrame(state, name) {
      var frame = {
        name: name,
        segments: [0, 0, 0, 0]
      };
      Vue.set(state.animFrames, name, frame);
    },
    deleteAnimFrame(state, name) {
      Vue.delete(state.animFrames, name);
    },
    updateAnimFrame(state, frame) {
      Vue.set(state.animFrames, frame.name, frame);
    },
    clearAnimFrames(state) {
      Vue.set(state, "animFrames", {});
    },
    updateAnimFrames(state, newAnimations) {
      console.log("Will update state", newAnimations);
      Vue.set(state, "animFrames", newAnimations);
    },

    newAnimItem(state, fId) {
      var item = {
        name: uuidv4(),
        frameId: fId,
        delay: 500
      };

      state.animItems.push(item);
    },
    updateAnimItem(state, animItem) {
      state.animItems.forEach(function(v, idx, arr) {
        if (animItem.name === v.name) {
          Vue.set(arr, idx, animItem);
          return;
        }
      });
    },
    deleteAnimItem(state, name) {
      state.animItems.forEach(function(v, idx, arr) {
        if (name === v.name) {
          arr.splice(idx, 1);
        }
      });
    },
    updateAnimItems(state, newAnimations) {
      console.log("Will update state", newAnimations);
      Vue.set(state, "animItems", newAnimations);
    },
    clearAnimItems(state) {
      Vue.set(state, "animItems", []);
    }
  },
  actions: {}
});
