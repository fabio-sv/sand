import "./style.css";
import { start } from "./helpers/sim";
import { getColor } from "./helpers/color";

let primaryColor = getColor();
let secondaryColor = getColor();

const heading =document.getElementById("sandy") as HTMLHeadingElement;
heading.style.backgroundImage = `linear-gradient(t0 right, ${primaryColor}, ${secondaryColor})`;
heading.style.textShadow = `0px 0px 40px ${secondaryColor}`

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas",
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let width = 10;
let cols = Math.round(window.innerWidth / width);
let rows = Math.round(window.innerHeight / width);

start(cols, rows, width, ctx)

