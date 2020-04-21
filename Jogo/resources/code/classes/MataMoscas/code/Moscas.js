"use strict";

class Moscas extends SpriteImage{
    constructor(x, y, w, h){
        var mosca = new Image();
        mosca.src = "resources/moscas.png";
        super(x, y, w, h);
    }

    draw(ctx){
        super.draw(ctx);
    }

    clear(){

    }
}