"use strict";


class ExitMinigame {
    constructor(mainWindow, canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.mainWindow = mainWindow;
        this.ch = canvas.height;
        this.cw = canvas.width;
        this.size = Math.floor(Math.min(this.ch,this.cw)/30) * 4;

    }

    gameOver(){

        //GAME OVER
        this.ctx.font = 'bold '+(this.size)+'px Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'blue';
        this.ctx.fillText('Game Over!',this.cw/2,this.ch/2);
        //Press
        this.ctx.font = (this.size/4)+'px Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Pressione "Enter" para voltar',this.cw/2,(this.ch+this.size)/2);
        
        var me =this;
        function gameOverHandler(ev){
            if (ev.code == "Enter"){
                window.removeEventListener("keydown", gameOverHandler);
                me.mainWindow.postMessage("arcade",'*');   //voltar ao menu arcade
            }
        }
       
       window.addEventListener("keydown", gameOverHandler);
       //Mostrar mensagem e só depois voltar

    }
}



