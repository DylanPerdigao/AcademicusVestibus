"use strict";


class SnakeGame{
    constructor(level, colors, cell, ctx, mainWindow){
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
        this.walls=[];
        this.fruitPos=null;
        this.render=null;

        this.init();
        console.log(this);
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
            console.log(me);
            if(me.snake.update(me.ctx,me.fruitPos,me.backgroundColor, me.interval, me.walls, me.mainWindow)){
                me.score.textContent++;
                me.fruitPos = me.newFruit();
            }
        }

        this.drawLevel();
        window.addEventListener("keydown", keyDownHandler);

    }


    drawLevel(){
        //Background
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.strokeStyle= this.backgroundColor;
        this.ctx.fillRect(0, 0, 30*this.cell, 30*this.cell);
        var wall;
        switch(this.level){
            case 4:
                //extras

            case 3:
                //resto 

                //top
                wall = new Wall(5*this.cell,4*this.cell,20*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                wall = new Wall(11*this.cell,10*this.cell,8*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                //bot
                wall = new Wall(11*this.cell,19*this.cell,8*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                wall = new Wall(5*this.cell,25*this.cell,20*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);

            case 2:
                //sides

                //left
                wall = new Wall(3*this.cell,8*this.cell,this.cell,3*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                wall = new Wall(4*this.cell,11*this.cell,this.cell,8*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                wall = new Wall(3*this.cell,19*this.cell,this.cell,3*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);

                //right
                wall = new Wall(26*this.cell,8*this.cell,this.cell,3*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                wall = new Wall(25*this.cell,11*this.cell,this.cell,8*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                wall = new Wall(26*this.cell,19*this.cell,this.cell,3*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);

            case 1:
                //mid top bot
                //top
                wall = new Wall(8*this.cell,7*this.cell,14*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                //bot
                wall = new Wall(8*this.cell,22*this.cell,14*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                

            case 0:
                //caixa
                //left
                wall = new Wall(0,0,this.cell,30*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                //right
                wall = new Wall(29*this.cell,0,this.cell,30*this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);

                //bot
                wall = new Wall(0,29*this.cell,30*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);

                //top
                wall = new Wall(0,0,30*this.cell,this.cell,this.wallColor);
                wall.draw(this.ctx);
                this.walls.push(wall);
                
                break;

        }
        this.fruitPos=this.newFruit();
        this.interval=setInterval(this.render,100);

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
    
}


