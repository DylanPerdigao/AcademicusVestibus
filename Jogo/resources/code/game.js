"use strict";
(function(){window.addEventListener("load", main);}());
/**
 * POSITIONS PRACA DA REPUBLICA:
 * -
 * 
 * POSITIONS UC:
 * -DF: 			player.posX-410,player.posY-555, UP
 * -DQ: 			player.posX-675,player.posY-555, UP
 * -FMUC:			player.posX-760,player.posY-305, DOWN
 * -MONUMENTAIS:	player.posX-1415,player.posY-400, LEFT
 * 
 * 
 * 
 * 
 * 
 * 
 */
const speed = 5;
const path = "../textures/";
const hitboxTree = 6;
const hitboxTrash = 6;
const hitboxBusStop = 10;
const hitboxBenchDown = 8;
const hitboxBenchLeft = 35;

/**********************************************************************************
 ********TIRAR ISTO PORQUE E PARA DEBUGGING*****************************************
 *******vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*****************************************/
					var x=0,y=0;
					var dx=0,dy=0;
/*********^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^****************************************
 ********TIRAR ISTO PORQUE E PARA DEBUGGING*****************************************
 ***********************************************************************************/






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
	
	/*************************************************************************
	 ******************	MAPA PRACA DA REPUBLICA*******************************
	 *************************************************************************/
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
		new Structure(null,mapPR.posX-(-770),mapPR.posY-(-205),speed,50,360)
	);
	/*************************************************************************
	 ******************	MAPA UNIVERSIDADE ************************************
	 *************************************************************************/
    var mapUC = new Element(path+"map/uc.png",player.posX-675,player.posY-555,speed);
	var structuresUC = new Array(
		//ARVORES
		new Structure(path+'structures/tree.png',mapUC.posX-(-375),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-405),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-465),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-495),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-525),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-555),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-585),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-615),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-645),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-720),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-795),mapUC.posY-(-290),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-470),mapUC.posY-(-500),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-555),mapUC.posY-(-500),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-660),mapUC.posY-(-500),speed,null,hitboxTree),
		new Structure(path+'structures/tree.png',mapUC.posX-(-770),mapUC.posY-(-500),speed,null,hitboxTree), 
		//D.DINIS
		new Structure(path+'structures/statue.png',mapUC.posX-(-995),mapUC.posY-(-395),speed,null,10),
		//BANCOS
		new Structure(path+'structures/bench_down.png',mapUC.posX-(-675),mapUC.posY-(-305),speed,null,hitboxBenchDown),
		//LIXO
		new Structure(path+'structures/trash.png',mapUC.posX-(-705),mapUC.posY-(-565),speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png',mapUC.posX-(-445),mapUC.posY-(-565),speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png',mapUC.posX-(-465),mapUC.posY-(-335),speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png',mapUC.posX-(-450),mapUC.posY-(-300),speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png',mapUC.posX-(-780),mapUC.posY-(-300),speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png',mapUC.posX-(-1155),mapUC.posY-(-620),speed,null,hitboxTrash),
		//AUTOCARRO
		new Structure(path+'structures/busStop.png',mapUC.posX-(-480),mapUC.posY-(-315),speed,null,hitboxBusStop),
		//FACULDADES
		new Structure(null,mapUC.posX-(-375),mapUC.posY-(-60),speed,445,245),//FMUC
		new Structure(path+'structures/DM.png',mapUC.posX-(-809),mapUC.posY-(-628),speed, 455,230),//DM
		new Structure(path+'structures/DF_DQ.png',mapUC.posX-(-373),mapUC.posY-(-574),speed,430,235),//DF-DQ
		//WALL
		new Structure(null,mapUC.posX-(-320),mapUC.posY-(0),speed,50,780),//estrada oeste
		new Structure(null,mapUC.posX-(-1295),mapUC.posY-(-625),speed,90,130),//estrada este DM
		new Structure(null,mapUC.posX-(-825),mapUC.posY-(-250),speed, 415,100),//estrada norte d dinis
		new Structure(null,mapUC.posX-(-1240),mapUC.posY-(-220),speed,145,285),//estrada este d dinis
		new Structure(null,mapUC.posX-(-825),mapUC.posY-(-505),speed,560,95),//estrada sul d dinis
		new Structure(null,mapUC.posX-(-1375),mapUC.posY-(-200),speed,70,50),//muro monumentais norte
		new Structure(null,mapUC.posX-(-1440),mapUC.posY-(-245),speed,45,110), //muro monumentais nordeste
		new Structure(null,mapUC.posX-(-1440),mapUC.posY-(-475),speed,95,285),//muro monumentais suleste
	);
	


	var game = new Game(player,mapUC,structuresUC);
    //LISTENERS
    var kHandler = function(event){
        keyHandler(event,ctx,game);
    }
    window.addEventListener("keydown",kHandler);
}
 
