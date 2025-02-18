import { Assets, Sprite } from "pixi.js";

export async function bgInit() {
  const { app } = window;
  const backgroundTexture = Assets.get("bg");
  const sprite = new Sprite(backgroundTexture);

  sprite.scale.set(1, 0.9);

  app.stage.addChild(sprite);
}
