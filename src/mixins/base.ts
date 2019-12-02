import { Component, Vue } from "vue-property-decorator";

@Component
export default class Base extends Vue {
  public subscriptions: any = [];
  listeners: any;

  mounted() {
    if (this.listeners) {
      this.subscriptions.push(
        ...this.listeners.map(listener => this[listener]("decorator"))
      );
    }
  }

  destroyed() {
    this.subscriptions.forEach((sub: any) => sub());
  }
}
