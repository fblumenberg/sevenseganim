<template>
  <div class="home">
    <div class="columns">
      <div class="column">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="column">
        <SevenSeg msg="Test Seven Segment1" :value="value"></SevenSeg>
      </div>
      <div class="column">Third column</div>
      <div class="column">Fourth column</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import SevenSeg from "@/components/SevenSeg.vue";

export default {
  name: "home",
  components: {
    SevenSeg
  },
  data: function() {
    return {
      value: 79
    };
  }
};
</script>
