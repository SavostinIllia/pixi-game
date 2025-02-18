import { Graphics } from "pixi.js";

export function createStar(x: number, y: number) {
  const star = new Graphics();
  const radius = 2 + Math.random() * 3;
  const rotation = Math.random() * Math.PI * 2;

  star
    .star(x, y, 5, radius, 0, rotation)
    .fill({ color: 0xffdf00, alpha: radius / 5 });
  star.x = x;
  star.y = y;
  star.alpha = Math.random();

  return star;
}
