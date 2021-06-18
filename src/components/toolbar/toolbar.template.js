import {buttonsArray} from './toolbar.buttons';

function createButton(button) {
  const meta = `
      data-type="toolbarButton" 
      data-value='${JSON.stringify(button.value)}'
    `;
  return `    
  <div class="button ${button.active ? ' active' : ''}"
  ${meta}>

    <i class="material-icons" 
    ${meta}>
    ${button.icon}
    </i>
  </div>`;
}

export function createToolbar(state) {
  return buttonsArray(state).map(createButton).join('');
}
