import {defaultStyles} from '../../constants';
import {toInlineStyles} from '../../core/utils';
import {parse} from '../../core/parse';

const CHARCODE = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 34;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
    const width = getWidth(state.colState, col);
    const data = state.dataState[id] || '';
    return `
      <div class="cell" 
      style="${styles}; width: ${width}"
      contenteditable 
      data-type="cell"
      data-cell="${col}" 
      data-id="${id}"
      data-value="${data}">
        ${parse(data)}
      </div>
  `;
  };
}

function createCol({col, index, width}) {
  return `
    <div class="column" 
    style="width: ${width}" 
    data-type="resizable" 
    data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  return `
    <div class="row"
     style="height: ${getHeight(state, index)}"
     data-type="resizable" 
     data-row="${index}">
      <div class="row-info">
        ${index}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CHARCODE.A + index);
}

function widthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 5, state = {}) {
  const colsCount = CHARCODE.Z - CHARCODE.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFrom(state))
    .map(createCol)
    .join('');

  rows.push(createRow('', cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(state, row))
      .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
