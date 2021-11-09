import Level from "./level.js";
import { createSpriteLayer, createBackgroundLayer } from "./layers.js";
import { loadBackgroundSprites } from "./sprites/sprites.js";

export const ImageLoader = (url) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.addEventListener("load", () => {
      resolve(img);
    });

    img.src = url;
  });
};

function createTiles(level, backgrounds) {
  backgrounds.forEach((bg) => {
    bg.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          level.tiles.set(x, y, {
            name: bg.tile,
          });
        }
      }
    });
  });
}

export const LevelLoader = (name) => {
  return Promise.all([
    fetch(`/src/levels/${name}.json`).then((r) => r.json()),
    loadBackgroundSprites(),
  ]).then(([levelSpec, bgSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const bgLayer = createBackgroundLayer(level, bgSprites);
    level.comp.layers.push(bgLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
};