function keyHandler(event,ctx,game){
	/**********************************************************************************
 ********TIRAR ISTO PORQUE E PARA DEBUGGING*****************************************
 *******vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*****************************************/
    x = game.map.posX-game.player.posX;
	y = game.map.posY-game.player.posY;
	document.getElementById("debug").style.color="red"
    document.getElementById("debug").innerHTML="X:"+ x+"\nY:"+y+"\ndelta X: " +dx+ "\ndelta Y: " +dy
	/*********^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^****************************************
 ********TIRAR ISTO PORQUE E PARA DEBUGGING*****************************************
 ***********************************************************************************/
    switch(event.code){
		case "Escape":
			game.exitMap(ctx);
			break;
		case "KeyM":
			var map = new Image();
			map.src = path+"map/map.png";
			game.showMap(ctx,map);
			break;
        case "KeyW":
		case "ArrowUp":
			game.updatePosition(ctx,"up");
			dy-=speed;
            break;
        case "KeyA":
		case "ArrowLeft":
			game.updatePosition(ctx,"left");
			dx -=speed;
            break;
        case "KeyS":
		case "ArrowDown":
			game.updatePosition(ctx,"down");
			dy+=speed;
            break;
        case "KeyD":
		case "ArrowRight":
			game.updatePosition(ctx,"right");
			dx+=speed;
            break;
        case "Digit1":
			game.structures.push(new Structure(path+'structures/tree.png',game.map.posX-x,game.map.posY-y,null,hitboxTree))
            console.log("new Structure(path+'structures/tree.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxTree),\n")
            break;
        case "Digit2":
            game.structures.push(new Structure(path+'structures/trash.png',game.map.posX-x,game.map.posY-y,null,hitboxTrash))
            console.log("new Structure(path+'structures/trash.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxTrash),\n")
            break;
        case "Digit3":
            game.structures.push(new Structure(path+'structures/bench_down.png',game.map.posX-x,game.map.posY-y,null,hitboxBenchDown))
            console.log("new Structure(path+'structures/bench_down.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBenchDown),\n")
            break;     
        case "Digit4":
            game.structures.push(new Structure(path+'structures/bench_left.png',game.map.posX-x,game.map.posY-y,null,hitboxBenchLeft))
            console.log("new Structure(path+'structures/bench_left.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBenchLeft),\n")
            break;  
        case "Digit5":
            game.structures.push(new Structure(path+'structures/bench_right.png',game.map.posX-x,game.map.posY-y,null,hitboxBenchLeft))
            console.log("new Structure(path+'structures/bench_right.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBenchRight),\n")
            break;
        case "Digit6":
            game.structures.push(new Structure(path+'structures/busStop.png',game.map.posX-x,game.map.posY-y,null,hitboxBusStop))
            console.log("new Structure(path+'structures/busStop.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBusStop),\n")
			break; 
		case "Digit7":
			game.structures.push(new Structure(path+'structures/statue.png',game.map.posX-x,game.map.posY-y,null,hitboxBusStop))
			console.log("new Structure(path+'structures/statue.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBusStop),\n")
			break; 
		case "Digit9":
			game.structures.push(new Structure(path+'structures/trash.png',game.map.posX-x,game.map.posY-y,null,10))
			dx=0
			dy=0
			console.log("new Structure(null,map.posX-("+ x +"),map.posY-("+ y +"),speed,")
			break;  
		case "Digit0":
			game.structures.push(new Structure(path+'structures/trash.png',game.map.posX-x,game.map.posY-y,null,10))
			console.log(dx+","+dy+"),\n")
			break;   
         
    }
	for(let i=0;i<game.structures.length;i++){
		game.structures[i].drawHitbox(ctx);
	}
    game.player.drawHitbox(ctx)
}
