"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    let engine = new GameEngine(ctx);
}

class GameEngine {
    constructor(ctx) {
        this.ctx = ctx;
        this.mH = new MataMoscas(ctx, true);
        this.mH.activate();
        this.startAnim();
    }




    startAnim() //Colocar o startTime a 0
    {
        this.draw();
        this.animLoop(0);
    }

    draw() {
        this.mH.draw(this.ctx);
        //outros jogos
    }

    animLoop(time) {
        let me = this;
        var al = function (time) {
            me.animLoop(time); //time --->timestamp atual; startTime --->timestamp quando a animaçao começou
        };
        var reqID = window.requestAnimationFrame(al);
        this.render(reqID, time);
    }

//resedenho, actualizações, ...
    render(reqID, time) {
        this.mH.update(time);
        this.clear();
        this.draw(this.ctx);

        //this.ctx.fillText(txt, 250, 20);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}