"use strict";
(function(){window.addEventListener("load", main);}());
const speed = 5;
const path = "resources/textures/";
const hitboxTree = 6;
const hitboxTrash = 6;
const hitboxBenchDown = 8;
const hitboxBenchLeft = 35;
var x=0,y=0;
//FUNCTIONS
function main()
{   
    //CANVAS
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 250;
    //PLAYER
    var player = new Player(path+"player/male/player_male","Dylan",canvas.width/2,canvas.height/2,0,7);
    //MAP
    var map = new Element(path+"map/praca.png",player.posX,player.posY,speed);
    var structures = new Array(
        //LIXO FORA DA PRACA
        new Structure(path+'structures/trash.png',map.posX-(0),map.posY-(-155),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-145),map.posY-(-155),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-335),map.posY-(-155),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-440),map.posY-(-155),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-710),map.posY-(-155),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-800),map.posY-(-155),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-900),map.posY-(-155),speed,hitboxTrash),
        //ARVORES
        new Structure(path+'structures/tree.png',map.posX-(0),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-125),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-250),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-375),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-500),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-625),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-255),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-375),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-485),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-625),map.posY-(-485),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-500),map.posY-(-485),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-375),map.posY-(-485),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-250),map.posY-(-485),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-125),map.posY-(-485),speed,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(0),map.posY-(-485),speed,hitboxTree),
        //BANCOS
        new Structure(path+'structures/bench_down.png',map.posX-(-45),map.posY-(-265),speed,hitboxBenchDown), 
        new Structure(path+'structures/bench_down.png',map.posX-(-175),map.posY-(-265),speed,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-305),map.posY-(-265),speed,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-420),map.posY-(-265),speed,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-555),map.posY-(-265),speed,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-685),map.posY-(-265),speed,hitboxBenchDown),
        new Structure(path+'structures/bench_left.png',map.posX-(-750),map.posY-(-300),speed,hitboxBenchLeft),
        new Structure(path+'structures/bench_left.png',map.posX-(-750),map.posY-(-420),speed,hitboxBenchLeft),
        //LIXO NO MEIO DA PRACA
        new Structure(path+'structures/trash.png',map.posX-(-80),map.posY-(-270),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-455),map.posY-(-270),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-670),map.posY-(-270),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-750),map.posY-(-345),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-750),map.posY-(-470),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-645),map.posY-(-500),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-520),map.posY-(-500),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-265),map.posY-(-500),speed,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-15),map.posY-(-500),speed,hitboxTrash),
        //PARAGEM DE AUTOCARRO
        new Structure(path+'structures/busStop.png',map.posX-(-550),map.posY-(-160),speed,10)
    );
    //LISTENERS
    var kHandler = function(event){
        keyHandler(event,canvas,ctx,player,map,structures);
    }
    window.addEventListener("keydown",kHandler);
    //INIT
    map.slide(ctx,"up");
    player.walk(ctx,"up");
    map.slide(ctx,"down");
    player.walk(ctx,"down");
}
 
function keyHandler(event,canvas,ctx,player,map,structs){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = map.posX-player.posX;
    y = map.posY-player.posY;
    document.getElementById("debug").style.color="red"
    document.getElementById("debug").innerHTML="X:"+ x+"\nY:"+y+"\nX:"
    switch(event.code){//ISTO TEM DE SER MUDADO, CASO O TECLADO SEJA DIFERENTE (AZERTY,QWERTZ), AS TECLAS NAO FAZEM SENTIDO
        case "KeyW":
            updatePosition(ctx,player,map,structs,"up");
            break;
        case "KeyA":
            updatePosition(ctx,player,map,structs,"left");
            break;
        case "KeyS":
            updatePosition(ctx,player,map,structs,"down");
            break;
        case "KeyD":
            updatePosition(ctx,player,map,structs,"right");
            break;
        case "Digit1":
            structs.push(new Structure(path+'structures/tree.png',map.posX-x,map.posY-y,10,10))
            console.log("new Structure(path+'structures/tree.png',map.posX-("+ x +"),map.posY-("+ y +"),10,10),\n")
            break;
        case "Digit2":
            structs.push(new Structure(path+'structures/trash.png',map.posX-x,map.posY-y,10,10))
            console.log("new Structure(path+'structures/trash.png',map.posX-("+ x +"),map.posY-("+ y +"),10,10),\n")
            break;
        case "Digit3":
            structs.push(new Structure(path+'structures/bench_down.png',map.posX-x,map.posY-y,10,10))
            console.log("new Structure(path+'structures/bench_down.png',map.posX-("+ x +"),map.posY-("+ y +"),10,10),\n")
            break;     
        case "Digit4":
            structs.push(new Structure(path+'structures/bench_left.png',map.posX-x,map.posY-y,10,10))
            console.log("new Structure(path+'structures/bench_left.png',map.posX-("+ x +"),map.posY-("+ y +"),10,10),\n")
            break;  
        case "Digit5":
            structs.push(new Structure(path+'structures/bench_right.png',map.posX-x,map.posY-y,10,10))
            console.log("new Structure(path+'structures/bench_right.png',map.posX-("+ x +"),map.posY-("+ y +"),10,10),\n")
            break;
        case "Digit6":
            structs.push(new Structure(path+'structures/busStop.png',map.posX-x,map.posY-y,10,10))
            console.log("new Structure(path+'structures/busStop.png',map.posX-("+ x +"),map.posY-("+ y +"),10,10),\n")
            break;  
         
    }
    for(let i=0;i<structs.length;i++){
        structs[i].drawHitbox(ctx);
    }
    player.drawHitbox(ctx)
}

function updatePosition(ctx,player,map,structs,direction){
    map.slide(ctx,direction);
    player.walk(ctx,direction);
    for(let i=0;i<structs.length;i++){
        if(structs[i].isBehind(player)){
            structs[i].slide(ctx,direction);
            player.draw(ctx,direction);
        }else{
            player.draw(ctx,direction);
            structs[i].slide(ctx,direction);
        }
    }
    for(let i=0;i<structs.length;i++){
        var returnDirection;
        var hasCollision = structs[i].checkIntersection(player);
        if(hasCollision){
            switch(direction){
                case "up":
                    returnDirection="down";
                    break;
                case "left":
                    returnDirection="right";
                    break;
                case "down":
                    returnDirection="up";
                    break;
                case "right":
                    returnDirection="left";
                    break;
            }
            map.slide(ctx,returnDirection);
            for(let j=0;j<structs.length;j++){
                structs[j].slide(ctx,returnDirection);
            }
            player.draw(ctx,direction);
        }
    }
}