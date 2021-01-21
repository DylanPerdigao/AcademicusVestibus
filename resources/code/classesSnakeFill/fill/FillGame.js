"use strict";


class FillGame{
    constructor(level, colors, cell, ctx, canvas, walls, mainWindow, arcade){
        this.wallColor=colors[0];
        this.backgroundColor=colors[2];
        this.fillColor=colors[1];
        this.score= document.getElementById("score");
        this.ctx=ctx;
        this.cell=cell;
        this.level=level;
        this.fill=new Fill(this.fillColor,this.cell);

        //game over
        this.go = new ExitMinigame(mainWindow, arcade, canvas, this.ctx);

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
        this.go.gameOver(Math.round((this.score.textContent*(this.level+1))/40));

    }
}