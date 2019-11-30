<template>
  <div id="app">
    Hey this is my plugin
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const DatoCmsPlugin = require("datocms-plugins-sdk");

@Component({
  components: {}
})
export default class App extends Vue {
  mounted() {
    DatoCmsPlugin.init((plugin: any) => {
      console.log(plugin);
    });
  }
}
</script>

<style lang="scss"></style>
