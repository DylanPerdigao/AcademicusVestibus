"use strict";
(function(){window.addEventListener("load", main);}());
const speed = 15;
const path = "resources/textures/";
const hitboxTree = 6;
const hitboxTrash = 6;
const hitboxBusStop = 10;
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
        new Structure(path+'structures/trash.png',map.posX-(0),map.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-145),map.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-335),map.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-440),map.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-710),map.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-800),map.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-900),map.posY-(-155),speed,null,hitboxTrash),
        //ARVORES
        new Structure(path+'structures/tree.png',map.posX-(0),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-125),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-250),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-375),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-500),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-625),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-375),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-625),map.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-500),map.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-375),map.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-250),map.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(-125),map.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',map.posX-(0),map.posY-(-485),speed,null,hitboxTree),
        //BANCOS
        new Structure(path+'structures/bench_down.png',map.posX-(-45),map.posY-(-265),speed,null,hitboxBenchDown), 
        new Structure(path+'structures/bench_down.png',map.posX-(-175),map.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-305),map.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-420),map.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-555),map.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',map.posX-(-685),map.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_left.png',map.posX-(-750),map.posY-(-300),speed,null,hitboxBenchLeft),
        new Structure(path+'structures/bench_left.png',map.posX-(-750),map.posY-(-420),speed,null,hitboxBenchLeft),
        //LIXO NO MEIO DA PRACA
        new Structure(path+'structures/trash.png',map.posX-(-80),map.posY-(-270),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-455),map.posY-(-270),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-670),map.posY-(-270),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-750),map.posY-(-345),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-750),map.posY-(-470),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-645),map.posY-(-500),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-520),map.posY-(-500),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-265),map.posY-(-500),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',map.posX-(-15),map.posY-(-500),speed,null,hitboxTrash),
        //PARAGEM DE AUTOCARRO
		new Structure(path+'structures/busStop.png',map.posX-(-550),map.posY-(-160),speed,null,hitboxBusStop),
		//WALL
		new Structure(null,map.posX-(0),map.posY-(0),speed,1020,160),
		new Structure(null,map.posX-(0),map.posY-(-205),speed,505,50),
		new Structure(null,map.posX-(0),map.posY-(-525),speed,815,50),
		new Structure(null,map.posX-(-447),map.posY-(-160),speed,50,47),
		new Structure(null,map.posX-(-530),map.posY-(-205),speed,505,50),
		new Structure(null,map.posX-(-770),map.posY-(-205),speed,50,350)
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
    //player.drawHitbox(ctx)
}
/**
 * Invert the direction specified
 * @param {string} direction 
 * @returns {string} oposite direction of the specified string
 */
function invertDirection(direction){
    var returnDirection;
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
    return returnDirection;
}
/**
 * Make a simulation of advance one step in the specified direction
 * @param {*} player users player
 * @param {Array<*>} structs structures in the map
 * @param {string} direction direction of the player step
 * @returns {boolean} if the player has a collision with one of the structures
 */
function collisionSimulation(player,structs,direction){
    var hasCollision;
    var structIndex;
    var returnDirection;
    //simula a avancar na direcao desejada
    for(structIndex=0;structIndex<structs.length;structIndex++){
        structs[structIndex].move(direction);
        hasCollision=structs[structIndex].checkIntersection(player);
        if(hasCollision){
            structIndex++;//com o break o ciclo nao tem tempo de incrementar
            break;
        }
    }
    //recua os elementos que avancaram
    for(let i=0;i<structIndex;i++){
        returnDirection = invertDirection(direction);
        structs[i].move(returnDirection);
    }
    return hasCollision;
}
/**
 * Updates the position of the elements verifying collisions with player, and if a structure is drawed before/after the player
 * @param {*} ctx canvas context
 * @param {*} player users player
 * @param {*} map map displayed
 * @param {Array<Structure>} structs structures in the map
 * @param {string} direction direction of the player step
 */
function updatePosition(ctx,player,map,structs,direction){
    if(collisionSimulation(player,structs,direction)==false){
        for(let i=0;i<structs.length;i++){
            structs[i].move(direction);
        }
        map.slide(ctx,direction);
        for(let i=0;i<structs.length;i++){
            if(structs[i].isBehind(player)){
                structs[i].draw(ctx,structs[i].posX,structs[i].posY);
            }
        }
        player.walk(ctx,direction);
        for(let i=0;i<structs.length;i++){
            if(!structs[i].isBehind(player)){
                structs[i].draw(ctx,structs[i].posX,structs[i].posY);
            }
        }
    }else{
        map.draw(ctx,map.posX,map.posY);
        for(let i=0;i<structs.length;i++){
            if(structs[i].isBehind(player)){
                structs[i].draw(ctx,structs[i].posX,structs[i].posY);
            }
        }
        player.walk(ctx,direction);
        for(let i=0;i<structs.length;i++){
            if(!structs[i].isBehind(player)){
                structs[i].draw(ctx,structs[i].posX,structs[i].posY);
            }
        }
    }
}