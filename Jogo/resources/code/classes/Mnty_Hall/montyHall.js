"use strict";

class montyHall {
    constructor(ctx, isActive) {
        if(isActive !== undefined)
            this.isActive = isActive;
        else this.isActive = false;
        this.ctx = ctx;
        this.numWin = 0;
        this.numLoss = 0;
        this.init();
    }

    init() {
        let nLoad = 0;
        let totLoad = 3;
        this.portas = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.portas[i] = new mhPorta(i * 200, 50, 200, 350, false);
        }

        //Decide aleatoriamente em que porta esta o dinheiro
        var doorWinner = Math.floor(Math.random()*3);
        this.portas[doorWinner].isWinner = true;


        this.txt = "Escolha uma porta!";
    }

    draw(ctx){
        if(!this.isActive) return;
        for(let i = 0; i < 3; i++){
            this.portas[i].draw(ctx)
        }
        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.txt, 250, 20);
    }

    activate(){
        this.isActive = true;
        let me = this;
        var clickHandler1 = function (ev) {
            let escolhida = -1;
            for(let i = 0; i < me.portas.length; i++){
                if(me.portas[i].mouseOverBoundingBox(ev)){
                    escolhida = i;
                }
            }
            if(escolhida === -1) return;
            let premiada = -1;
            for(let i = 0; i < me.portas.length; i++) {
                if(me.portas[i].isWinner) premiada = i;
                me.portas[i].open();
            }
            if (escolhida === premiada) {
                me.txt = "Ganhou!";
            }else me.txt = "Riperino :(";
            me.ctx.canvas.removeEventListener("click", clickHandler1);
        };
        var clickHandler0 = function (ev) {
            let escolhida = -1;
            for(let i = 0; i < me.portas.length; i++) {
                    if (me.portas[i].mouseOverBoundingBox(ev)){
                        escolhida = i;
                        break;
                    }
            }
            if(escolhida === -1) return;
            let abrir = -1;
            while(abrir === -1 || me.portas[abrir].isWinner || abrir === escolhida){
                abrir = Math.floor(Math.random()*3);
            }
            me.portas[abrir].open();
            me.ctx.canvas.removeEventListener("click", clickHandler0);
            me.ctx.canvas.addEventListener("click", clickHandler1);
        };
        this.ctx.canvas.addEventListener("click", clickHandler0);
    }
}
