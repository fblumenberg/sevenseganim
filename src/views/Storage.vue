<template>
  <div class="container">
    <div class="field">
      <div class="control">
        <textarea :value="jsondata" class="textarea is-primary" placeholder="JSON data"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "storage",
  computed: {
    jsondata: function() {
      return JSON.stringify(this.items, null, 2);
    },
    ...mapState({
      items: state => state.animItems,
      count: state => state.animItems.length
    })
  }
};
</script>

