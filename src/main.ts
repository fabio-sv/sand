import "./style.css";
import { start } from "./helpers/sim";
import { getColor } from "./helpers/color";
import { updateH1, updateH2 } from "./helpers/headings";

let primaryColor = getColor();
let secondaryColor = getColor();

const heading1 = document.getElementById("sandy") as HTMLHeadingElement;
const heading2 = document.getElementById("drag") as HTMLHeadingElement;

updateH1(heading1, primaryColor, secondaryColor);
updateH2(heading2, primaryColor);

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas",
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let width = 5;
let cols = Math.round(window.innerWidth / width);
let rows = Math.round(window.innerHeight / width);

start(cols, rows, width, ctx);
