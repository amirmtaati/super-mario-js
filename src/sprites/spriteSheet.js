export default class Sprite {
    constructor(image , width , height) {
        this.img = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name , x , y , width , height) {
        const buffer  = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        const context = buffer.getContext('2d');

        context.drawImage(this.img , x, y, width , height , 0 , 0 , width , height);
        this.tiles.set(name , buffer);
    }

    draw(name , context , x , y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer , x , y);
    }

    defineTile(name , x , y) {
        this.define(name , x * this.width , y * this.height , this.width , this.height);
    }

    drawTile(name , context , x , y) {
        this.draw(name , context , x * this.width , y * this.height);
    }
}