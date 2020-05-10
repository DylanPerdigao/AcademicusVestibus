"use strict";


class FillGame{
    constructor(level, colors, cell, ctx,walls, mainWindow){
        this.wallColor=colors[0];
        this.backgroundColor=colors[2];
        this.fillColor=colors[1];
        this.score= document.getElementById("score");
        this.ctx=ctx;
        this.cell=cell;
        this.level=level;
        this.mainWindow=mainWindow;
        this.fill=new Fill(this.fillColor,this.cell);


        this.interval=null;
        this.walls=walls;
        this.render=null;

        this.init();
    }

    //TODO:
    //Audio 

    //let audio = New Audio()
    //audio.src="..."

    //bla bla bla

    init(){
        var me=this; //me = class
       

        //teclas
        function keyDownHandler(ev) {
            switch (ev.code) {
                case "KeyA":
                case "ArrowLeft":
                    if (me.fill.xspeed==0){   //if not in the same direction or oposit
                        me.fill.changeDir(-1,0);
                    }
                    break;
                case "KeyD":
                case "ArrowRight":
                    if (me.fill.xspeed==0){
                        me.fill.changeDir(1,0);
                    }
                    break;
                case "KeyW":
                case "ArrowUp":
                    if (me.fill.yspeed==0){
                        me.fill.changeDir(0,-1);
                    }
                    break;
                case "KeyS":
                case "ArrowDown":
                    if (me.fill.yspeed==0){
                        me.fill.changeDir(0,1);
                    }
                    break;
            }
        }

        this.render = function(){
            
            if (me.fill.update(me.ctx, me.walls)){
                window.removeEventListener("keydown", keyDownHandler);
                me.gameOver();
            }
            
            else {
                me.score.textContent++;
            }
        }

        
        this.interval=setInterval(this.render,100);
        window.addEventListener("keydown", keyDownHandler);

    }
    
    gameOver(){
        //TODO
        window.clearInterval(this.interval);
        //GAME OVER
        this.ctx.font = (this.cell*4)+'px Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'blue';
        this.ctx.fillText('Game Over!',15*this.cell,15*this.cell);
        //Press
        this.ctx.font = (this.cell)+'px Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Pressione qualquer tecla para voltar',15*this.cell,17*this.cell);
        
        var me=this; //me = class
        var gameOverHandler = function(){
            window.removeEventListener("keydown", gameOverHandler);
            me.mainWindow.postMessage("arcade",'*');   //voltar ao menu arcade
        }
        
        window.addEventListener("keydown", gameOverHandler);
        //Mostrar mensagem e só depois voltar

    }
}


