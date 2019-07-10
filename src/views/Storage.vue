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
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <div class="field">
          <div class="control">
            <button @click="upload" class="button is-danger">Load</button>
          </div>
        </div>

        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
            {{file.name}}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile(index)"
            ></button>
          </span>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

const exportJson = "JSON";
const exportCstruct = "C";

export default {
  name: "storage",
  data: function() {
    return {
      jsonToUpdate: "",
      dropFiles: []
    };
  },
  methods: {
    update: function() {
      var newItems = JSON.parse(this.jsonToUpdate);
      this.$store.commit("updateAnimations", newItems.animations);
      this.$store.commit("updateAnimFrames", newItems.animFrames);
    },
    onCopy: function(e) {
      // alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    },
    upload: function(e) {
      console.log("this.dropFiles.length");

      if (this.dropFiles.length > 0) {
        const reader = new FileReader();
        let that = this;
        reader.onload = function(e) {
          that.jsonToUpdate = e.currentTarget.result;
          that.dropFiles.splice(0, 1);
        };
        reader.readAsText(this.dropFiles[0]);
      }
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  },
  computed: {
    isJsonToUpdateInvalid: function() {
      if (this.jsonToUpdate.length > 0) return false;

      try {
        JSON.parse(this.jsonToUpdate);
      } catch (error) {
        console.log(error);
        return true;
      }

      return false;
    },
    jsonCode2: function() {
      return JSON.stringify(this.$store.state, null, 4);
    },
    cCode: function() {
      var cdata = `
// Frames:

typedef byte Frame[4];

`;

      var frameIdx = 0;
      for (var prop in this.frames) {
        var item = this.frames[prop];
        cdata = cdata + `\nconst int ${item.id}=${frameIdx++};`;
      }

      cdata =
        cdata +
        `

Frame frames[] = {`;

      for (var prop in this.frames) {
        var item = this.frames[prop];
        cdata = cdata + `\n  {${item.segments}}, // ${prop}`;
      }

      cdata =
        cdata +
        `
};

struct Item
{
  int frame;
  int16_t delay;
};
`;
      for (var prop in this.animations) {
        var anim = this.animations[prop];
        cdata = cdata + `\n\nItem ${anim.name}[] = {`;
        anim.items.forEach(item => {
          cdata = cdata + `\n  {${item.frameId},${item.delay}},`;
        });
        cdata = cdata + `\n};`;
        cdata = cdata + `\nconst int ${anim.name}Size=${anim.items.length};`;
      }

      cdata =
        cdata +
        `

struct Animation
{
    Item *items;
    int size;
};

Animation animations[]={
`;

      for (var prop in this.animations) {
        var anim = this.animations[prop];
        cdata = cdata + `\n  {${anim.name},${anim.name}Size},`;
      }

      cdata =
        cdata +
        `
};
`;
      var animIdx = 0;
      for (var prop in this.animations) {
        var anim = this.animations[prop];
        cdata = cdata + `\nconst int ${anim.name}Anim=${animIdx++};`;
      }

      return cdata;
    },
    ...mapState({
      frames: state => state.animFrames,
      items: state => state.animItems,
      animations: state => state.animations,
      count: state => state.animItems.length
    })
  }
};
</script>

