<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="is-inline-flex">
          <SevenSeg
            class="sevenSeg-big"
            v-for="(v,idx) in values"
            :key="idx"
            :digit="idx"
            offColor="#320000"
            :value="segmentForDigit(idx)"
          ></SevenSeg>
        </div>
      </div>
      <div class="column">
        <div class="field has-addons">
          <p class="control">
            <a class="button" @click="play">
              <b-icon icon="play"></b-icon>
              <span>Play</span>
            </a>
          </p>
          <p class="control">
            <a class="button" @click="pause">
              <b-icon icon="pause"></b-icon>
              <span>Pause</span>
            </a>
          </p>
          <p class="control">
            <a class="button" @click="stop">
              <b-icon icon="stop"></b-icon>
              <span>Stop</span>
            </a>
          </p>
        </div>
        <div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <b-switch v-model="loop">Loop</b-switch>
              </div>
              <b-field label="Index">{{itemIndex}}</b-field>
              <b-field label="State">{{state}}</b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
import Vue from "vue";
import SevenSeg from "@/components/SevenSeg.vue";
import { mapState } from "vuex";

const stateStopped = 0;
const statePlaying = 1;
const statePausing = 2;

export default {
  name: "AnimItemPlayer",
  props: {
    animation: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      loop: true,
      state: stateStopped,
      itemIndex: 0,
      currentItem: {
        frameId: "",
        segments: [0, 0, 0, 0],
        delay: 500
      }
    };
  },
  computed: {
    values: function() {
      var f = this.frames[this.currentItem.frameId];
      if (f === undefined) {
        return [0, 0, 0, 0];
      }

      return f.segments;
    },
    items: function() {
      return this.animation.items;
    },
    count: function() {
      return this.animation.items.length;
    },
    ...mapState({
      frames: state => state.animFrames
    })
  },
  methods: {
    segmentForDigit: function(digit) {
      return this.values[digit] & 0xff;
    },
    play: function() {
      this.state = statePlaying;
      this.nextItem();
    },
    pause: function() {
      this.state = statePausing;
    },
    stop: function() {
      this.state = stateStopped;
      this.itemIndex = 0;
    },
    nextItem: function() {
      if (this.state == statePlaying) {
        if (this.itemIndex < this.count) {
          this.currentItem = this.items[this.itemIndex];
          this.itemIndex++;
          if (this.loop && this.itemIndex >= this.count) {
            this.itemIndex = 0;
          }
          window.setTimeout(this.nextItem, this.currentItem.delay);
        } else {
          this.stop();
        }
      }
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
        
        