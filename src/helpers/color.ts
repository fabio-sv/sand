let colorFactor = Math.random() * 360;
setInterval(() => colorFactor = (colorFactor + 1) % 360, 50);

export function getColor() {
  let h = Math.floor(colorFactor);
  let s = 100;
  let l = 50;

  var color = `hsl(${h}, ${s}%, ${l}%)`;

  return color;
}