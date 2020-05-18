"use strict";

class SpriteImage {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.img = img;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    mouseOver(ev) //ev.target é a canvas
    {
        var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
        var my = ev.offsetY;

        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height)
            return true;
        else
            return false;
    }

    clicked(ev) //ev.target é a canvas
    {
        return this.mouseOver(ev);
    }
}
