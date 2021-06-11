import {capitalize} from './utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No root provided from DOMListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = fullMethodName(listener);
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = fullMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function fullMethodName(item) {
  return 'on' + capitalize(item);
}
