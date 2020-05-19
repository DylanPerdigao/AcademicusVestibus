(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    function msgHandler(ev) {
        new mainMataMoscas(ctx, canvas, messageHandler(ev));
    }

    function messageHandler(ev){
        return ev.source;
    }

    //listener
    window.addEventListener("message",msgHandler);
}

class mainMataMoscas {
    constructor(ctx, canvas, mainWindow) {
        this.ctx = ctx;
        this.gameMM = new GameMataMoscas(ctx, canvas, mainWindow);
        this.startAnim();
    }


    startAnim() //Colocar o startTime a 0
    {
        this.draw();
        this.animLoop(0);
    }

    draw() {
        this.gameMM.draw(this.ctx);
    }

    animLoop(time) {
        let me = this;
        var al = function (time) {
            me.animLoop(time); //time --->timestamp atual; startTime --->timestamp quando a animaçao começou
        };
        var reqID=window.requestAnimationFrame(al);
        this.render(time, reqID);
    }

    //resedenho, actualizações, ...
    render(time, reqID) {
        if (!this.gameMM.update(time)) {
            //break loop
            window.cancelAnimationFrame(reqID);
            return;
        }
        this.clear();
        this.draw();

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}