
export default class Cells {
  constructor(zeroIndex = 0) {
    this.zeroIndex = zeroIndex;
    this.c = {}
  }

  _makeRow(size = this.count(), zeroIndex = this.zeroIndex, vals = {}) {
    return Array(size).fill().reduce((cellRow, _, j) => {
      cellRow[j - zeroIndex] = vals[j] || 0;
      return cellRow;
    }, {});
  }

  set(cell, i, j) {
    if(!this.c[i]) {
      this.c[i] = this._makeRow();
    }
    this.c[i][j] = cell
  }

  get(i, j) {
    if(this.c[i] && this.c[i][j]) {
      return 1;
    } else {
      return 0;
    }
  }

  fill(size = this.count()) {
    this.c = Array(size).fill().reduce((cells, _, i) => {
      cells[i] = Array(size).fill().reduce((cellRow, __, j) => {
        cellRow[j] = 0;
        return cellRow;
      }, {});
      return cells;
    }, {});
  }

  // func takes (value, i, j, obj)
  map(func) {
    const cells = new Cells(this.zeroIndex);

    cells.c = Object.entries(this.c).reduce((cells, [i, cellRow]) => {
      cells[i] = Object.entries(cellRow).reduce((_cellRow, [j, cell]) => {
        _cellRow[j] = func(cell, parseInt(i, 10), parseInt(j, 10), this.c);
        return _cellRow;
      }, {});
      return {...cells};
    }, {});

    return cells;
  }

  values() {
    return Object.values(this.c).reduce((ac, next) => [...ac, ...Object.values(next).reduce((_ac, _next) => [..._ac, _next], [])], []);
  }

  copy() {
    return this.map(cell => cell);
  }

  count(cells = this.c) {
    return Object.keys(cells).length;
  }

  reIndex(zeroIndex) {
    const size = this.count();
    if(zeroIndex > size)
      return;
    this.c = Array(size).fill().reduce((cells, _, i) => {
      cells[i - zeroIndex] = this._makeRow(size, this.zeroIndex, Object.values(this.c[i - this.zeroIndex]));
      return cells;
    }, {});
    this.zeroIndex = zeroIndex;
  }
}