import { Container, TextStyle, Text, Ticker } from "pixi.js";
import { CoinSprite, createCoin } from "../../utils/createCoin";

export function winAnimation(
  parentLayer: Container,
  duration: number,
  bonus: boolean
) {
  const coins: CoinSprite[] = [];

  const textStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 72,
    fill: 0x48efab,
    fontWeight: "bold",
    stroke: "#000000",
    dropShadow: true,
  });

  const text = new Text({
    text: "Bonus win 1000$",
    style: textStyle,
  });
  text.zIndex = 10;
  if (bonus) {
    parentLayer.addChild(text);
    text.x = (parentLayer.width - text.width) / 2;
    text.y = (parentLayer.height - text.height) / 2;
  }

  const interval = setInterval(() => {
    const coin = createCoin(parentLayer, bonus);
    parentLayer.addChild(coin);
    coins.push(coin);
  }, 10);

  const ticker = new Ticker();
  ticker.add(() => {
    for (let i = coins.length - 1; i >= 0; i--) {
      const coin = coins[i];
      coin.y += coin.speed;
      coin.rotation += coin.rotationSpeed;
    }
  });
  ticker.start();

  setTimeout(() => {
    clearInterval(interval);
    ticker.stop();
  }, duration);

  return ticker;
}
