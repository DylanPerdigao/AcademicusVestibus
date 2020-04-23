"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var score= document.getElementById("score");

    var mainWindow;
    var cell=Math.floor(Math.min(canvas.height,canvas.width)/30);

    ctx.strokeStyle= "Black";    

    //colors
    var wallColor;
    var fruitColor;
    var backgroundColor;
    var snakeColor;

    var level;
    var walls = [];
    var fruitPos;
    var interval;
    var snake;


    drawLevelsMenu();

    //Key down
    var kdh = function (ev) {
        keyDownHandler(ev, snake);
    };

    var msgHandler = function(ev){
        mainWindow=messageHandler(ev);
    }

    var MouseUpLevelHandler = function (ev){
        //var bound = canvas.getBoundingClientRect();
        var x = ev.offsetX; 
        var y = ev.offsetY;
        console.log(x,y);

        if (4*cell<=x && x<13*cell){
            if(4*cell<=y && y<7*cell){
                level=0;
            }
            else if(11*cell<=y && y<14*cell){
                level=1;
            }
            else if(18*cell<=y && y<21*cell){
                level=2;
            }
            else if(25*cell<=y && y<28*cell){
                level=3;
            }
            else{
                return;
            }
            
            ctx.canvas.removeEventListener("mouseup", MouseUpLevelHandler);
            ctx.canvas.addEventListener("mouseup", MouseUpColorHandler);
            drawColorsMenu();
        }
    }

    var MouseUpColorHandler = function(ev){
        //var bound = canvas.getBoundingClientRect();
        var x = ev.offsetX; 
        var y = ev.offsetY;
        if (4*cell<=x && x<13*cell){
            if(4*cell<=y && y<7*cell){
                ctx.canvas.removeEventListener("mouseup", MouseUpColorHandler);
                wallColor = "#444554";
                fruitColor = "#F29559";
                backgroundColor = "#C9C5BA";
                snakeColor = "#5A7D7C";
                drawLevel(level);
            }
            else if(11*cell<=y && y<14*cell){
                ctx.canvas.removeEventListener("mouseup", MouseUpColorHandler);
                wallColor = "#260016";
                fruitColor = "#ed008c";
                backgroundColor = "#daf3ec";
                snakeColor = "#00bff3";
                drawLevel(level);
            }
            else if(18*cell<=y && y<21*cell){
                ctx.canvas.removeEventListener("mouseup", MouseUpColorHandler);
                wallColor = "#012824";
                fruitColor = "#ed008c";
                backgroundColor = "#fcdeea";
                snakeColor = "#ff4d6d";
                drawLevel(level);
            }
            else if(25*cell<=y && y<28*cell){
                ctx.canvas.removeEventListener("mouseup", MouseUpColorHandler);
                wallColor = "#08242b";
                fruitColor = "#fda000";
                backgroundColor = "#ffffff";
                snakeColor = "#1d7c95";
                drawLevel(level);
            }
        }
    }

    //listener
    
    canvas.addEventListener("mouseup", MouseUpLevelHandler);
    window.addEventListener("message",msgHandler);



    //TODO:
    //Audio 

    //let audio = New Audio()
    //audio.src="..."

    //bla bla bla


    function render(){

        if(snake.update(ctx,fruitPos,backgroundColor, interval, walls, mainWindow)){
            score.textContent++;
            fruitPos = newFruit();
        }
    }

    function drawLevelsMenu(){
        //Background
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        //ctx.font = "30px Arial";

        //Level 0
        var level = new Image();
        level.src="Level0.png";
        console.log(level);
        console.log(ctx);
        ctx.drawImage(level,0,0);
        //ctx.drawImage(level,3*cell,3*cell,10*cell,10*cell);
        //ctx.fillText("Level 0",6*cell,6*cell);
        //ctx.strokeRect(4*cell, 4* cell, 9*cell, 3*cell);

        /*
        //Level 1
        ctx.fillText("Level 1",6*cell,13*cell);
        ctx.strokeRect(4*cell, 11* cell, 9*cell, 3*cell);

        //Level 2
        ctx.fillText("Level 2",6*cell,20*cell);
        ctx.strokeRect(4*cell, 18* cell, 9*cell, 3*cell);

        //Level 3
        ctx.fillText("Level 3",6*cell,27*cell);
        ctx.strokeRect(4*cell, 25* cell, 9*cell, 3*cell);
        */

    }

    function drawColorsMenu(){
        //Background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = "30px Arial";

        //Level 0
        ctx.fillText("A",6*cell,6*cell);
        ctx.strokeRect(4*cell, 4* cell, 9*cell, 3*cell);

        //Level 1
        ctx.fillText("B",6*cell,13*cell);
        ctx.strokeRect(4*cell, 11* cell, 9*cell, 3*cell);

        //Level 2
        ctx.fillText("C",6*cell,20*cell);
        ctx.strokeRect(4*cell, 18* cell, 9*cell, 3*cell);

        //Level 3
        ctx.fillText("D",6*cell,27*cell);
        ctx.strokeRect(4*cell, 25* cell, 9*cell, 3*cell);

    }

    function drawLevel(level){
        //Background
        ctx.fillStyle = backgroundColor;
        ctx.strokeStyle= backgroundColor;
        ctx.fillRect(0, 0, 30*cell, 30*cell);
        var wall;
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
        snake = new Snake(snakeColor,cell);
        fruitPos=newFruit()
        window.addEventListener("keydown", kdh);
        interval=setInterval(render,100);

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


