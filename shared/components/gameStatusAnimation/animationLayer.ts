import { Container, Graphics, Ticker } from "pixi.js";
import { winAnimation } from "./winAnimation";
import { loseAnimation } from "./loseAnimation";
import { restartGameAnimation } from "./restartGameAnimation";
import { restartGame } from "../../utils";

type AnimationStatus = "win" | "lose" | "bonus";

let currentTicker: Ticker | null = null;

export interface AnimationContainer extends Container {
  customName: string;
}

export function animationLayer(
  animationStatus?: AnimationStatus,
  bonus: boolean = false
) {
  const { app } = window;

  const animationContainer = new Container() as AnimationContainer;
  animationContainer.customName = "animationContainer";

  const animationLayer = new Graphics();
  animationLayer
    .roundRect(0, 0, 600, 500, 30)
    .fill({ color: 0x111111, alpha: 0.8 });

  animationLayer.interactive = true;
  animationLayer.alpha = 0;

  animationContainer.addChild(animationLayer);

  animationLayer.x = (app.screen.width - animationLayer.width) / 2;
  animationLayer.y = (app.screen.height - animationLayer.height) / 2;

  app.stage.addChild(animationContainer);

  const fadeInTicker = new Ticker();

  fadeInTicker.add(() => {
    animationLayer.alpha += 0.05;
    if (animationLayer.alpha >= 0.8) {
      animationLayer.alpha = 0.8;
      fadeInTicker.stop();
      if (animationStatus === "win") {
        currentTicker = winAnimation(animationLayer, 2000, bonus);
      }
      if (animationStatus === "lose") {
        currentTicker = loseAnimation(animationLayer);
      }
    }
  });

  fadeInTicker.start();

  setTimeout(() => {
    const fadeOutTicker = new Ticker();

    if (window.gameState.gameOver === true) {
      animationContainer.destroy();
      restartGame();
      return;
    }

    if (window.gameState.playAttempts <= 0) {
      if (currentTicker) {
        currentTicker.stop();
        currentTicker.destroy();
      }
      animationLayer.removeChildren();
      restartGameAnimation(animationLayer);
      return;
    }

    fadeOutTicker.add(() => {
      animationLayer.alpha -= 0.05;
      if (animationLayer.alpha <= 0) {
        fadeOutTicker.stop();
        app.stage.removeChild(animationLayer);
        animationLayer.destroy();
      }
    });
    fadeOutTicker.start();
  }, 2500);
}
