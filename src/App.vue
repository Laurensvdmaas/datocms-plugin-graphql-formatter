<template>
  <div class="editor rounded m-4 p-4 bg-gray-900 text-white">
    <div class="flex">
      <ul class="flex flex-col">
        <li class="flex items-center" v-for="(line, key) in lines" :key="key">
          <div class="line-number w-4 border-r w-8 text-center border-gray-800">
            {{ key + 1 }}
          </div>
        </li>
      </ul>
      <ul
        class="flex flex-col whitespace-pre-wrap outline-none flex-1"
        ref="code"
      >
        <li class="flex items-center" v-for="(line, key) in lines" :key="key">
          <pre
            class="ml-2"
            :class="{ 'mr-2': line.length }"
            v-html="line"
          ></pre>
        </li>
      </ul>
    </div>
    <div class="tailwind text-black hidden w-2"></div>
    <textarea
      class="w-full mt-4 text-black p-4 h-40"
      v-model="value"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import Base from "@/mixins/base";
import { Listen } from "@/utilities/decorators";

const DatoCmsPlugin = require("datocms-plugins-sdk");

@Component({
  components: {}
})
export default class App extends Mixins(Base) {
  value: any = `type Route {
  alternatives: RouteAlternative
  ev: RequestEv
  route: RouteAlternative
  routeRequest: RequestRoute
  semantic: Semantic
  status: RouteStatus
  user: RequestUser
}`;
  activeLine: any = null;
  input: any = null;
  selectionStart = 0;
  @Ref("shadowEditor") shadowEditor;
  @Ref("code") code;

  mounted() {
    this.input = this.$refs.input;

    // DatoCmsPlugin.init((plugin: any) => {
    //   console.log(plugin);
    // });
  }

  onInput(e) {
    // this.value = this.code.innerText;
  }

  onKeyDown(e) {
    if (e.keyCode == 9) {
      e.preventDefault();
      console.log("Inserted");

      document.execCommand("insertHTML", false, "&#009");
    }
  }

  get lines() {
    return this.value.split("\n");
  }

  addLine() {
    this.lines.splice(this.activeLine + 1, 0, "");
    this.setActiveLine(this.activeLine + 1);
    this.value = "";
  }

  onLineClick(key) {
    this.setActiveLine(key);
    this.value = this.lines[key];
  }

  @Watch("value") onValueChange() {
    if (this.lines[this.activeLine] !== undefined) {
      this.lines[this.activeLine] = this.value;
    }
  }

  onBlur($event) {
    this.setActiveLine(null);
    this.value = null;
  }

  onDelete() {
    console.log(this.activeLine);

    console.log(!this.activeLine && this.value.length === 0);

    if (this.activeLine && this.value.length === 0) {
      this.lines.splice(this.activeLine, 1);
    }
  }

  onFocus() {}

  focus() {
    this.input.focus();
  }

  setActiveLine(value: any) {
    this.activeLine = value;
  }
}
</script>

<style lang="scss">
.editor {
  @keyframes blink {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
