function drawBackground(bg , context , sprites) {
    bg.ranges.forEach(([x1 , x2 , y1 , y2]) => {
      for(let x = x1; x <= x2; x++) {
        for(let y = y1; y <= y2; y++) {
          sprites.drawTile(bg.tile , context , x , y);
        }
      }
    })
}

export const createBackgroundLayer = (bgs , sprites) => {
    const buffer = document.createElement('canvas');

    buffer.width = 256;
    buffer.height = 240;

    bgs.forEach(bg => {
        drawBackground(bg , buffer.getContext('2d') , sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer , 0 , 0);
    };
}

export function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
  }
}