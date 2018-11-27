<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="is-inline-flex">
          <SevenSeg
            class="sevenSeg-view"
            v-for="(v,idx) in values"
            v-on:segmentclicked="segmentClicked"
            :key="idx"
            :digit="idx"
            offColor="#320000"
            :value="segmentForDigit(idx)"
          ></SevenSeg>
        </div>
      </div>
      <div class="column">
        <section>
          <b-field label="Delay">
            <b-input type="number" v-model="delay"></b-input>
          </b-field>
        </section>
      </div>
    </div>
  </div>
</template>
        
<script>
import Vue from "vue";
import SevenSeg from "@/components/SevenSeg.vue";

export default {
  name: "AnimItemView",
  props: {
    animItem: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {};
  },
  computed: {
    delay: {
      get: function() {
        return this.animItem.delay;
      },
      set: function(newValue) {
        this.animItem.delay = newValue;
        this.$store.commit("updateAnimItem", this.animItem);
      }
    },
    values: function() {
      return this.animItem.segments;
    }
  },
  methods: {
    segmentForDigit: function(digit) {
      return this.animItem.segments[digit] & 0xff;
    },
    segmentClicked: function(data) {
      console.log("Need change data", data);

      var curr = this.values[data.digit];
      var newValue;
      if (data.on) {
        newValue = curr & ~(1 << data.index);
      } else {
        newValue = curr | (1 << data.index);
      }

      Vue.set(this.values, data.digit, newValue);
      this.$store.commit("updateAnimItem", this.animItem);
    },
    valueChanged: function(v) {
      console.log("Changed:", v);
      this.$emit("input", v);
    }
  },
  components: {
    SevenSeg
  }
};
</script>

<style>
.sevenSeg-view {
  padding: 0.5em;
  width: 80px;
  background-color: black;
}
</style>
        
        