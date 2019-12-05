<template>
  <div class="editor flex items-start  flex-col rounded text-white">
    <textarea
      class="outline-none bg-gray-900 text-white w-full text-black p-4 min-h-40"
      v-model="value"
      placeholder="Enter query"
    ></textarea>
    <div
      class="btn mt-4 pointer bg-white text-white bg-green-500 px-8 py-2"
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

  mounted() {
    this.input = this.$refs.input;

    DatoCmsPlugin.init((plugin: any) => {
      console.log(plugin);
    });
  }

  prettier(value) {
    return prettier.format(value, {
      parser: "graphql",
      plugins: [parserGraphql]
    });
  }

  beautify() {
    this.error = null;

    try {
      this.value = this.prettier(this.value);
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style lang="scss">
.editor {
  textarea {
    min-height: 460px;
    resize: none;
  }
}
</style>
