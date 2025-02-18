import { Assets, Texture, Rectangle, AnimatedSprite } from "pixi.js";
import {
  chestWidth,
  chestHeight,
} from "../components/gameInit/gameChestContainerHandler";
import { eventBus } from "./eventBus";
import { animationLayer } from "../components";

class CustomAnimatedSprite extends AnimatedSprite {
  isFullyOpened: boolean = false;
  chestId: number = 0;
}
export function createChest(i: number) {
  const baseTexture = Assets.get("chest").baseTexture;

  const frameWidth = baseTexture.width / 4;
  const frameHeight = baseTexture.height;

  const frames = Array.from({ length: 4 }, (_, i) => {
    const frameTexture = new Texture(baseTexture);
    //@ts-ignore
    frameTexture.frame = new Rectangle(
      i * frameWidth,
      0,
      frameWidth,
      frameHeight
    );
    frameTexture.updateUvs();
    return frameTexture;
  });

  const chest = new CustomAnimatedSprite(frames);
  chest.chestId = i;
  chest.width = chestWidth;
  chest.height = chestHeight;
  chest.anchor.set(0.5);
  chest.alpha = 0.2;
  chest.animationSpeed = 0.09;
  chest.loop = false;
  chest.gotoAndStop(0);
  chest.eventMode = "static";
  chest.cursor = "pointer";

  eventBus.on("gameEnabled", (isEnabled) => {
    chest.alpha = isEnabled ? 1 : 0.2;
  });

  chest.on("pointerenter", () => {
    if (!window.gameState.gameEnabled || window.gameState.isChestLocked) return;
    if (!chest.isFullyOpened) {
      chest.gotoAndPlay(0);
      chest.onFrameChange = () => {
        if (chest.currentFrame >= 1) {
          chest.stop();
        }
      };
    }
  });

  chest.on("pointerleave", () => {
    if (!window.gameState.gameEnabled || window.gameState.isChestLocked) return;
    if (!chest.isFullyOpened) {
      chest.gotoAndStop(0);
    }
  });

  chest.on("pointerdown", () => {
    if (
      !window.gameState.gameEnabled ||
      chest.isFullyOpened ||
      window.gameState.isChestLocked
    )
      return;

    chest.gotoAndPlay(2);
    chest.isFullyOpened = true;
    window.gameState.isChestLocked = true;

    eventBus.emit("playAttempts", (window.gameState.playAttempts -= 1));

    chest.parent.children.forEach((el) => {
      if (
        el instanceof CustomAnimatedSprite &&
        el !== chest &&
        !el.isFullyOpened
      ) {
        el.alpha = 0.2;
      }
    });

    chest.onFrameChange = () => {
      if (chest.currentFrame === frames.length - 1) {
        setTimeout(() => {
          window.gameState.isChestLocked = false;
          chest.parent.children.forEach((el) => {
            if (el instanceof CustomAnimatedSprite && !el.isFullyOpened) {
              el.alpha = 1;
            }
          });
          const win = Math.random() < 0.5;
          if (window.gameState.winBonusChest === chest.chestId) {
            animationLayer("win", true);
            eventBus.emit("gameScore", (window.gameState.gameScore += 100));

            window.gameState.gameOver = true;
          } else if (win) {
            eventBus.emit("gameScore", (window.gameState.gameScore += 10));
            animationLayer("win", false);
          } else {
            animationLayer("lose");
          }

          chest.parent.children.forEach((el) => {
            if (el instanceof CustomAnimatedSprite && el.isFullyOpened) {
              el.alpha = 0.2;
            }
          });
        }, 500);
      }
    };
  });

  return chest;
}
