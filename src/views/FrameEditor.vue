<template>
  <div class="container">
    <div>
      Counts:
      <span>{{count}}</span>
    </div>
    <div class="section">
      <div class="level">
        <div class="level-item">
          <p class="control">
            <a class="button" @click="addFrame">
              <b-icon icon="plus"></b-icon>
              <span>Add</span>
            </a>
          </p>
        </div>
      </div>
      <div class="level" v-for="item in frames" :key="item.id">
        <div class="level-item">
          <AnimFrameView :animFrame="item"></AnimFrameView>
        </div>
        <div class="level-item-right">
          <p class="control">
            <a class="button" v-on:click="deleteFrame($event, item)">
              <b-icon icon="minus"></b-icon>
              <span>Delete</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import AnimFrameView from "@/components/AnimFrameView.vue";

export default {
  name: "frameeditor",
  components: {
    AnimFrameView
  },

  computed: {
    ...mapState({
      frames: state => state.animFrames,
      count: state => state.animFrames.length
    })
  },
  methods: {
    addFrame: function() {
      this.$dialog.prompt({
        message: `Frame name?`,
        inputAttrs: {
          placeholder: "e.g. blink",
          maxlength: 10
        },
        onConfirm: value => this.$store.commit("newAnimFrame", value)
      });
    },
    deleteFrame: function(e, item) {
      console.log("Delete", item);
      this.$store.commit("deleteAnimFrame", item.id);
    }
  }
};
</script>

