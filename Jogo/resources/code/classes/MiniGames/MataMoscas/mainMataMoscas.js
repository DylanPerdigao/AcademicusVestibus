(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    new mainMataMoscas(ctx);
}

class mainMataMoscas {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameMM = new GameMataMoscas(ctx);
        this.startAnim();
        this.gameMM.activate();
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
        window.requestAnimationFrame(al);
        this.render(time);
    }

    //resedenho, actualizações, ...
    render(time) {
        this.gameMM.update(time);
        this.clear();
        this.draw();

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}