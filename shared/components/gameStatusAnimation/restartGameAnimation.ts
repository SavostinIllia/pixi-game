import { Container, Graphics, Text } from "pixi.js";
import { restartGame } from "../../utils";

export function restartGameAnimation(parentLayer: Container) {
  const restartGameButton = new Graphics();
  restartGameButton.roundRect(0, 0, 250, 50, 10).fill({ color: 0x26294e });
  restartGameButton.eventMode = "static";

  const buttonText = new Text({
    text: "Restart game",
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xce674f,
      align: "center",
    },
  });

  buttonText.position.set(50, 12);
  restartGameButton.addChild(buttonText);
  restartGameButton.cursor = "pointer";

  parentLayer.addChild(restartGameButton);

  restartGameButton.position.set(
    (parentLayer.width - restartGameButton.width) / 2,
    (parentLayer.height - restartGameButton.height) / 2
  );

  restartGameButton.on("pointerdown", () => {
    restartGame();
  });
}
