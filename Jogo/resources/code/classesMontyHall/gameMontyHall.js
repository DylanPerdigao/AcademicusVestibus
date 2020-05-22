"use strict";

const INITIAL_MESSAGE_MONTY = "Escolha uma porta!";
const WIN_MESSAGE = "Ganhou!";
const LOSE_MESSAGE = "Perdeu!";

class GameMontyHall {
    constructor(ctx, canvas, mainWindow, arcade) {
        this.ctx = ctx;
		var path = "../../textures/";
        this.imgPortaAberta = new Image();
        this.imgPortaAberta.addEventListener("load", imgLoadedHandler);
        this.imgPortaAberta.src = path+"misc/porta_aberta.png";
    
        this.imgPortaFechada = new Image();
        this.imgPortaFechada.addEventListener("load", imgLoadedHandler);
        this.imgPortaFechada.src = path+"misc/porta_fechada.png";
    
        this.imgMoney = new Image();
        this.imgMoney.addEventListener("load", imgLoadedHandler);
        this.imgMoney.src = path+"misc/money.png";

        this.imgLoaded = 0;
        var me = this;
        function imgLoadedHandler(ev) {
            me.imgLoaded++;
            if (me.imgLoaded == 3) {
                me.init();
            }
        }

        //game over
        this.go = new ExitMinigame(mainWindow, arcade, canvas, this.ctx);


    }

    init() {
        this.portas = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.portas[i] = new Door(i * 200, 50, 200, 350, this.imgPortaAberta, this.imgPortaFechada, this.imgMoney);
        }

        //Decide aleatoriamente em que porta esta o dinheiro
        var doorWinner = Math.floor(Math.random()*3);
        this.portas[doorWinner].isWinner = true;


        this.txt = INITIAL_MESSAGE_MONTY;

        let me = this;
        
        

        this.clickHandler1 = function (ev) {
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
                me.portas[i].open(me.ctx);
            }
            if (escolhida === premiada) {
                //WIN
                me.txt = WIN_MESSAGE;
                me.gameOver(5);
            }else{
                //LOSE
                me.txt = LOSE_MESSAGE;
                me.gameOver(0);
            }
        };

        this.clickHandler0 = function (ev) {
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
            me.portas[abrir].open(me.ctx);
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
   

    gameOver(coins){ //returns difference between wins and losses after closing the game
        this.ctx.canvas.removeEventListener("click", this.clickHandler0);
        this.ctx.canvas.removeEventListener("click", this.clickHandler1);
    
        //GAME OVER
        this.go.gameOver(coins);
    
    }

}
