export function updateH1(
  h1: HTMLHeadingElement,
  primary: string,
  secondary: string,
) {
  h1.style.backgroundImage =
    `linear-gradient(t0 right, ${primary}, ${secondary})`;
  h1.style.textShadow = `0px 0px 40px ${secondary}`;
}

export function updateH2(h2: HTMLHeadingElement, primary: string) {
  h2.style.textShadow =
    `0px 0px 5px ${primary}, 0px 0px 10px ${primary}, 0px 0px 10px ${primary}, 0px 0px 20px ${primary}`;
}
