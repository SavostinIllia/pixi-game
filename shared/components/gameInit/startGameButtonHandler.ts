import { Graphics, Text } from "pixi.js";
import { eventBus } from "../../utils/eventBus";

export function startGameButtonHandler() {
  const startGameButton = new Graphics();
  startGameButton.roundRect(0, 0, 250, 50, 10).fill({ color: 0x26294e });
  startGameButton.eventMode = "static";

  const buttonText = new Text({
    text: "Start the game",
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xce674f,
      align: "center",
    },
  });

  buttonText.position.set(50, 12);
  startGameButton.addChild(buttonText);
  startGameButton.cursor = "pointer";

  startGameButton.on("pointerdown", () => {
    eventBus.emit("gameEnabled", (window.gameState.gameEnabled = true));
    startGameButton.parent.removeChild(startGameButton);
  });

  return { startGameButton };
}
