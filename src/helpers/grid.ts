export function gridInit(cols: number, rows: number): string[][] {
  let arr = new Array(cols);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = "";
    }
  }

  return arr;
}

export function withinCols(i: number, cols: number) {
  return i >= 0 && i <= cols - 1;
}

export function withinRows(j: number, rows: number) {
  return j >= 0 && j <= rows - 1;
}
