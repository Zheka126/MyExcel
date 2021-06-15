const CHARCODE = {
  A: 65,
  Z: 90,
};

function createCell(row) {
  return function(_, col) {
    return `
  <div class="cell" contenteditable 
  data-type="cell"
  data-cell="${col}" 
  data-id="${row}:${col}">
  </div>
  `;
  };
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(i, content) {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${i}
        ${i ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CHARCODE.A + index);
}

export function createTable(rowsCount = 5) {
  const colsCount = CHARCODE.Z - CHARCODE.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill(createCol(''))
    .map(toChar)
    .map(createCol)
    .join('');

  rows.push(createRow('', cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(createCell(row)).join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
