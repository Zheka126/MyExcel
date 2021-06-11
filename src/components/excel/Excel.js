import {$} from '../../core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const $rooEl = $.create('div', Component.className);

      const component = new Component($rooEl);
      // debug
      if (component.name) {
        window['c' + component.name] = component;
      }
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
}
