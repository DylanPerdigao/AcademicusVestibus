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
 * POSITIONS HOME:
 * - HOUSE: 		player.posX-635,player.posY-165, DOWN
 * - BUS: 			player.posX-520,player.posY-190, UP
 * 
 */
const speed = 5;
const path = "../textures/";
const hitboxTree = 6;
const hitboxTrash = 6;
const hitboxBusStop = 10;
const hitboxBenchDown = 8;
const hitboxBenchLeft = 35;
const HOME = 0;
const PRACA_REPUBLICA = 1;
const UNIVERSITY = 2;

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
	 ******************	STRUCTS PRACA DA REPUBLICA*******************************
	 *************************************************************************/
    var structuresPR = new Array(
        //LIXO FORA DA PRACA
        new Structure(path+'structures/trash.png', -0, -155,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -145, -155,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -335, -155,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -440, -155,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -710, -155,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -800, -155,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -900, -155,speed,null,hitboxTrash),
        //ARVORES
        new Structure(path+'structures/tree.png', -0, -255,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -125, -255,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -250, -255,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -500, -255,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -625, -255,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -750, -255,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -750, -375,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -750, -485,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -625, -485,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -500, -485,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -250, -485,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -125, -485,speed,null,hitboxTree),
        new Structure(path+'structures/tree.png', -0, -485,speed,null,hitboxTree),
        //BANCOS
        new Structure(path+'structures/bench_down.png', -45, -265,speed,null,hitboxBenchDown), 
        new Structure(path+'structures/bench_down.png', -175, -265,speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png', -420, -265,speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png', -555, -265,speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_down.png', -685, -265,speed,null,hitboxBenchDown),
        new Structure(path+'structures/bench_left.png', -750, -300,speed,null,hitboxBenchLeft),
        new Structure(path+'structures/bench_left.png', -750, -420,speed,null,hitboxBenchLeft),
        //LIXO NO MEIO DA PRACA
        new Structure(path+'structures/trash.png', -80, -270,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -455, -270,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -670, -270,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -750, -345,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -750, -470,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -645, -500,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -520, -500,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -265, -500,speed,null,hitboxTrash),
        new Structure(path+'structures/trash.png', -15, -500,speed,null,hitboxTrash),
        //PARAGEM DE AUTOCARRO
		new Structure(path+'structures/busStop.png', -550, -160,speed,null,hitboxBusStop),
		//WALL
		new Structure(null, -320, -250,speed,55,275),//ESTRADA OESTE
		new Structure(null, -447, -160,speed,50,47),//estrada rua norte
		new Structure(null, -0, -0,speed,1020,160),//casas norte
		new Structure(null, -0, -205,speed,505,50),//estrada norte oeste
		new Structure(null, -770, -205,speed,50,360),//estrada norte este,
		new Structure(null, -0, -525,speed,470,50),//estrada sul oeste
		new Structure(null, -505, -525,speed,400,50),//estrada sul este
		new Structure(null, -530, -205,speed,505,50),//estrada este
		//TRIGGER
		new Teleporter(null, -475, -525,speed,32,30,UNIVERSITY,player.posX-1405,player.posY-400,"left")
	);
	/*************************************************************************
	 ******************	STRUCTS UNIVERSIDADE *********************************
	 *************************************************************************/

	var structuresUC = new Array(
		//ARVORES
		new Structure(path+'structures/tree.png', -375, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -405, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -465, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -495, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -525, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -555, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -585, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -615, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -645, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -720, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -795, -290,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -470, -500,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -555, -500,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -660, -500,speed,null,hitboxTree),
		new Structure(path+'structures/tree.png', -770, -500,speed,null,hitboxTree), 
		//D.DINIS
		new Structure(path+'structures/statue.png', -995, -395,speed,null,10),
		//BANCOS
		new Structure(path+'structures/bench_down.png', -675, -305,speed,null,hitboxBenchDown),
		//LIXO
		new Structure(path+'structures/trash.png', -705, -565,speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png', -445, -565,speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png', -465, -335,speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png', -450, -300,speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png', -780, -300,speed,null,hitboxTrash),
		new Structure(path+'structures/trash.png', -1155, -620,speed,null,hitboxTrash),
		//AUTOCARRO
		new Structure(path+'structures/busStop.png', -480, -315,speed,null,hitboxBusStop),
		//FACULDADES
		new Structure(null, -375, -60,speed,445,245),//FMUC
		new Structure(path+'structures/DM.png', -809, -628,speed, 455,230),//DM
		new Structure(path+'structures/DF_DQ.png', -373, -574,speed,430,235),//DFDQ
		//WALL
		new Structure(null, -320, -0,speed,50,780),//estrada oeste
		new Structure(null, -1295, -625,speed,90,130),//estrada este DM
		new Structure(null, -825, -250,speed, 415,100),//estrada norte d dinis
		new Structure(null, -1240, -220,speed,145,285),//estrada este d dinis
		new Structure(null, -825, -505,speed,560,95),//estrada sul d dinis
		new Structure(null, -1375, -200,speed,70,50),//muro monumentais norte
		new Structure(null, -1440, -245,speed,45,110), //muro monumentais nordeste
		new Structure(null, -1440, -475,speed,95,285),//muro monumentais suleste
		//TRIGGER
		new Teleporter(null,-1435,-350,speed, 90,110,PRACA_REPUBLICA,player.posX-480,player.posY-480,"up")

	);
	
	/*************************************************************************
	 ******************	STRUCTS CASA ********************************************
	 *************************************************************************/

	var structuresHome = new Array(
		new Structure(path+'structures/busStop.png', -455, -155,speed,null,hitboxBusStop),
		new Structure(path+'structures/trash.png', -505, -180,speed,null,hitboxTrash),
		//WALL
		new Structure(null, -0, -205,speed,930,35),//estrada sul
		new Structure(null, -675, -0,speed,30,240),//estrada este
		new Structure(null, -315, -0,speed,32,240),//estrada oeste
		new Structure(null, -355, -0,speed,315,155),//casas
		//TRIGGER
		new Teleporter(null, -520, -190, speed,20,20,PRACA_REPUBLICA,player.posX-600,player.posY-180,"up")
	);
	//MAPS
	var mapPR = new Map(path+"map/praca.png",0,0,speed,structuresPR);
	var mapUC = new Map(path+"map/uc.png",0,0,speed,structuresUC);
	var mapHome = new Map(path+"map/home.png",0,0,speed,structuresHome);
	//GAME
	var game = new Game(
		player,
		new Array(mapHome,mapPR,mapUC),
		new Money(path+"gui/labelMoney.svg",ctx.canvas.width-50,10,45,17,10,false)
	);
	game.map.updatePosition(player.posX-635,player.posY-160);
	game.map.setStructuresPositions();
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
			game.map.structures.push(new Structure(path+'structures/tree.png',game.map.posX-x,game.map.posY-y,null,hitboxTree))
            console.log("new Structure(path+'structures/tree.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxTree),\n")
            break;
        case "Digit2":
            game.map.structures.push(new Structure(path+'structures/trash.png',game.map.posX-x,game.map.posY-y,null,hitboxTrash))
            console.log("new Structure(path+'structures/trash.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxTrash),\n")
            break;
        case "Digit3":
            game.map.structures.push(new Structure(path+'structures/bench_down.png',game.map.posX-x,game.map.posY-y,null,hitboxBenchDown))
            console.log("new Structure(path+'structures/bench_down.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBenchDown),\n")
            break;     
        case "Digit4":
            game.map.structures.push(new Structure(path+'structures/bench_left.png',game.map.posX-x,game.map.posY-y,null,hitboxBenchLeft))
            console.log("new Structure(path+'structures/bench_left.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBenchLeft),\n")
            break;  
        case "Digit5":
            game.map.structures.push(new Structure(path+'structures/bench_right.png',game.map.posX-x,game.map.posY-y,null,hitboxBenchLeft))
            console.log("new Structure(path+'structures/bench_right.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBenchRight),\n")
            break;
        case "Digit6":
            game.map.structures.push(new Structure(path+'structures/busStop.png',game.map.posX-x,game.map.posY-y,null,hitboxBusStop))
            console.log("new Structure(path+'structures/busStop.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBusStop),\n")
			break; 
		case "Digit7":
			game.map.structures.push(new Structure(path+'structures/statue.png',game.map.posX-x,game.map.posY-y,null,hitboxBusStop))
			console.log("new Structure(path+'structures/statue.png',map.posX-("+ x +"),map.posY-("+ y +"),speed,null,hitboxBusStop),\n")
			break; 
		case "Digit9":
			game.map.structures.push(new Structure(path+'structures/trash.png',game.map.posX-x,game.map.posY-y,null,10))
			dx=0
			dy=0
			console.log("new Structure(null,map.posX-("+ x +"),map.posY-("+ y +"),speed,")
			break;  
		case "Digit0":
			game.map.structures.push(new Structure(path+'structures/trash.png',game.map.posX-x,game.map.posY-y,null,10))
			console.log(dx+","+dy+"),\n")
			break;   
         
    }
	for(let i=0;i<game.map.structures.length;i++){
		game.map.structures[i].drawHitbox(ctx);
	}
	game.player.drawHitbox(ctx)
	game.money.draw(ctx)
}
