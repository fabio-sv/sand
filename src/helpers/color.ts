let colorFactor = Math.random() * 360;
setInterval(() => colorFactor = (colorFactor + 1) % 360, 50);

export let Colors = {
  BLACK: "#28282B",
};

export function getColor() {
  let h = Math.floor(colorFactor);
  let s = 80;
  let l = 70;

  var color = `hsl(${h}, ${s}%, ${l}%)`;

  return color;
}
