"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var cell=30; 

    //TODO:
    //Audio 

    //let audio = New Audio()
    //audio.srec="..."

    //bla bla bla

    //colors
    const snakeColor = "#444554";
    const FruitColor = "#F29559";
    const backgroundColor = "#C9C5BA";
    const wallColor = "#5A7D7C";
    const scoreColor = "#172121";

    
    var snake = new Snake(snakeColor);
    //var food = new Food()


    //listener
    window.addEventListener("keydown", kdh);

    //Key down
    var kdh = function (ev) {
        console.log('zau');
        keyDownHandler(ev, snake);
    };


    draw();

    var interval = setInterval(render,100);


    function render(){
        snake.update();
        snake.draw(ctx);
    }

    function draw(){
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


//teclas
function keyDownHandler(ev, snake) {
    console.log(ev.code);
    switch (ev.code) {
        case "ArrowLeft":
            snake.changeDir(-1,0);
            break;
        case "ArrowRight":
            snake.changeDir(1,0);
            break;
        case "ArrowUp":
            snake.changeDir(0,1);
            break;
        case "ArrowDown":
            snake.changeDir(0,-1);
            break;
    }
}


