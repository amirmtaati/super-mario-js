class TileResolver {
  constructor(matrix, tileSize = 16) {
    this.matrix = matrix;
    this.tileSize = tileSize;
  }

  toIndex(pos) {
    return Math.floor(pos / this.tileSize);
  }

  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;

    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);

    return range;
  }

  getByIndex(x, y) {
    const tile = this.matrix.get(x, y);
    if (tile) {
      const y1 = y * this.tileSize;
      const y2 = y1 * this.tileSize;
      const x1 = x * this.tileSize;
      const x2 = x1 * this.tileSize;
      return {
        tile,
        x1,
        x2,
        y1,
        y2,
      };
    }
  }

  searchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
  }

  searchByRange(x1, x2, y1, y2) {
    const matches = [];
    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const match = this.getByIndex(indexX, indexY);
        if (match) {
          matches.push(match);
        }
      });
    });

    return matches;
  }
}

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkX(entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.size.x;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.pos.y,
      entity.pos.y + entity.size.y
    );

    matches.forEach((match) => {
      if (match.tile.name !== "ground") {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.size.x > match.x1) {
          entity.pos.x = match.x1 - entity.size.x;
          entity.vel.x = 0;
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.pos.x = match.x2;
          entity.vel.x = 0;
        }
      }
    });
  }

  checkY(entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.size.y;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.size.x,
      y,
      y
    );

    matches.forEach((match) => {
      if (match.tile.name !== "ground") {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.y = match.y2;
          entity.vel.y = 0;
        }
      }
    });
  }

  test(entity) {
    this.checkY(entity);
  }
}
