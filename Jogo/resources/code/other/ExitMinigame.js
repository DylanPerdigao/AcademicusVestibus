"use strict";


class ExitMinigame {
    constructor(mainWindow, arcade, canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.mainWindow = mainWindow;
        this.arcade=arcade;
        this.ch = canvas.height;
        this.cw = canvas.width;
        this.size = Math.floor(Math.min(this.ch,this.cw)/30) * 4;

    }

    gameOver(coins){
		var lang = JSON.parse(window.localStorage.getItem("lang"));
        //GAME OVER
        this.ctx.font = 'bold '+(this.size)+'px Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'blue';
        this.ctx.fillText(lang.minigame.gameOver[0],this.cw/2,this.ch/2);

        if (!this.arcade){
            //Coins earned
            this.ctx.font = (this.size/3)+'px Calibri';
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(lang.minigame.gameOver[1]+coins+lang.minigame.gameOver[2],this.cw/2,(this.ch+(this.size/2))/2);
        }

        //Press
        this.ctx.font = (this.size/4)+'px Calibri';
        this.ctx.fillText(lang.minigame.gameOver[3],this.cw/2,(this.ch+this.size)/2);
        
        var me =this;
        function gameOverHandler(ev){
            if (ev.code == "Enter"){
                window.removeEventListener("keydown", gameOverHandler);
                me.ctx.clearRect(0,0,me.cw,me.ch);
                if (me.arcade){
                    me.mainWindow.postMessage("arcade",'*');   //voltar ao menu arcade
                }else{
                    me.mainWindow.postMessage(String(coins),'*');   //voltar ao menu arcade
                }
            }
        }
       
       window.addEventListener("keydown", gameOverHandler);
       //Mostrar mensagem e só depois voltar

    }
}



