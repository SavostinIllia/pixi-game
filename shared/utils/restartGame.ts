import { Container } from "pixi.js";
import { gameInit } from "../components";

type childContainer = Container & { customName?: string };

export async function restartGame() {
  window.gameState = {
    gameEnabled: false,
    isChestLocked: false,
    playAttempts: 4,
    gameOver: false,
    winBonusChest: Math.floor(Math.random() * 6),
    gameScore: 0,
  };

  const childrenToRemove = window.app.stage.children.filter(
    (child: childContainer) =>
      child.customName === "gameInit" ||
      child.customName === "animationContainer"
  );

  childrenToRemove.forEach((child) => {
    window.app.stage.removeChild(child);
    child.destroy();
  });

  await gameInit();
}
