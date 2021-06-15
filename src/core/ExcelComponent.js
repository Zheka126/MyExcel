import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subs = [];

    this.prepare();
  }

  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const sub = this.emitter.subscribe(event, fn);
    this.subs.push(sub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.subs.forEach((sub) => sub());
  }
}
