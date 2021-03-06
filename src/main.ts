import "./assets/tailwind.scss";
import Vue from "vue";
import "./plugins/plugins";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
