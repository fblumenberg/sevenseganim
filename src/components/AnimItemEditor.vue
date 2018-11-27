<template>
    <div>
        <div class="columns">
            <div class="column">
                <!-- <div class="columns is-gapless"> -->
                <div class="is-inline-flex">
                    <SevenSeg
                        class="sevenSeg-big"
                        v-for="(v,idx) in values"
                        :key="idx"
                        :digit="idx"
                        v-on:segmentclicked="segmentClicked"
                        offColor="#320000"
                        :value="segmentForDigit(idx)"
                    ></SevenSeg>
                </div>
                <!-- </div> -->
            </div>
            <div class="column">
                <section>
                    <ul id="example-1">
                        <li v-for="v in values">{{ v }}</li>
                    </ul>
                    <b-field label="Value">
                        <b-input type="number" v-model.number="currValue" v-on:input="valueChanged"></b-input>
                    </b-field>
                    <b-field label="Binary">
                        <b-input :value="binary" is-static readonly></b-input>
                    </b-field>
                    <b-field label="Segmentvalue">
                        <b-input :value="segments" is-static readonly></b-input>
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
  name: "AnimItemEditor",
  data: function() {
    return {
      currValue: 79,
      values: [0, 0, 0, 79]
    };
  },
  computed: {
    binary: function() {
      return "0b" + this.currValue.toString(2).padStart(8, "0");
    },
    segments: function() {
      var parsed = parseInt(this.currValue, 10);
      if (isNaN(parsed)) {
        parsed = 0;
      }

      return parsed & 0xff;
    }
  },
  methods: {
    segmentForDigit: function(digit) {
      return this.values[digit] & 0xff;
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
.sevenSeg-big {
  padding: 0.5em;
  width: 150px;
  background-color: black;
}
</style>
        
        