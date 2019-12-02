export function Listen(name) {
  return function(target, key, descriptor) {
    add(target, key);

    const oldValue = descriptor.value;

    descriptor.value = function() {
      if (arguments[0] === "decorator") {
        return target.$eventManager.add(window, name, oldValue.bind(this));
      } else {
        return oldValue.apply(this, arguments);
      }
    };

    return descriptor;
  };
}

export function Ref(name) {
  // the original decorator
  function actualDecorator(target: Object, property: string | symbol): void {
    // property getter

    const getter = function(this: any) {
      return this.$refs[name];
    };

    // property setter
    const setter = function(this: any, newVal: any) {
      this.$refs[name] = newVal;
    };

    // Create new property with getter and setter
    Object.defineProperty(target, property, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }

  // return the decorator
  return actualDecorator;
}

const add = (target, functionName) => {
  if (!target.listeners) target.listeners = [];

  target.listeners.push(functionName);
};
