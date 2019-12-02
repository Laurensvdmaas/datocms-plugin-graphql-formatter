export class SubscriptionManager {
  public add(listener, clearMethod?) {
    return () => {
      if (typeof clearMethod === "function") {
        clearMethod(listener);
      } else if (typeof clearMethod === "string") {
        listener[clearMethod]();
      } else {
        listener();
      }
    };
  }

  public remove(subscriptions) {
    if (!subscriptions) return;
    if (!(subscriptions instanceof Array)) subscriptions = [subscriptions];

    subscriptions.forEach(subscription => subscription());
  }
}

export default new SubscriptionManager();
