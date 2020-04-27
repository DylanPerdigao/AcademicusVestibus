"use strict";

class Mosca extends SpriteImage{
    constructor(x, y, w, h, img, alive_time){
        super(x, y, w, h, img);
        if (alive_time === undefined){
            this.alive_time = Math.random()*(ALIVE_TIME-1) + 1
        }else this.alive_time = alive_time;
    }


}