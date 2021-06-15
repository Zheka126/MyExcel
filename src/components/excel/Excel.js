import {$} from '../../core/dom';
import {Emitter} from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $rooEl = $.create('div', Component.className);
      const component = new Component($rooEl, componentOptions);
      // debug
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      $rooEl.html(component.toHTML());
      $root.append($rooEl);
      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
