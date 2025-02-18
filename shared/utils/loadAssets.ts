import { Assets } from "pixi.js";

export async function loadAssets() {
  await Assets.init({ manifest: "/manifest.json" });

  await Assets.loadBundle("backgroundAsset");
  await Assets.loadBundle("chestAsset");
  await Assets.loadBundle("winAsset");
}
