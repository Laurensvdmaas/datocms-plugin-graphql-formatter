import Vue from "vue";
import EventManager from "./EventManager";
import SubscriptionManager from "./SubscriptionManager";
import EventEmitter from "./EventEmitter";

Vue.use({
  install: async Vue => {
    Vue.prototype.$eventManager = EventManager;
    Vue.prototype.$subscriptionManager = SubscriptionManager;
    Vue.prototype.$eventEmitter = EventEmitter;
    Vue.prototype.$subscriptions = null;
  }
});
