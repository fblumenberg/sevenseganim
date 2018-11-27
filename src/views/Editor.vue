<template>
  <div class="container">
    <AnimItemPlayer v-model="editorValue"></AnimItemPlayer>
    <div>
      Counts:
      <span>{{count}}</span>
    </div>
    <div class="section">
      <div class="level" v-for="item in items" :key="item.id">
        <div class="level-item">
          <AnimItemView :animItem="item"></AnimItemView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import AnimItemPlayer from "@/components/AnimItemPlayer.vue";
import AnimItemView from "@/components/AnimItemView.vue";

export default {
  name: "editor",
  components: {
    AnimItemPlayer,
    AnimItemView
  },
  data: function() {
    return {
      editorValue: 79
    };
  },
  computed: {
    ...mapState({
      items: state => state.animItems,
      count: state => state.animItems.length
    })
  }
};
</script>
