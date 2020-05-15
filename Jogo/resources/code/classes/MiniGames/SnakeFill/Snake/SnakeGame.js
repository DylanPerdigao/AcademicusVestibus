"use strict";


class SnakeGame{
    constructor(level, colors, cell, ctx,walls, mainWindow){
        this.wallColor=colors[0];
        this.fruitColor=colors[1];
        this.backgroundColor=colors[2];
        this.snakeColor=colors[3];
        this.score= document.getElementById("score");
        this.ctx=ctx;
        this.cell=cell;
        this.level=level;
        this.mainWindow=mainWindow;
        this.snake=new Snake(this.snakeColor,this.cell);


        this.interval=null;
        this.walls=walls;
        this.fruitPos=null;
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
                    if (me.snake.xspeed==0){   //if not in the same direction or oposit
                        me.snake.changeDir(-1,0);
                    }
                    break;
                case "KeyD":
                case "ArrowRight":
                    if (me.snake.xspeed==0){
                        me.snake.changeDir(1,0);
                    }
                    break;
                case "KeyW":
                case "ArrowUp":
                    if (me.snake.yspeed==0){
                        me.snake.changeDir(0,-1);
                    }
                    break;
                case "KeyS":
                case "ArrowDown":
                    if (me.snake.yspeed==0){
                        me.snake.changeDir(0,1);
                    }
                    break;
            }
        }

        this.render = function(){
            var val = me.snake.update(me.ctx,me.fruitPos,me.backgroundColor, me.walls);
            
            if (val == 'o'){
                window.removeEventListener("keydown", keyDownHandler);
                me.gameOver();
            }
            
            else if(val){
                me.score.textContent++;
                me.fruitPos = me.newFruit();
            }
        }

        
        this.fruitPos=this.newFruit();
        this.interval=setInterval(this.render,100);
        window.addEventListener("keydown", keyDownHandler);

    }




    newFruit(){
        do{
            var x = (Math.floor(Math.random()*29)+1)*this.cell;
            var y = (Math.floor(Math.random()*29)+1)*this.cell;
        }while(this.snake.insideSnake(x,y) || this.insideWalls(x,y) ); //if inside snake will find other spot

        //Draw Fruit 
        this.ctx.fillStyle = this.fruitColor;
        this.ctx.fillRect(x, y, this.cell, this.cell);
        
        return [x,y];
    }

    insideWalls(x,y){
        for (let i = 0; i<this.walls.length;i++){
            if (this.walls[i].insideWall(x,y)){
                return true;
            }
        }
        return false;
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


