import { Assets, Container, Sprite } from "pixi.js";
import { getRandomTexture } from "./getRandomTexture";

export interface CoinSprite extends Sprite {
  speed: number;
  rotationSpeed: number;
  coin: CoinSprite;
  bonus: boolean;
}

export function createCoin(parentLayer: Container, bonus: boolean): CoinSprite {
  const texture = bonus ? getRandomTexture(bonus) : Assets.get("coin");

  const coin = new Sprite(texture) as CoinSprite;

  coin.speed = 2 + Math.random() * 3;
  coin.rotationSpeed = 0.05 + Math.random() * 0.1;

  coin.anchor.set(0.5);

  coin.scale.set(0.1 + Math.random() * 0.15);

  coin.y = -50;
  coin.x = Math.random() * (parentLayer.width - coin.width) + coin.width / 2;

  return coin;
}
