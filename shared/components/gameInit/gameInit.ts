import { Container, Graphics, Text } from "pixi.js";
import { startGameButtonHandler } from "./startGameButtonHandler";
import { gameChestContainerHandler } from "./gameChestContainerHandler";
import { eventBus } from "../../utils/eventBus";

export interface GameContainer extends Container {
  customName: string;
}

export async function gameInit() {
  const { app } = window;
  const { startGameButton } = startGameButtonHandler();
  const { gameChestContainer } = gameChestContainerHandler();

  const gameContainer = new Container() as GameContainer;
  gameContainer.customName = "gameInit";

  const background = new Graphics();
  background
    .roundRect(0, 0, 600, 500, 30)
    .fill({ color: 0x111111, alpha: 0.5 });

  const gameAttempts = new Text({
    text: `Game Attemps left : ${window.gameState.playAttempts}`,
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    },
  });

  const gameScore = new Text({
    text: `Game Score : ${window.gameState.gameScore}`,
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "right",
    },
  });

  gameContainer.addChild(background);
  gameContainer.x = (app.screen.width - background.width) / 2;
  gameContainer.y = (app.screen.height - background.height) / 2;

  /*
  Game Start Button
  */
  gameContainer.addChild(startGameButton);
  startGameButton.position.set(
    (gameContainer.width - startGameButton.width) / 2,
    gameContainer.height - startGameButton.height - 20
  );

  /*
  Game Chests
  */
  gameContainer.addChild(gameChestContainer);
  gameChestContainer.position.set(
    gameContainer.width - gameChestContainer.width,
    (gameContainer.height - gameChestContainer.height) / 2
  );

  gameContainer.addChild(gameAttempts);
  gameAttempts.position.set(40, 25);

  gameContainer.addChild(gameScore);
  gameScore.position.set(gameContainer.width - gameScore.width - 80, 25);

  eventBus.on("playAttempts", (attempt) => {
    gameAttempts.text = `Game Attemps left : ${attempt}`;
  });

  eventBus.on("gameScore", (score) => {
    gameScore.text = `Game Score : ${score}`;
  });

  app.stage.addChild(gameContainer);
}
