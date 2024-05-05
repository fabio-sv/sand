import { Colors, getColor } from "./color";
import { gridInit, withinCols, withinRows } from "./grid";

export function start(cols: number, rows: number, width: number, ctx: CanvasRenderingContext2D) {
  let grid = gridInit(cols, rows);
  grid[Math.round(cols / 2)][Math.round(rows / 2)] = getColor();

  let drag = false;

  document.addEventListener("touchstart", () => drag = true);
  document.addEventListener("touchmove", (e) => {
    if (drag) mouseDragged(grid, cols, rows, width, e);
  });
  document.addEventListener("touchend", () => drag = false);

  setInterval(() => grid = draw(grid, cols, rows, width, ctx), 20);
}

function mouseDragged(grid: string[][], cols: number, rows: number, width: number, e: TouchEvent) {
  let mouseX = e.touches[0].pageX;
  let mouseY = e.touches[0].pageY;

  let mouseCol = Math.floor(mouseX / width);
  let mouseRow = Math.floor(mouseY / width);

  let matrix = 5;
  let extent = Math.floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (Math.random() < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col, cols) && withinRows(row, rows)) {
          grid[col][row] = getColor();
        }
      }
    }
  }
}

function draw(grid: string[][], cols: number, rows: number, width: number, ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] != "") {
        ctx.fillStyle = grid[i][j];
      } else {
        ctx.fillStyle = Colors.BLACK;
      }
      ctx.fillRect(width * i, width * j, width, width);
    }
  }

  let nextGrid = gridInit(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      if (state != "") {
        let below = grid[i][j + 1];
        let dir = Math.random() > 0.5 ? 1 : -1;

        let belowA = withinCols(i + dir, cols) ? grid[i + dir][j + 1] : "";
        let belowB = withinCols(i - dir, cols) ? grid[i - dir][j + 1] : "";

        if (below === "") {
          nextGrid[i][j + 1] = state;
        } else if (belowA === "" && withinCols(i + dir, cols)) {
          nextGrid[i + dir][j + 1] = state;
        } else if (belowB === "" && withinCols(i - dir, cols)) {
          nextGrid[i - dir][j + 1] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }

  return nextGrid;
}
