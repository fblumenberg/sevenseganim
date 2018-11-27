<template>
    <div>
        <div class="columns">
            <div class="column">
                <SevenSeg v-on:segmentclicked="segmentClicked" offColor="#320000" :value="segments"></SevenSeg>
            </div>
            <div class="column">
                <section>
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
import SevenSeg from "@/components/SevenSeg.vue";
import _ from "lodash";

export default {
  name: "SevenSegEditor",
  props: {
    initialValue: { type: Number, default: 0 },
    value: { type: Number, default: 0 }
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
  data: function() {
    return {
      currValue: this.value & 0xff
    };
  },
  components: {
    SevenSeg
  },
  methods: {
    segmentClicked: function(data) {
      console.log("Need change data", data);

      var curr = this.segments;
      if (data.on) {
        this.currValue = curr & ~(1 << data.index);
      } else {
        this.currValue = curr | (1 << data.index);
      }
    },
    valueChanged: function(v) {
      console.log("Changed:", v);
      this.$emit("input", v);
    }
  }
};
</script>

<style>
.sevenSeg {
  padding: 0.5em;
  background-color: black;
}
</style>

