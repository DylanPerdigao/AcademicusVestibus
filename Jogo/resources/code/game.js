"use strict";
(function(){window.addEventListener("load", main);}());
const speed = 15;
const path = "../textures/";
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
    var mapPR = new Element(path+"map/praca.png",player.posX,player.posY,speed);
    var structuresPR = new Array(
        //LIXO FORA DA PRACA
        new Structure(path+'structures/trash.png',mapPR.posX-(0),mapPR.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-145),mapPR.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-335),mapPR.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-440),mapPR.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-710),mapPR.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-800),mapPR.posY-(-155),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-900),mapPR.posY-(-155),speed,null,hitboxTrash),
        //ARVORES
        new Structure(path+'structures/tree.png',mapPR.posX-(0),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-125),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-250),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-375),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-500),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-625),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-750),mapPR.posY-(-255),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-750),mapPR.posY-(-375),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-750),mapPR.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-625),mapPR.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-500),mapPR.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-375),mapPR.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-250),mapPR.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(-125),mapPR.posY-(-485),speed,null,hitboxTree),
        new Structure(path+'structures/tree.png',mapPR.posX-(0),mapPR.posY-(-485),speed,null,hitboxTree),
        //BANCOS
        new Structure(path+'structures/bench_down.png',mapPR.posX-(-45),mapPR.posY-(-265),speed,null,hitboxBenchDown), 
        new Structure(path+'structures/bench_down.png',mapPR.posX-(-175),mapPR.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',mapPR.posX-(-305),mapPR.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',mapPR.posX-(-420),mapPR.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',mapPR.posX-(-555),mapPR.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png',mapPR.posX-(-685),mapPR.posY-(-265),speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_left.png',mapPR.posX-(-750),mapPR.posY-(-300),speed,null,hitboxBenchLeft),
        new Structure(path+'structures/bench_left.png',mapPR.posX-(-750),mapPR.posY-(-420),speed,null,hitboxBenchLeft),
        //LIXO NO MEIO DA PRACA
        new Structure(path+'structures/trash.png',mapPR.posX-(-80),mapPR.posY-(-270),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-455),mapPR.posY-(-270),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-670),mapPR.posY-(-270),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-750),mapPR.posY-(-345),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-750),mapPR.posY-(-470),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-645),mapPR.posY-(-500),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-520),mapPR.posY-(-500),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-265),mapPR.posY-(-500),speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png',mapPR.posX-(-15),mapPR.posY-(-500),speed,null,hitboxTrash),
        //PARAGEM DE AUTOCARRO
		new Structure(path+'structures/busStop.png',mapPR.posX-(-550),mapPR.posY-(-160),speed,null,hitboxBusStop),
		//WALL
		new Structure(null,mapPR.posX-(0),mapPR.posY-(0),speed,1020,160),
		new Structure(null,mapPR.posX-(0),mapPR.posY-(-205),speed,505,50),
		new Structure(null,mapPR.posX-(0),mapPR.posY-(-525),speed,815,50),
		new Structure(null,mapPR.posX-(-447),mapPR.posY-(-160),speed,50,47),
		new Structure(null,mapPR.posX-(-530),mapPR.posY-(-205),speed,505,50),
		new Structure(null,mapPR.posX-(-770),mapPR.posY-(-205),speed,50,350)
	);
	var map = mapPR
	var structures=structuresPR
	//INIT
		map.slide(ctx,"up");
		player.walk(ctx,"up");
		map.slide(ctx,"down");
		player.walk(ctx,"down");
    //LISTENERS
    var kHandler = function(event){
        keyHandler(event,ctx,player,map,structures);
    }
    window.addEventListener("keydown",kHandler);
}
 
function keyHandler(event,ctx,player,map,structs){
    x = map.posX-player.posX;
    y = map.posY-player.posY;
    document.getElementById("debug").style.color="red"
    document.getElementById("debug").innerHTML="X:"+ x+"\nY:"+y+"\nX:"
    switch(event.code){
        case "KeyW":
		case "ArrowUp":
            updatePosition(ctx,player,map,structs,"up");
            break;
        case "KeyA":
		case "ArrowLeft":
            updatePosition(ctx,player,map,structs,"left");
            break;
        case "KeyS":
		case "ArrowDown":
            updatePosition(ctx,player,map,structs,"down");
            break;
        case "KeyD":
		case "ArrowRight":
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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