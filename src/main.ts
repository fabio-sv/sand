import "./style.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas",
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let colorFactor = 10;
setInterval(() => colorFactor = (colorFactor + 1) % 360, 100);

function getRandomColor() {
  let h = Math.floor(colorFactor);
  let s = 100;
  let l = 50;

  var color = `hsl(${h}, ${s}%, ${l}%)`;

  return color;
}

function gridInit(cols: number, rows: number): string[][] {
  let arr = new Array(cols);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = "";
    }
  }

  return arr;
}

function withinCols(i: number, cols: number) {
  return i >= 0 && i <= cols - 1;
}

function withinRows(j: number, rows: number) {
  return j >= 0 && j <= rows - 1;
}

let width = 10;
let cols = Math.round(window.innerWidth / width);
let rows = Math.round(window.innerHeight / width);

main();

function main() {
  let grid = gridInit(cols, rows);
  grid[20][10] = getRandomColor();

  let drag = false;

  // document.addEventListener("mousemove", (e) => {
  //   e.preventDefault();
  //   mouseDragged(grid, e);
  // });

  document.addEventListener("mousedown", () => {
    drag = true;

    console.log("mousedown", drag);
  });
  document.addEventListener("mousemove", (e) => {
    if (drag) mouseDragged(grid, e);
  });
  document.addEventListener("mouseup", () => {
    drag = false
    console.log("mouseup", drag)
  });

  setInterval(() => grid = draw(grid, width), 100);
}

function mouseDragged(grid: string[][], e: MouseEvent) {
  console.log("dragged");
  let mouseX = e.clientX;
  let mouseY = e.clientY;

  let mouseCol = Math.floor(mouseX / width);
  let mouseRow = Math.floor(mouseY / width);

  // Randomly add an area of sand particles
  let matrix = 5;
  let extent = Math.floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (Math.random() < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col, cols) && withinRows(row, rows)) {
          grid[col][row] = getRandomColor();
        }
      }
    }
  }
}

function draw(grid: string[][], width: number) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] != "") {
        ctx.fillStyle = grid[i][j];
      } else {
        ctx.fillStyle = "#FFFFFF";
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
