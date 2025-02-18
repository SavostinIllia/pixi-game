import { Container, Ticker } from "pixi.js";
import { createStar } from "../utils";

export async function starsInit() {
  const { app } = window;
  const starsContainer = new Container();
  app.stage.addChild(starsContainer);

  for (let i = 0; i < 350; i++) {
    const x = Math.random() * app.screen.width;
    const y = Math.random() * 150;
    starsContainer.addChild(createStar(x, y));
  }

  Ticker.shared.add(() => {
    for (let star of starsContainer.children) {
      star.alpha =
        0.5 + 0.5 * Math.sin((Date.now() / 100) * 0.2 + star.x * 0.05);
    }
  });
}
