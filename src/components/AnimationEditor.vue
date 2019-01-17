<template>
  <div>
    <h1 class="title">{{animation.name}}</h1>
    <div class="level">
      <div class="level-item">
        <AnimItemPlayer :animation="animation"></AnimItemPlayer>
      </div>
    </div>
    <div class="section">
      <div class="level">
        <div class="level-item">
          <p class="control">
            <a class="button" @click="addItem">
              <b-icon icon="plus"></b-icon>
              <span>Add Step</span>
            </a>
          </p>
        </div>
      </div>
      <draggable v-model="itemsToDrag" @start="drag=true" @end="drag=false">
        <div class="level" v-for="item in itemsToDrag" :key="item.id">
          <div class="level-item">
            <AnimItemView :animItem="item"></AnimItemView>
          </div>
          <div class="level-item">
            <p class="control">
              <a class="button" v-on:click="deleteItem($event,item)">
                <b-icon icon="minus"></b-icon>
                <span>Delete</span>
              </a>
            </p>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import AnimItemPlayer from "@/components/AnimItemPlayer.vue";
import AnimItemView from "@/components/AnimItemView.vue";
import draggable from "vuedraggable";
import uuidv4 from "uuid/v4";

export default {
  name: "animationeditor",
  components: {
    draggable,
    AnimItemPlayer,
    AnimItemView
  },
  props: {
    animation: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {};
  },
  computed: {
    itemsToDrag: {
      get: function() {
        return this.items;
      },
      set(value) {
        console.log("Set items", value);
        Vue.set(this.animation, "items", value);
        // this.$store.commit("updateAnimItems", value);
      }
    },
    items: function() {
      return this.animation.items;
    },
    ...mapState({
      count: state => state.animItems.length
    })
  },
  methods: {
    addItem: function() {
      console.log("Add Item");
      var item = {
        id: uuidv4(),
        frameId: "blink",
        delay: 500
      };

      this.animation.items.push(item);
    },
    deleteItem: function(e, item) {
      console.log("Delete", item);
      this.animation.items.forEach(function(v, idx, arr) {
        if (item.id === v.id) {
          arr.splice(idx, 1);
        }
      });
    }
  }
};
</script>
