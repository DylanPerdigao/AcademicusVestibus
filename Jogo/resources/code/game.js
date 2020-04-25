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
const hitboxTree = 6;
const hitboxBox = 5;
const hitboxCone = 4;
const hitboxBarrer = 6;
const hitboxTrash = 6;
const hitboxBusStop = 10;
const hitboxBenchDown = 8;
const hitboxBenchLeft = 35;
const HOME = 0;
const PRACA_REPUBLICA = 1;
const UNIVERSITY = 2;
const PATH = "../textures/";

//FUNCTIONS
function main()
{   
    //CANVAS
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 250;
	canvas.height = 250;
    //PLAYER
	var player = new Player(PATH+"player/male/player_male","Dylan",canvas.width/2,canvas.height/2,0,5);
	//STRUCTURES
    var structuresPR = new Array(
        //LIXO FORA DA PRACA
        new Structure(PATH+'structures/trash.png', -0, -155,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -145, -155,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -335, -155,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -440, -155,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -710, -155,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -800, -155,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -900, -155,speed,null,hitboxTrash),
        //ARVORES
        new Structure(PATH+'structures/tree.png', -0, -255,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -125, -255,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -250, -255,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -500, -255,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -625, -255,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -750, -255,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -750, -375,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -750, -485,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -625, -485,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -500, -485,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -250, -485,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -125, -485,speed,null,hitboxTree),
        new Structure(PATH+'structures/tree.png', -0, -485,speed,null,hitboxTree),
        //BANCOS
        new Structure(PATH+'structures/bench_down.png', -45, -265,speed,null,hitboxBenchDown), 
        new Structure(PATH+'structures/bench_down.png', -175, -265,speed,null,hitboxBenchDown),
        new Structure(PATH+'structures/bench_down.png', -420, -265,speed,null,hitboxBenchDown),
        new Structure(PATH+'structures/bench_down.png', -555, -265,speed,null,hitboxBenchDown),
        new Structure(PATH+'structures/bench_down.png', -685, -265,speed,null,hitboxBenchDown),
        new Structure(PATH+'structures/bench_left.png', -750, -300,speed,null,hitboxBenchLeft),
        new Structure(PATH+'structures/bench_left.png', -750, -420,speed,null,hitboxBenchLeft),
        //LIXO NO MEIO DA PRACA
        new Structure(PATH+'structures/trash.png', -80, -270,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -455, -270,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -670, -270,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -750, -345,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -750, -470,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -645, -500,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -520, -500,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -265, -500,speed,null,hitboxTrash),
        new Structure(PATH+'structures/trash.png', -15, -500,speed,null,hitboxTrash),
        //PARAGEM DE AUTOCARRO
		new Structure(PATH+'structures/busStop.png', -550, -160,speed,null,hitboxBusStop),
		//CARTOLA
		new Structure(PATH+'structures/cartola.png', -475, -330,speed,null,80),
		//WALL
		new Structure(null, -320, -250,speed,55,275),//ESTRADA OESTE
		new Structure(null, -447, -160,speed,50,47),//estrada rua norte
		new Structure(null, -0, -0,speed,1020,157),//casas norte
		new Structure(null, -0, -205,speed,505,50),//estrada norte oeste
		new Structure(null, -770, -205,speed,50,360),//estrada norte este,
		new Structure(null, -0, -525,speed,470,50),//estrada sul oeste
		new Structure(null, -505, -525,speed,400,50),//estrada sul este
		new Structure(null, -530, -205,speed,505,50),//estrada este
		//BOXES
		new Structure(PATH+'structures/box1.png',-810,-160,speed,null,hitboxBox),
		new Structure(PATH+'structures/box2.png',-825,-165,speed,null,hitboxBox),
		new Structure(PATH+'structures/box3.png',-810,-170,speed,null,hitboxBox),
		new Structure(PATH+'structures/box4.png',-820,-180,speed,null,hitboxBox),
		new Structure(PATH+'structures/box2.png',-805,-190,speed,null,hitboxBox),
		//TRIGGER
		new Teleporter(null, -475, -540,speed,32,30,UNIVERSITY,player.posX-1425,player.posY-400,"left"),
		new Teleporter(null, -555, -190,speed,40,20,HOME,player.posX-520,player.posY-195,"up")
	);
	var structuresUC = new Array(
		//ARVORES
		new Structure(PATH+'structures/tree.png', -375, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -405, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -465, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -495, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -525, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -555, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -585, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -615, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -645, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -720, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -795, -290,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -470, -500,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -555, -500,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -660, -500,speed,null,hitboxTree),
		new Structure(PATH+'structures/tree.png', -770, -500,speed,null,hitboxTree), 
		new Structure(PATH+'structures/bush.png', -495, -540,speed,null,hitboxTree), 
		new Structure(PATH+'structures/bush.png', -580, -540,speed,null,hitboxTree), 
		new Structure(PATH+'structures/bush.png', -615, -540,speed,null,hitboxTree), 
		new Structure(PATH+'structures/bush.png', -530, -540,speed,null,hitboxTree), 
		//D.DINIS
		new Structure(PATH+'structures/statue.png', -995, -395,speed,null,10),
		//BANCOS
		new Structure(PATH+'structures/bench_down.png', -675, -305,speed,null,hitboxBenchDown),
		//LIXO
		new Structure(PATH+'structures/trash.png', -705, -565,speed,null,hitboxTrash),
		new Structure(PATH+'structures/trash.png', -445, -565,speed,null,hitboxTrash),
		new Structure(PATH+'structures/trash.png', -465, -335,speed,null,hitboxTrash),
		new Structure(PATH+'structures/trash.png', -450, -300,speed,null,hitboxTrash),
		new Structure(PATH+'structures/trash.png', -780, -300,speed,null,hitboxTrash),
		new Structure(PATH+'structures/trash.png', -1155, -620,speed,null,hitboxTrash),
		//AUTOCARRO
		new Structure(PATH+'structures/busStop.png', -480, -315,speed,null,hitboxBusStop),
		//FACULDADES
		new Structure(null, -375, -60,speed,445,245),//FMUC
		new Structure(PATH+'structures/DM.png', -809, -628,speed, 455,230),//DM
		new Structure(PATH+'structures/DF_DQ.png', -373, -574,speed,430,230),//DFDQ
		//WALL
		new Structure(null, -320, -0,speed,50,780),//estrada oeste
		new Structure(null, -1295, -625,speed,90,130),//estrada este DM
		new Structure(null, -825, -250,speed, 415,100),//estrada norte d dinis
		new Structure(null, -1240, -220,speed,145,285),//estrada este d dinis
		new Structure(null, -825, -505,speed,560,95),//estrada sul d dinis
		new Structure(null, -1375, -200,speed,70,50),//muro monumentais norte
		new Structure(null, -1440, -245,speed,45,110), //muro monumentais nordeste
		new Structure(null, -1440, -475,speed,95,285),//muro monumentais suleste
		//Barrer and cones
		new Structure(PATH+'structures/barrer.png',-1390,-635,speed,null,hitboxBarrer),
		new Structure(PATH+'structures/cone.png',-1430,-635,speed,null,hitboxCone), 
		new Structure(PATH+'structures/cone.png',-1420,-635,speed,null,hitboxCone), 
		new Structure(PATH+'structures/cone.png',-1280,-625,speed,null,hitboxCone), 
		new Structure(PATH+'structures/cone.png',-1270,-635,speed,null,hitboxCone), 
		new Structure(PATH+'structures/cone.png',-1260,-640,speed,null,hitboxCone),
		//TRIGGER
		new Teleporter(null,-1450,-350,speed, 90,120,PRACA_REPUBLICA,player.posX-480,player.posY-510,"up"),
		new MiniGameTrigger(null,-1110,-635,speed,45,15),//DM
		new MiniGameTrigger(null,-655,-580,speed,50,20),//DQ
		new MiniGameTrigger(null,-395,-580,speed,50,20),//DF
		new MiniGameTrigger(null,-425,-300,speed,30,10),//FMUC Esquerda
		new MiniGameTrigger(null,-750,-300,speed,30,10),//FMUC Direita
	);
	var structuresHome = new Array(
		new Structure(PATH+'structures/busStop.png', -455, -155,speed,null,hitboxBusStop),
		new Structure(PATH+'structures/trash.png', -505, -180,speed,null,hitboxTrash),
		//WALL
		new Structure(null, -0, -205,speed,930,35),//estrada sul
		new Structure(null, -675, -0,speed,30,240),//estrada este
		new Structure(null, -315, -0,speed,32,240),//estrada oeste
		new Structure(null, -355, -0,speed,315,157),//casas
		//TRIGGER
		new Teleporter(null, -460, -190, speed,40,20,PRACA_REPUBLICA,player.posX-615,player.posY-195,"up")
	);
	//MAPS
	var mapPR = new Map(PATH+"map/praca.png",0,0,speed,structuresPR);
	var mapUC = new Map(PATH+"map/uc.png",0,0,speed,structuresUC);
	var mapHome = new Map(PATH+"map/home.png",0,0,speed,structuresHome);
	//MINI-MAP
	var miniMap = new MiniMap(PATH+"map/map.png",0,0);
	//GAME
	new Game(ctx,player,new Array(mapHome,mapPR,mapUC),new Money(PATH+"gui/labelMoney.svg",ctx.canvas.width-50,10,45,17,10,false),miniMap);
}