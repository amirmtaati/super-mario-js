import { ImageLoader } from "../loader.js";
import Sprite from './spriteSheet.js';

export const loadMarioSprite = () => {
    return ImageLoader('/src/img/characters.gif').then(img => {
        const mario = new Sprite(img , 16 , 16);

        mario.define('idle' , 276 , 44 , 16 , 16);

        return mario;
    })
}

export const loadBackgroundSprites = () => {
    return ImageLoader('/src/img/tiles.png').then(img => {
        const sprite = new Sprite(img , 16 , 16);

        sprite.defineTile('ground' , 0 , 0);
        sprite.defineTile('sky' , 3 , 23);

        return sprite;
    });
}