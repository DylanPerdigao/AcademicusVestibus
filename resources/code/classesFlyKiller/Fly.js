"use strict";
const MOVEMENT_RADIUS = 50;

class Fly extends SpriteImage{
    constructor(x, y, w, h, img, alive_time){
        super(x, y, w, h, img);
        this.alive_time = Math.random()*(alive_time-1) + 1;
        this.xini = x;
        this.yini = y;
        this.angle = 0;
    }

    update(time_diff){
        this.alive_time -= time_diff;
        this.x = this.xini + MOVEMENT_RADIUS*Math.cos(this.angle);
        this.y = this.yini + MOVEMENT_RADIUS*Math.sin(this.angle);
        this.angle = this.angle + time_diff/200;
    }
}