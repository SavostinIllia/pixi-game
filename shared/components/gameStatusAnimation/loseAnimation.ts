import { Container, Text, TextStyle, Ticker } from "pixi.js";

export function loseAnimation(parentLayer: Container) {
  const textStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 72,
    fill: 0xdc6c41,
    fontWeight: "bold",
    stroke: "#000000",
    dropShadow: true,
  });

  const text = new Text({
    text: "Empty Chest",
    style: textStyle,
  });
  text.anchor.set(0.5);
  text.x = parentLayer.width / 2;
  text.y = parentLayer.height / 2;

  let scaleDirection = 1;

  const textTicker = new Ticker();

  textTicker.add(() => {
    text.scale.x += 0.002 * scaleDirection;
    text.scale.y += 0.002 * scaleDirection;
  });

  textTicker.start();
  parentLayer.addChild(text);

  return textTicker;
}
