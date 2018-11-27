<template>
  <div class="container">
    <AnimItemPlayer v-model="editorValue"></AnimItemPlayer>
    <div>
      Counts:
      <span>{{count}}</span>
    </div>
    <div class="section">
      <div class="level">
        <div class="level-item">
          <p class="control">
            <a class="button" @click="add">
              <b-icon icon="plus"></b-icon>
              <span>Add</span>
            </a>
          </p>
        </div>
      </div>
      <draggable v-model="itemsToDrag" @start="drag=true" @end="drag=false">
        <div class="level" v-for="item in itemsToDrag" :key="item.id">
          <div class="level-item">
            <AnimItemView :animItem="item"></AnimItemView>
          </div>
          <div class="level-item-right">
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
// @ is an alias to /src
import { mapState } from "vuex";
import AnimItemPlayer from "@/components/AnimItemPlayer.vue";
import AnimItemView from "@/components/AnimItemView.vue";
import draggable from "vuedraggable";

export default {
  name: "editor",
  components: {
    draggable,
    AnimItemPlayer,
    AnimItemView
  },
  data: function() {
    return {
      editorValue: 79
    };
  },
  computed: {
    itemsToDrag: {
      get: function() {
        return this.$store.state.animItems;
      },
      set(value) {
        console.log("Set items", value);
        this.$store.commit("updateAnimItems", value);
      }
    },
    ...mapState({
      items: state => state.animItems,
      count: state => state.animItems.length
    })
  },
  methods: {
    add: function() {
      this.$store.commit("newAnimItem");
    },
    deleteItem: function(e, item) {
      console.log("Delete", item);
      this.$store.commit("deleteAnimItem", item.id);
    }
  }
};
</script>
