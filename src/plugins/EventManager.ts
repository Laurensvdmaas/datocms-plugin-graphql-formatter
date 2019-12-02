export class EventManager {
  private events = {};

  public add(target, event, cb) {
    if (!this.events[event]) {
      this.events[event] = {
        targets: {}
      };
    }

    if (!this.events[event].targets[target]) {
      let fn = e => {
        if (
          this.events[event] &&
          this.events[event].targets[target].callbacks
        ) {
          this.execCallbacks(target, event, e);
        }
      };

      this.events[event].targets[target] = {
        callbacks: [],
        listener: target.addEventListener(event, fn),
        clear: () => target.removeEventListener(event, fn)
      };
    }

    this.events[event].targets[target].callbacks.push(cb);

    return () => {
      if (!this.events[event].targets[target]) return;
      let index = this.events[event].targets[target].callbacks.indexOf(cb);

      if (index >= 0) {
        this.events[event].targets[target].callbacks.splice(index, 1);

        if (!this.events[event].targets[target].callbacks.length) {
          this.events[event].targets[target].clear();
          delete this.events[event].targets[target];
        }
      }
    };
  }

  public forceEvent(target, event) {
    if (this.events[event] && this.events[event].targets[target]) {
      this.execCallbacks(target, event);
    }
  }

  private execCallbacks(target, event, e?) {
    this.events[event].targets[target].callbacks.forEach(fn => fn(e));
  }
}

export default new EventManager();
