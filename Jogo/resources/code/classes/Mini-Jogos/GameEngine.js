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
        this.gameMM = new GameMataMoscas(ctx);
        this.gameMH = new GameMontyHall(ctx);
        // commented block for test purposes only
        /*this.gameMM.activate();
        this.startAnim();
        let me = this;
        document.getElementById("Change_game").onclick = function (ev) {
            if(me.gameMM.isActive){
                me.gameMM.deactivate();
                me.gameMH.activate();
            }else{
                me.gameMH.deactivate();
                me.gameMM.activate();
            }
        };*/
    }


    startAnim() //Colocar o startTime a 0
    {
        this.draw();
        this.animLoop(0);
    }

    draw() {
        this.gameMM.draw(this.ctx);
        this.gameMH.draw(this.ctx);
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