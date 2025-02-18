import { Container } from "pixi.js";
import { createChest } from "../../utils/index";

export const chestWidth = 280;
export const chestHeight = 100;
export const winChest = Math.floor(Math.random() * 6);

export function gameChestContainerHandler() {
  const gameChestContainer = new Container();
  const padding = 20;
  const columns = 2;
  const chestAmount = 6;

  for (let i = 0; i < chestAmount; i++) {
    const chest = createChest(i);
    const col = i % columns;
    const row = Math.floor(i / columns);

    chest.x = col * (chestWidth + padding);
    chest.y = row * (chestHeight + padding);
    gameChestContainer.addChild(chest);
  }

  return { gameChestContainer };
}
