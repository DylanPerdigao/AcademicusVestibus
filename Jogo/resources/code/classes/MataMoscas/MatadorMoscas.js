"use strict";

class MatadorMoscas extends SpriteImage{
    constructor(x, y, w, h, img, clickable) {
        super(x, y, w, h, img, clickable);
    }

    intersectPixels(sprite) {
        if (this.intersectsBoundingBox(sprite)) {
            //obter retangulo
            var xMin = Math.max(this.x, sprite.x);
            var xMax = Math.min(this.x + this.width, sprite.x + sprite.width);
            var yMin = Math.max(this.y, sprite.y);
            var yMax = Math.min(this.y + this.height/2.5, sprite.y + sprite.height);

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