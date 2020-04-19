"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var cell=20; 

    //TODO:
    //Audio 

    //let audio = New Audio()
    //audio.srec="..."

    //bla bla bla

    //colors
    const wallColor = "#444554";
    const fruitColor = "#F29559";
    const backgroundColor = "#C9C5BA";
    const snakeColor = "#5A7D7C";
    const scoreColor = "#172121";

    ctx.strokeStyle= backgroundColor;

    var snake = new Snake(snakeColor,cell);
    //var food = new Food()

    //Key down
    var kdh = function (ev) {
        keyDownHandler(ev, snake);
    };


    //listener
    window.addEventListener("keydown", kdh);

    

    draw();

    var fruitPos = newFruit(ctx,cell, fruitColor, snake);

    var interval = setInterval(render,100);


    function render(){

        if(snake.update(ctx,fruitPos,backgroundColor, interval)){
            fruitPos = newFruit(ctx,cell, fruitColor, snake);
        }
    }

    function draw(){
        //Background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Wall
        ctx.fillStyle = wallColor;

        //left
        ctx.fillRect(0, 0, cell, canvas.height);
        ctx.strokeRect(0, 0, cell, canvas.height);
        
        //right
        ctx.fillRect(canvas.width-cell, 0, cell, canvas.height);
        ctx.strokeRect(canvas.width-cell, 0, cell, canvas.height);

        //bot
        ctx.fillRect(0, canvas.height-cell, canvas.width, cell);
        ctx.strokeRect(0, canvas.height-cell, canvas.width, cell);

        //top
        ctx.fillRect(0, 0, canvas.width, cell);
        ctx.strokeRect(0, 0, canvas.width, cell);

    }
    
}


function newFruit(ctx, cell, fruitColor,snake){

    do{
        var x = (Math.floor(Math.random()*((600/20)-3)+1))*cell;
        var y = (Math.floor(Math.random()*((600/20)-3))+1)*cell;
    }while(snake.insideSnake(x,y)); //if inside snake will find other spot

    //Draw Fruit 
    ctx.fillStyle = fruitColor;
    ctx.fillRect(x, y, cell, cell);
    
    return [x,y]
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


