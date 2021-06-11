import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  onInput(event) {
    console.log('formula Oninput: ', event);
  }

  onClick(event) {
    console.log('formula OnClick:', event);
  }

  toHTML() {
    return `
      <div class="info">Fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
