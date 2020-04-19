"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var score= document.getElementById("score");

    var ch = canvas.height;
    var cw = canvas.width;

    var cell=Math.floor(ch/30); //canvas needs to be a square


    //TODO:
    //Audio 

    //let audio = New Audio()
    //audio.src="..."

    //bla bla bla

    //colors
    const wallColor = "#444554";
    const fruitColor = "#F29559";
    const backgroundColor = "#C9C5BA";
    const snakeColor = "#5A7D7C";

    ctx.strokeStyle= backgroundColor;

    var snake = new Snake(snakeColor,cell);
    //var food = new Food()

    //Key down
    var kdh = function (ev) {
        keyDownHandler(ev, snake);
    };


    //listener
    window.addEventListener("keydown", kdh);

    
    var walls=drawLevel(0);

    var fruitPos = newFruit();

    var interval = setInterval(render,100);


    function render(){

        if(snake.update(ctx,fruitPos,backgroundColor, interval, cw, ch, walls)){
            score.textContent++;
            fruitPos = newFruit();
        }
    }

    function drawLevel(level){
        //Background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, cw, ch);
        var wall;
        var walls=[];
        switch(level){
            case 0:

                //left
                wall = new Wall(0,0,cell,30*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //right
                wall = new Wall(30*cell,0,cell,31*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //bot
                wall = new Wall(0,30*cell,30*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //top
                wall = new Wall(0,0,30*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

        }
        return walls;

    }


    function newFruit(){
        do{
            var x = (Math.floor(Math.random()*((cw/cell)-3)+1))*cell;
            var y = (Math.floor(Math.random()*((ch/cell)-3))+1)*cell;
        }while(snake.insideSnake(x,y)); //if inside snake will find other spot

        //Draw Fruit 
        ctx.fillStyle = fruitColor;
        ctx.fillRect(x, y, cell, cell);
        
        return [x,y];
    }
    
}

function insideWalls(x,y,walls){
    for (let i = 0; i<walls.length;i++){
        if (walls[i].insideWall(x,y)){
            return true;
        }
    }
    return false;
}


//teclas
function keyDownHandler(ev, snake) {
    switch (ev.code) {
        case "ArrowLeft":
            if (snake.xspeed==0){   //if not in the same direction or oposit
                snake.changeDir(-1,0);
            }
            break;
        case "ArrowRight":
            if (snake.xspeed==0){
                snake.changeDir(1,0);
            }
            break;
        case "ArrowUp":
            if (snake.yspeed==0){
                snake.changeDir(0,-1);
            }
            break;
        case "ArrowDown":
            if (snake.yspeed==0){
                snake.changeDir(0,1);
            }
            break;
    }
}


