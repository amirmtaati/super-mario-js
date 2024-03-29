export const createBackgroundLayer = (level, sprites) => {
  const buffer = document.createElement("canvas");

  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext("2d");

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
};

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach((entity) => {
      entity.draw(context);
    });
  };
}

export function createCollisionLayer(level) {
  const resolvedTiles = [];

  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({x , y})
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  // // return function drawCollison(context) {
  // //   constext.strokeStyle = "blue";

  // //   resolvedTiles.forEach(({x , y}) => {
  // //     context.beginPath();
  // //     context.rect(x * tileSiz)
  // //   })

  // //   resolvedTiles.length = 0;
  // }
}
