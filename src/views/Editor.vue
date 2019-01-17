<template>
  <div class="columns">
    <div class="column is-one-third">
      <div class="level">
        <div class="level-item">
          <p class="subtitle is-5">List of Animations</p>
        </div>
        <div class="level-item">
          <p class="control">
            <a class="button" @click="addAnimation">
              <b-icon icon="plus"></b-icon>
              <span>Add Animation</span>
            </a>
          </p>
        </div>
      </div>
      <div class="media" v-for="animation in animations" :key="animation.name">
        <figure class="media-left"></figure>
        <div class="media-content">
          <div
            v-on:click="selectAnimation($event,animation)"
            class="button is-fullwidth"
            v-bind:class="{'is-primary': isActive(animation)}"
          >{{animation.name}} {{isActive(animation)}}</div>
        </div>
        <div class="media-right">
          <a class="delete is-medium" v-on:click="deleteAnimation($event,animation)"></a>
        </div>
      </div>
    </div>
    <div class="column">
      <AnimationEditor :animation="currentAnimation"></AnimationEditor>
      <!--
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
      -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import AnimItemPlayer from "@/components/AnimItemPlayer.vue";
import AnimItemView from "@/components/AnimItemView.vue";
import AnimationEditor from "@/components/AnimationEditor.vue";
import draggable from "vuedraggable";

export default {
  name: "editor",
  components: {
    AnimationEditor
    // draggable,
    // AnimItemPlayer,
    // AnimItemView
  },
  data: function() {
    return {
      currentAnimationName: "",
      editorValue: 79
    };
  },
  created: function() {
    if (Object.keys(this.animations).length > 0) {
      this.currentAnimationName = this.animations[
        Object.keys(this.animations)[0]
      ].name;
    }
    console.log(
      "Created",
      this.currentAnimationName,
      Object.keys(this.animations)
    );
  },
  mounted: function() {
    console.log("Mounted");
  },
  computed: {
    currentAnimation: function() {
      return this.animations[this.currentAnimationName] || {};
    },
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
      animations: state => state.animations,
      items: state => state.animItems,
      count: state => state.animItems.length
    })
  },
  methods: {
    addAnimation: function() {
      this.$dialog.prompt({
        message: `Animation Name?`,
        inputAttrs: {
          placeholder: "e.g. blink",
          maxlength: 40,
          required: true
        },
        onConfirm: value => this.$store.commit("newAnimation", value)
      });
    },
    deleteAnimation: function(e, animation) {
      this.$store.commit("deleteAnimation", animation.name);
    },
    selectAnimation: function(e, animation) {
      this.currentAnimationName = animation.name;
    },
    isActive: function(animation) {
      return animation.name === this.currentAnimationName;
    },

    add: function() {
      this.$store.commit("newAnimItem", "blink");
    },
    deleteItem: function(e, item) {
      console.log("Delete", item);
      this.$store.commit("deleteAnimItem", item.id);
    }
  }
};
</script>
