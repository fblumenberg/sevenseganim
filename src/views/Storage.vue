<template>
  <div class="section">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="C-Sourcecode">
        <section style="text-align:left">
          <div class="field">
            <div class="control">
              <button
                type="button"
                class="button"
                v-clipboard:copy="cCode"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >Copy!</button>
            </div>
          </div>
          <pre v-highlightjs="cCode">
            <code class="cpp">
            </code>
          </pre>
        </section>
      </b-tab-item>
      <b-tab-item label="JSON-Sourcecode">
        <section style="text-align:left">
          <div class="field">
            <div class="control">
              <button
                type="button"
                class="button"
                v-clipboard:copy="jsonCode"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >Copy!</button>
            </div>
          </div>
          <pre v-highlightjs="jsonCode">
            <code class="javscript">
            </code>
          </pre>
        </section>
      </b-tab-item>
      <b-tab-item label="JSON-Sourcecode (Frames)">
        <section style="text-align:left">
          <div class="field">
            <div class="control">
              <button
                type="button"
                class="button"
                v-clipboard:copy="jsonCode2"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >Copy!</button>
            </div>
          </div>
          <pre v-highlightjs="jsonCode2">
            <code class="javscript">
            </code>
          </pre>
        </section>
      </b-tab-item>
      <b-tab-item label="JSON-Update">
        <div class="field">
          <div class="control">
            <button
              :disabled="isJsonToUpdateInvalid"
              @click="update"
              class="button is-danger"
            >Update</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea v-model="jsonToUpdate" class="textarea" rows="20" placeholder="JSON data"></textarea>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";

const exportJson = "JSON";
const exportCstruct = "C";

export default {
  name: "storage",
  data: function() {
    return {
      jsonToUpdate: ""
    };
  },
  methods: {
    update: function() {
      var newItems = JSON.parse(this.jsonToUpdate);
      this.$store.commit("updateAnimItems", newItems);
    },
    onCopy: function(e) {
      // alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    }
  },
  computed: {
    isJsonToUpdateInvalid: function() {
      try {
        JSON.parse(this.jsonToUpdate);
      } catch (error) {
        return true;
      }
      return false;
    },
    jsonCode: function() {
      return JSON.stringify(this.items, null, 4);
    },
    jsonCode2: function() {
      return JSON.stringify(this.$store.state, null, 4);
    },
    cCode: function() {
      var cdata = `
struct Item
{
  byte segments[4];
  int16_t delay;
};

Item items[] = {`;

      console.log(this.items);
      this.items.forEach(element => {
        cdata = cdata + `\n  {{${element.segments}},${element.delay}},`;
      });

      cdata =
        cdata +
        `
};
        `;

      return cdata;
    },
    ...mapState({
      frames: state => state.animFrames,
      items: state => state.animItems,
      count: state => state.animItems.length
    })
  }
};
</script>

