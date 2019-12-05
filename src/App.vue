<template>
  <div class="editor flex items-start  flex-col rounded text-white">
    <textarea
      class="outline-none rounded w-full text-black p-4"
      v-model="value"
      ref="input"
      placeholder="Enter query"
      @keyup="onChange()"
    ></textarea>
    <div
      class="btn rounded mt-4 pointer bg-white text-white px-8 py-2"
      @click="beautify()"
    >
      Beautify
    </div>
    <div class="error text-red-500 mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import Base from "@/mixins/base";
import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-graphql";

const DatoCmsPlugin = require("datocms-plugins-sdk");

@Component({
  components: {}
})
export default class App extends Mixins(Base) {
  value: any = ``;
  input: any = null;
  error = null;
  @Ref("code") code;
  plugin = null;

  mounted() {
    this.input = this.$refs.input;

    DatoCmsPlugin.init((plugin: any) => {
      this.plugin = plugin;
      this.value = plugin.getFieldValue(plugin.fieldPath);
      plugin.startAutoResizer();
    });
  }

  onChange() {
    this.autosize();
  }

  prettier(value) {
    return prettier.format(value, {
      parser: "graphql",
      plugins: [parserGraphql]
    });
  }

  valueToPlugin() {
    if (!this.plugin) return;

    this.plugin.setFieldValue(this.plugin.fieldPath, this.value);
  }

  autosize() {
    this.input.style.height = "auto";
    this.input.style.height = `${this.input.scrollHeight}px`;
  }

  beautify() {
    this.error = null;

    try {
      this.value = this.prettier(this.value);

      this.valueToPlugin();
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style lang="scss">
.editor {
  font-family: colfax-web, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;

  /*--primary-color: rgb(27, 33, 39);*/
  /*--accent-color: rgb(52, 133, 247);*/
  /*--semi-transparent-accent-color: rgb(52, 133, 247, 0.1);*/
  /*--light-color: rgb(236, 238, 243);*/
  /*--dark-color: rgb(21, 25, 31);*/

  .btn {
    background: var(--accent-color);
  }

  textarea {
    min-height: 200px;
    color: var(--primary-color);
    border: 1px solid var(--semi-transparent-accent-color);
    resize: none;
  }
}
</style>
