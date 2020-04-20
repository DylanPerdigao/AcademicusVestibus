"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var score= document.getElementById("score");

    var mainWindow;

    //Key down
    var kdh = function (ev) {
        keyDownHandler(ev, snake);
    };

    var msgHandler = function(ev){
        mainWindow=messageHandler(ev);
    }

    //listener
    window.addEventListener("keydown", kdh);
    window.addEventListener("message",msgHandler);

    var cell=Math.floor(Math.min(canvas.height,canvas.width)/30);


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



    
    var walls=drawLevel(4);

    var fruitPos = newFruit();

    var interval = setInterval(render,100);


    function render(){

        if(snake.update(ctx,fruitPos,backgroundColor, interval, walls, mainWindow)){
            score.textContent++;
            fruitPos = newFruit();
        }
    }

    function drawLevel(level){
        //Background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 30*cell, 30*cell);
        var wall;
        var walls=[];
        switch(level){
            case 4:
                //extras

            case 3:
                //resto 

                //top
                wall = new Wall(5*cell,4*cell,20*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(11*cell,10*cell,8*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //bot
                wall = new Wall(11*cell,19*cell,8*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(5*cell,25*cell,20*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

            case 2:
                //sides

                //left
                wall = new Wall(3*cell,8*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(4*cell,11*cell,cell,8*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(3*cell,19*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //right
                wall = new Wall(26*cell,8*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(25*cell,11*cell,cell,8*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(26*cell,19*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

            case 1:
                //mid top bot
                //top
                wall = new Wall(8*cell,7*cell,14*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //bot
                wall = new Wall(8*cell,22*cell,14*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                

            case 0:
                //caixa

                //left
                wall = new Wall(0,0,cell,30*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //right
                wall = new Wall(29*cell,0,cell,30*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //bot
                wall = new Wall(0,29*cell,30*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //top
                wall = new Wall(0,0,30*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                break;

        }
        return walls;

    }


    function newFruit(){
        do{
            var x = (Math.floor(Math.random()*(28)+1))*cell;
            var y = (Math.floor(Math.random()*(28))+1)*cell;
        }while(snake.insideSnake(x,y) || insideWalls(x,y,walls) ); //if inside snake will find other spot

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

function messageHandler(ev){
    return ev.source;
}


//teclas
function keyDownHandler(ev, snake) {
    switch (ev.code) {
        case "KeyA":
        case "ArrowLeft":
            if (snake.xspeed==0){   //if not in the same direction or oposit
                snake.changeDir(-1,0);
            }
            break;
        case "KeyD":
        case "ArrowRight":
            if (snake.xspeed==0){
                snake.changeDir(1,0);
            }
            break;
        case "KeyW":
        case "ArrowUp":
            if (snake.yspeed==0){
                snake.changeDir(0,-1);
            }
            break;
        case "KeyS":
        case "ArrowDown":
            if (snake.yspeed==0){
                snake.changeDir(0,1);
            }
            break;
    }
}


