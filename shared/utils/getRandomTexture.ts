import { Assets } from "pixi.js";

export function getRandomTexture(bonus: boolean) {
  const textures = bonus ? ["diamond", "coin"] : ["coin", "diamond"];
  return Assets.get(textures[Math.floor(Math.random() * 2)]);
}
