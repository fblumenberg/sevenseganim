<template>
    <div class="sevenSeg">
        <svg
            class="sevenSeg-svg"
            viewBox="0 0 57 80"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            focusable="false"
        >
            <defs>
                <polyline id="h-seg" points="11 0, 37 0, 42 5, 37 10, 11 10, 6 5"></polyline>
                <polyline id="v-seg" points="0 11, 5 6, 10 11, 10 34, 5 39, 0 39"></polyline>
            </defs>
            <g class="sevenSegDigit-segGroup">
                <use
                    xlink:href="#h-seg"
                    x="0"
                    y="0"
                    :style="onoff('A')"
                    @click="segmentClicked('A')"
                ></use>
                <use
                    data-seg="B"
                    xlink:href="#v-seg"
                    x="-48"
                    y="0"
                    transform="scale(-1,1)"
                    :style="onoff('B')"
                    @click="segmentClicked('B')"
                ></use>
                <use
                    data-seg="C"
                    xlink:href="#v-seg"
                    x="-48"
                    y="-80"
                    transform="scale(-1,-1)"
                    :style="onoff('C')"
                    @click="segmentClicked('C')"
                ></use>
                <use
                    data-seg="D"
                    xlink:href="#h-seg"
                    x="0"
                    y="70"
                    class="sevenSeg-segOn"
                    :style="onoff('D')"
                    @click="segmentClicked('D')"
                ></use>
                <use
                    data-seg="E"
                    xlink:href="#v-seg"
                    x="0"
                    y="-80"
                    transform="scale(1,-1)"
                    :style="onoff('E')"
                    @click="segmentClicked('E')"
                ></use>
                <use
                    data-seg="F"
                    xlink:href="#v-seg"
                    x="0"
                    y="0"
                    :style="onoff('F')"
                    @click="segmentClicked('F')"
                ></use>
                <use
                    data-seg="G"
                    xlink:href="#h-seg"
                    x="0"
                    y="35"
                    :style="onoff('G')"
                    @click="segmentClicked('G')"
                ></use>
            </g>
            <circle
                class="sevenSeg-segOff"
                :style="onoff('H')"
                @click="segmentClicked('H')"
                cx="52"
                cy="75"
                r="5"
            ></circle>
        </svg>
    </div>
</template>

<script>
export default {
  name: "SevenSeg",
  props: {
    digit: {
      type: Number,
      default: 0
    },
    onColor: {
      type: String,
      default: "red"
    },
    offColor: {
      type: String,
      default: "transparent"
    },
    background: {
      type: String,
      default: "black"
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    segments: function() {
      var segments = this.value & 0xff;
      return ["A", "B", "C", "D", "E", "F", "G", "H"]
        .map(function(segmentName) {
          var idx = segmentName.charCodeAt(0) - 65;
          return { key: segmentName, val: segments & (1 << idx) };
        })
        .reduce(function(map, obj) {
          map[obj.key] = obj.val;
          return map;
        }, {});
    }
  },
  methods: {
    onoff: function(segmentName) {
      var color = this.segments[segmentName] > 0 ? this.onColor : this.offColor;
      return {
        fill: color
      };
    },
    segmentClicked: function(segmentName) {
      this.$emit("segmentclicked", {
        digit: this.digit,
        segment: segmentName,
        on: this.segments[segmentName] > 0,
        index: segmentName.charCodeAt(0) - 65
      });
    }
  }
};
</script>

<style>
.sevenSeg-svg {
  overflow: hidden;
  stroke-width: 0;
  height: 100%;
  width: 100%;
}
</style>
