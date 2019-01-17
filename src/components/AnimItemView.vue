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
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Frame</label>
            </div>
            <div class="field-body">
              <b-select v-model="frame" placeholder="Select a name">
                <option v-for="option in frameIds" :value="option" :key="option">{{ option}}</option>
              </b-select>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Delay</label>
            </div>
            <div class="field-body">
              <b-input type="number" v-model="delay"></b-input>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
        
<script>
import Vue from "vue";
import _ from "lodash";
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
    frame: {
      get: function() {
        return this.animItem.frameId;
      },
      set: function(newValue) {
        this.animItem.frameId = newValue;
        this.$store.commit("updateAnimItem", this.animItem);
      }
    },
    values: function() {
      var f = this.$store.state.animFrames[this.animItem.frameId];
      if (f === undefined) {
        return [0, 0, 0, 0];
      }

      return f.segments;
    },
    frameIds: function() {
      return Object.keys(this.$store.state.animFrames);
    }
  },
  methods: {
    binary: function(value) {
      return "0b" + value.toString(2).padStart(8, "0");
    },
    segmentForDigit: function(digit) {
      return this.values[digit] & 0xff;
    },
    segmentClicked: function(data) {
      console.log("No change data", data);
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

/* .sevenSeg-view use {
  cursor: pointer;
} */
</style>
        
        