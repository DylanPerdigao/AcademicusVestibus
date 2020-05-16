"use strict";

class GameEngine {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameMM = new GameMataMoscas(ctx);
        //this.gameMH = new GameMontyHall(ctx);
        this.startAnim();
    }


    startAnim() //Colocar o startTime a 0
    {
        this.draw();
        this.animLoop(0);
    }

    draw() {
        this.gameMM.draw(this.ctx);
        //this.gameMH.draw(this.ctx);
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
        this.gameMM.update(time);
        this.clear();
        this.draw();

        //this.ctx.fillText(txt, 250, 20);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}