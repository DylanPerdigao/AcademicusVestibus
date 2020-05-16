"use strict";

const INITIAL_MESSAGE_MONTY = "Escolha uma porta!";
const WIN_MESSAGE = "Ganhou!";
const LOSE_MESSAGE = "Perdeu!";

class GameMontyHall {
    constructor(ctx) {
        this.replay_button = document.getElementById("play_again");
        this.exit_button = document.getElementById("exit");
        this.ctx = ctx;
        this.numWin = 0;
        this.numLoss = 0;

        this.imgPortaAberta = new Image();
        this.imgPortaAberta.addEventListener("load", imgLoadedHandler);
        this.imgPortaAberta.src = "resources/porta_aberta.png";
    
        this.imgPortaFechada = new Image();
        this.imgPortaFechada.addEventListener("load", imgLoadedHandler);
        this.imgPortaFechada.src = "resources/porta_fechada.png";
    
        this.imgMoney = new Image();
        this.imgMoney.addEventListener("load", imgLoadedHandler);
        this.imgMoney.src = "resources/money.png";

        this.imgLoaded = 0;
        var me = this;
        function imgLoadedHandler(ev) {
            me.imgLoaded++;
            if (me.imgLoaded == 3) {
                me.init();
            }
        }

    }

    init() {
        this.portas = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.portas[i] = new mhPorta(i * 200, 50, 200, 350, this.imgPortaAberta, this.imgPortaFechada, this.imgMoney);
        }

        //Decide aleatoriamente em que porta esta o dinheiro
        var doorWinner = Math.floor(Math.random()*3);
        this.portas[doorWinner].isWinner = true;


        this.txt = INITIAL_MESSAGE_MONTY;

        let me = this;
        
        this.replay_button.onclick = function (ev) {
            me.reset()
        };
        this.exit_button.onclick = function (ev) {
            me.deactivate()
        };

        this.clickHandler1 = function (ev) {
            console.log(ev.offsetX,ev.offsetY)
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
                me.txt = WIN_MESSAGE;
                me.numWin++;
            }else{
                me.txt = LOSE_MESSAGE;
                me.numLoss++;
            }
            me.ctx.canvas.removeEventListener("click", me.clickHandler1);
        };

        this.clickHandler0 = function (ev) {
            console.log(ev.offsetX,ev.offsetY)
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
            me.ctx.canvas.removeEventListener("click", me.clickHandler0);
            me.ctx.canvas.addEventListener("click", me.clickHandler1);
        };

        
        this.ctx.canvas.addEventListener("click", this.clickHandler0);
        
        this.draw();
    }

    draw(){
        for(let i = 0; i < 3; i++){
            this.portas[i].draw(this.ctx)
        }
        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.txt, 250, 20);
    }
   

    deactivate(){ //returns difference between wins and losses after closing the game
        this.ctx.canvas.removeEventListener("click", this.clickHandler0);
        this.ctx.canvas.removeEventListener("click", this.clickHandler1);
        this.replay_button.onclick = null;
        this.exit_button.onclick = null;
        return this.numWin - this.numLoss;
    }

    reset(){
        this.numWin = 0;
        this.numLoss = 0;
        this.txt = INITIAL_MESSAGE_MONTY;
        for(let i = 0; i < this.portas.length; i++){
            this.portas[i].reset();
        }
        this.ctx.canvas.addEventListener("click", this.clickHandler0);
        this.ctx.canvas.removeEventListener("click", this.clickHandler1);
    }
}
