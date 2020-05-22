"use strict";

class Fly extends SpriteImage{
    constructor(x, y, w, h, img, alive_time){
        super(x, y, w, h, img);
        this.alive_time = Math.random()*(alive_time-1) + 1;
    }

}