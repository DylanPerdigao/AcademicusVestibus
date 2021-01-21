"use strict";

class SpriteImage {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.img = img;
        this.imageData = this.getImageData(img);
    }

    getImageData(img) {
        var canvas = document.createElement("canvas"); //canvas auxiliar
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);

        return ctx.getImageData(0, 0, this.width, this.height);
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    clear(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    mouseOverBoundingBox(ev) //ev.target é a canvas
    {
        var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
        var my = ev.offsetY;

        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height)
            return true;
        else
            return false;
    }

    clickedBoundingBox(ev) //ev.target é a canvas
    {
        return this.mouseOverBoundingBox(ev);
    }

    intersectsBoundingBox(sprite) {
        return this.x <= sprite.x + sprite.width && sprite.x <= this.x + this.width && this.y <= sprite.y + sprite.height && sprite.y <= this.y + this.height;
    }

    intersectPixels(sprite) {
        if (this.intersectsBoundingBox(sprite)) {
            //obter retangulo
            var xMin = Math.max(this.x, sprite.x);
            var xMax = Math.min(this.x + this.width, sprite.x + sprite.width);
            var yMin = Math.max(this.y, sprite.y);
            var yMax = Math.min(this.y + this.height, sprite.y + sprite.height);

            for (let y = yMin; y <= yMax; y++) {
                for (let x = xMin; x <= xMax; x++) {
                    //this
                    var xlocalThis = Math.round(x - this.x);
                    var ylocalThis = Math.round(y - this.y);

                    var pixelNumThis = xlocalThis + ylocalThis * this.width;
                    var pixelPosAlphaThis = pixelNumThis * 4 + 3;

                    //sprite2
                    var xlocalSprite = Math.round(x - sprite.x);
                    var ylocalSprite = Math.round(y - sprite.y);

                    var pixelNumSprite = xlocalSprite + ylocalSprite * sprite.width;
                    var pixelPosAlphaSprite = pixelNumSprite * 4 + 3;

                    if (this.imageData.data[pixelPosAlphaThis] > 0 && sprite.imageData.data[pixelPosAlphaSprite] > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

