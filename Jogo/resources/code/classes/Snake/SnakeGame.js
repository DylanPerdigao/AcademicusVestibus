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

    var fruitPos = newFruit(ctx,cell, fruitColor);

    var interval = setInterval(render,100);


    function render(){

        if(snake.update(ctx,fruitPos,backgroundColor)){
            fruitPos = newFruit(ctx,cell, fruitColor);
        }
    }

    function draw(){
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


function newFruit(ctx, cell, fruitColor){
    var x = Math.floor(Math.random()*(600/20)+1)*cell;
    var y = Math.floor(Math.random()*(600/20)+1)*cell;
    
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


