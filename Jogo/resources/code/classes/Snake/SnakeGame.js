"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
    var snake = new Snake;
    var food = new Food


    //TODO:
    //Audio 

    //let audio = New Audio()
    //audio.srec="..."

    //bla bla bla

    //colors
    const snakeColor = "#444554";
    const FruitColor = "#F29559";
    const BackgroundColor = "#C9C5BA";
    const WallColor = "#5A7D7C";
    const ScoreColor = "#172121";


    //Key down
    var kdh = function (ev) {
        keyDownHandler(ev, spArray);
    };

    draw()


    function draw(){
        ctx.fillStyle = BackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

//teclas
function keyDownHandler(ev, snake) {
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


