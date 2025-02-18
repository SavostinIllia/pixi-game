import { Container } from "pixi.js";
import { gameInit } from "../components";

type childContainer = Container & { customName?: string };

export async function restartGame() {
  window.gameState = {
    gameEnabled: false,
    isChestLocked: false,
    playAttempts: 4,
    gameOver: false,
  };

  window.app.stage.children.forEach((child: childContainer) => {
    if (
      child.customName === "gameInit" ||
      child.customName === "animationContainer"
    ) {
      child.destroy({ children: true });
    }
  });

  gameInit();
}
