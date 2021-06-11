const CHARCODE = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `<div class="cell" contenteditable></div>`;
}

function createCol(col) {
  return `<div class="column">${col}</div>`;
}

function createRow(i, content) {
  return `
    <div class="row">
      <div class="row-info">${i}</div>
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

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
