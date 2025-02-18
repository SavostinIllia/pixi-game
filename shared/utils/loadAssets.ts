import { Assets, Container, Graphics, Text } from "pixi.js";

export async function loadAssets() {
  const loaderContainer = new Container();

  const background = new Graphics();
  background.fill(0x404372);
  loaderContainer.addChild(background);

  const loadingText = new Text({
    text: "Loading... 0%",
    style: {
      fontSize: 30,
      fill: 0xffffff,
      align: "center",
    },
  });

  loadingText.anchor.set(0.5);
  loadingText.x = window.app.screen.width / 2;
  loadingText.y = window.app.screen.height / 2;
  loaderContainer.addChild(loadingText);

  window.app.stage.addChild(loaderContainer);

  await Assets.init({ manifest: "/manifest.json" });

  const bundles = ["backgroundAsset", "chestAsset", "winAsset"];
  let loaded = 0;

  for (const bundle of bundles) {
    await Assets.loadBundle(bundle, (progress) => {
      loaded += progress;
      let percent = Math.round((loaded / bundles.length) * 100);
      loadingText.text = `Loading... ${percent}%`;
    });
  }

  window.app.stage.removeChild(loaderContainer);
}
