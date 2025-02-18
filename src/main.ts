import "normalize.css";
import "./style.css";
import { bgInit, starsInit, gameInit } from "../shared/components/index";
import { initDevtools } from "@pixi/devtools";
import { Application } from "pixi.js";
import { loadAssets } from "../shared/utils";

declare global {
  interface Window {
    app: Application;
    gameState: {
      gameEnabled: boolean;
      isChestLocked: boolean;
      playAttempts: number;
      gameOver: boolean;
      winBonusChest: number;
      gameScore: number;
    };
  }
}

window.gameState = {
  gameEnabled: false,
  isChestLocked: false,
  playAttempts: 4,
  gameOver: false,
  winBonusChest: Math.floor(Math.random() * 6),
  gameScore: Number(0),
};

window.app = new Application();

(async () => {
  await window.app.init({ resizeTo: window });
  window.app.canvas.style.position = "absolute";
  document.body.appendChild(window.app.canvas);

  await loadAssets();
  await bgInit();
  await starsInit();
  await gameInit();

  initDevtools({ app: window.app });
})();
