"use strict";
(function(){window.addEventListener("load", main);}());
/*
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
const HITBOX_PERSON = 5;
const HITBOX_TREE = 6;
const HITBOX_BOX = 5;
const HITBOX_CONE = 4;
const HITBOX_BARRER = 6;
const HITBOX_TRASH = 6;
const HITBOX_BUS_STOP = 10;
const HITBOX_BENCH_DOWN = 8;
const HITBOX_BENCH_LEFT = 35;
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
	var player = new Player(PATH+"player/male/player_male","Dylan",canvas.width/2,canvas.height/2,HITBOX_PERSON);
	//STRUCTURES
    var structuresPR = new Array(
        //LIXO FORA DA PRACA
        new Structure(PATH+'structures/trash.png', -0, -155,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -145, -155,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -335, -155,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -440, -155,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -710, -155,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -800, -155,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -900, -155,speed,null,HITBOX_TRASH),
        //ARVORES
        new Structure(PATH+'structures/tree.png', -0, -255,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -125, -255,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -250, -255,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -500, -255,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -625, -255,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -750, -255,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -750, -375,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -750, -485,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -625, -485,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -500, -485,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -250, -485,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -125, -485,speed,null,HITBOX_TREE),
        new Structure(PATH+'structures/tree.png', -0, -485,speed,null,HITBOX_TREE),
        //BANCOS
        new Structure(PATH+'structures/bench_down.png', -45, -265,speed,null,HITBOX_BENCH_DOWN), 
        new Structure(PATH+'structures/bench_down.png', -175, -265,speed,null,HITBOX_BENCH_DOWN),
        new Structure(PATH+'structures/bench_down.png', -420, -265,speed,null,HITBOX_BENCH_DOWN),
        new Structure(PATH+'structures/bench_down.png', -555, -265,speed,null,HITBOX_BENCH_DOWN),
        new Structure(PATH+'structures/bench_down.png', -685, -265,speed,null,HITBOX_BENCH_DOWN),
        new Structure(PATH+'structures/bench_left.png', -750, -300,speed,null,HITBOX_BENCH_LEFT),
        new Structure(PATH+'structures/bench_left.png', -750, -420,speed,null,HITBOX_BENCH_LEFT),
        //LIXO NO MEIO DA PRACA
        new Structure(PATH+'structures/trash.png', -80, -270,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -455, -270,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -670, -270,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -750, -345,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -750, -470,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -645, -500,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -520, -500,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -265, -500,speed,null,HITBOX_TRASH),
        new Structure(PATH+'structures/trash.png', -15, -500,speed,null,HITBOX_TRASH),
        //PARAGEM DE AUTOCARRO
		new Structure(PATH+'structures/busStop.png', -550, -160,speed,null,HITBOX_BUS_STOP),
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
		new Structure(PATH+'structures/box1.png',-810,-160,speed,null,HITBOX_BOX),
		new Structure(PATH+'structures/box2.png',-825,-165,speed,null,HITBOX_BOX),
		new Structure(PATH+'structures/box3.png',-810,-170,speed,null,HITBOX_BOX),
		new Structure(PATH+'structures/box4.png',-820,-180,speed,null,HITBOX_BOX),
		new Structure(PATH+'structures/box2.png',-805,-190,speed,null,HITBOX_BOX),
		//TRIGGER
		new Teleporter(null, -475, -540,speed,32,30,UNIVERSITY,player.posX-1425,player.posY-400,"left"),
		new Teleporter(null, -555, -190,speed,40,20,HOME,player.posX-520,player.posY-195,"up"),
		//PEOPLE
		new Person(PATH+'people/female3_0.png',-600,-178,speed,null,HITBOX_PERSON,["Para voltares a casa apanha o autocarro"]), 
		new Person(PATH+'people/male1_3.png',-600,-153,speed,null,HITBOX_PERSON,["Quero comprar o traje académicio!!"]), 
		new Person(PATH+'people/male1_2.png',-775,-183,speed,null,HITBOX_PERSON,["Bloquearam o passeio com estes cartões"]), 
		new Person(PATH+'people/female2_3.png',-505,-153,speed,null,HITBOX_PERSON,["O Multibanco está avariado, não consigo","levantar dinheiro"]), 
		new Person(PATH+'people/male2_1.png',-390,-378,speed,null,HITBOX_PERSON,["Linda esta Cidade dos Estudantes..."]), 
		new Person(PATH+'people/female1_0.png',-670,-473,speed,null,HITBOX_PERSON,["O meu filho está a ser praxado, aiiii que","girooo"]), 
		new Person(PATH+'people/female3_1.png',-755,-348,speed,null,HITBOX_PERSON,["O Jardim da Sereia está fechado ao publico","não é habitual"]), 
		new Person(PATH+'people/female1_0.png',-695,-278,speed,null,HITBOX_PERSON,["Adoro ver os caloiros a serem Praxados"]), 
		new Person(PATH+'people/female3_3.png',-460,-508,speed,null,HITBOX_PERSON,["Por aqui pode ir até à Universidade"]), 
		new Person(PATH+'people/female1_3.png',-495,-418,speed,null,HITBOX_PERSON,["O café está fechado, queria uma cervejinha :("]), 
		new Person(PATH+'people/caloiro1.png',-685,-333,speed,null,HITBOX_PERSON,["SIM DOUTORA RITA!"]), 
		new Person(PATH+'people/caloiro2.png',-685,-348,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro6.png',-685,-363,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-685,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro5.png',-670,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-670,-363,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro6.png',-670,-348,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-670,-333,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-655,-333,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-655,-348,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro6.png',-655,-363,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro5.png',-655,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-640,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR BRUNO!"]), 
		new Person(PATH+'people/caloiro3.png',-640,-363,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-640,-348,speed,null,HITBOX_PERSON,["SIM DOUTOR DYLAN!"]), 
		new Person(PATH+'people/caloiro1.png',-640,-333,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/doutora_up.png',-660,-398,speed,null,HITBOX_PERSON,["CALOIRADA!","FORMAÇÃO!"]), 
		new Person(PATH+'people/doutor_up.png',-675,-398,speed,null,HITBOX_PERSON,["CALOIROS! QUEM CHEGOU ATRASADO FICA D4"]), 
		new Person(PATH+'people/caloira1.png',-700,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-700,-363,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/doutor_right.png',-620,-373,speed,null,HITBOX_PERSON,["Estes caloiros não se sabem comportar"]), 
	);
	var structuresUC = new Array(
		//ARVORES
		new Structure(PATH+'structures/tree.png', -375, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -405, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -465, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -495, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -525, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -555, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -585, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -615, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -645, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -720, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -795, -290,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -470, -500,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -555, -500,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -660, -500,speed,null,HITBOX_TREE),
		new Structure(PATH+'structures/tree.png', -770, -500,speed,null,HITBOX_TREE), 
		new Structure(PATH+'structures/bush.png', -495, -540,speed,null,HITBOX_TREE), 
		new Structure(PATH+'structures/bush.png', -580, -540,speed,null,HITBOX_TREE), 
		new Structure(PATH+'structures/bush.png', -615, -540,speed,null,HITBOX_TREE), 
		new Structure(PATH+'structures/bush.png', -530, -540,speed,null,HITBOX_TREE), 
		//D.DINIS
		new Structure(PATH+'structures/statue.png', -995, -395,speed,null,10),
		//BANCOS
		new Structure(PATH+'structures/bench_down.png', -675, -305,speed,null,HITBOX_BENCH_DOWN),
		//LIXO
		new Structure(PATH+'structures/trash.png', -705, -565,speed,null,HITBOX_TRASH),
		new Structure(PATH+'structures/trash.png', -445, -565,speed,null,HITBOX_TRASH),
		new Structure(PATH+'structures/trash.png', -465, -335,speed,null,HITBOX_TRASH),
		new Structure(PATH+'structures/trash.png', -450, -300,speed,null,HITBOX_TRASH),
		new Structure(PATH+'structures/trash.png', -780, -300,speed,null,HITBOX_TRASH),
		new Structure(PATH+'structures/trash.png', -1155, -620,speed,null,HITBOX_TRASH),
		//AUTOCARRO
		new Structure(PATH+'structures/busStop.png', -480, -315,speed,null,HITBOX_BUS_STOP),
		//FACULDADES
		new Structure(null, -375, -60,speed,445,245),//FMUC
		new Structure(PATH+'structures/DM.png', -809, -628,speed, 455,230),//DM
		new Structure(PATH+'structures/DF_DQ.png', -373, -574,speed,430,230),//DFDQ
		//WALL
		new Structure(null, -320, -0,speed,50,780),//estrada oeste
		new Structure(null, -1295, -625,speed,95,130),//estrada este DM
		new Structure(null, -825, -250,speed, 415,100),//estrada norte d dinis
		new Structure(null, -1240, -220,speed,150,285),//estrada este d dinis
		new Structure(null, -825, -505,speed,565,95),//estrada sul d dinis
		new Structure(null, -1375, -200,speed,70,50),//muro monumentais norte
		new Structure(null, -1440, -245,speed,45,110), //muro monumentais nordeste
		new Structure(null, -1440, -475,speed,95,285),//muro monumentais suleste
		//Barrer and cones
		new Structure(PATH+'structures/barrer.png',-1390,-635,speed,null,HITBOX_BARRER),
		new Structure(PATH+'structures/cone.png',-1430,-635,speed,null,HITBOX_CONE), 
		new Structure(PATH+'structures/cone.png',-1420,-635,speed,null,HITBOX_CONE), 
		new Structure(PATH+'structures/cone.png',-1280,-625,speed,null,HITBOX_CONE), 
		new Structure(PATH+'structures/cone.png',-1270,-635,speed,null,HITBOX_CONE), 
		new Structure(PATH+'structures/cone.png',-1260,-640,speed,null,HITBOX_CONE),
		//TRIGGER
		new Teleporter(null,-1450,-350,speed, 90,120,PRACA_REPUBLICA,player.posX-480,player.posY-510,"up"),
		new MiniGameTrigger(null,-1110,-635,speed,45,15),//DM
		new MiniGameTrigger(null,-655,-580,speed,50,20),//DQ
		new MiniGameTrigger(null,-395,-580,speed,50,20),//DF
		new MiniGameTrigger(null,-425,-300,speed,30,10),//FMUC Esquerda
		new MiniGameTrigger(null,-750,-300,speed,30,10),//FMUC Direita
		//PEOPLE
		new Person(PATH+'people/female1_3.png',-1395,-618,speed,null,HITBOX_PERSON,["Estou farta destas obras, não me apetece","descer as Monumentais"]), 
		new Person(PATH+'people/doutor_down.png',-1105,-598,speed,null,HITBOX_PERSON,["A minha frente tens o Departamento de Matemática"]), 
		new Person(PATH+'people/doutor_down.png',-675,-513,speed,null,HITBOX_PERSON,["Este é o Departamento de Quimica","Olha!! Ao nosso lado está a tuna da FCTUC"]), 
		new Person(PATH+'people/doutor_down.png',-735,-303,speed,null,HITBOX_PERSON,["Bem vindo à Faculdade de Medicina"]), 
		new Person(PATH+'people/doutor_down.png',-450,-303,speed,null,HITBOX_PERSON,["Esta é outra entrada da Faculdade de Medicina"]), 
		new Person(PATH+'people/female2_0.png',-470,-338,speed,null,HITBOX_PERSON,["Hoje como é um dia especial não há autocarros","a circular aqui"]), 
		new Person(PATH+'people/doutor_right.png',-380,-553,speed,null,HITBOX_PERSON,["Podes entrar na Faculdade de Fisica se quiseres"]), 
		new Person(PATH+'people/caloiro1.png',-510,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-525,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-540,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-555,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-570,-378,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-570,-393,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-555,-393,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro6.png',-540,-393,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-525,-393,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-510,-393,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro5.png',-510,-408,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-525,-408,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-540,-408,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-555,-408,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-570,-408,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/doutor_up.png',-525,-423,speed,null,HITBOX_PERSON,["CALOIROS, CALEM-SE"]), 
		new Person(PATH+'people/doutora_up.png',-540,-423,speed,null,HITBOX_PERSON,["Eles não cantam nada de jeito"]), 
		new Person(PATH+'people/doutora_up.png',-555,-423,speed,null,HITBOX_PERSON,["Eles são caloiros de medicina"]),  
		new Person(PATH+'people/doutor_right.png',-600,-543,speed,null,HITBOX_PERSON,["🎶COIMBRA É LINDA EM FESTA🎶"]), 
		new Person(PATH+'people/doutor_right.png',-600,-558,speed,null,HITBOX_PERSON,["🎶MINHA TERRA DE ELEIÇÃO🎶"]), 
		new Person(PATH+'people/doutora_up.png',-615,-558,speed,null,HITBOX_PERSON,["🎶JAMAIS SAIREI DAQUI🎶"]), 
		new Person(PATH+'people/doutora_up.png',-630,-558,speed,null,HITBOX_PERSON,["🎶TU ÉS A MINHA PAIXÃO🎶"]), 
		new Person(PATH+'people/doutora_up.png',-645,-558,speed,null,HITBOX_PERSON,["🎶AS GUITARRAS NOS EMBALAM🎶"]), 
		new Person(PATH+'people/doutor_left.png',-645,-543,speed,null,HITBOX_PERSON,["🎶COM A TUA LINDA CANÇÃO🎶"]), 
		new Person(PATH+'people/doutor_left.png',-645,-528,speed,null,HITBOX_PERSON,["🎶TUNAS ALEGRAM AS NOITES🎶"]), 
		new Person(PATH+'people/doutor_down.png',-645,-513,speed,null,HITBOX_PERSON,["🎶ESTUDANTES ATÉ MAIS NÃO🎶"]), 
		new Person(PATH+'people/doutor_down.png',-630,-513,speed,null,HITBOX_PERSON,["🎶O SOL JÁ ESTÁ A NASCER🎶"]), 
		new Person(PATH+'people/doutor_down.png',-615,-513,speed,null,HITBOX_PERSON,["🎶NESTE DIA DE LATADA🎶"]), 
		new Person(PATH+'people/doutor_right.png',-600,-513,speed,null,HITBOX_PERSON,["🎶SEGUNDA FOI A DOER🎶"]), 
		new Person(PATH+'people/doutor_right.png',-600,-528,speed,null,HITBOX_PERSON,["🎶TERÇA FOI DE MÃO PESADA🎶"]), 
		new Person(PATH+'people/doutor_right.png',-695,-408,speed,null,HITBOX_PERSON,["CALOIROS NÃO ESTOU A OUVIR NADA!!"]), 
		new Person(PATH+'people/doutor_right.png',-695,-418,speed,null,HITBOX_PERSON,["MAIS ALTO!!!"]), 
		new Person(PATH+'people/doutor_right.png',-695,-433,speed,null,HITBOX_PERSON,["NÃO CANTAM NADA QUANDO APARECEM CALOIROS","DE INFORMÁTICA, ISSO É UMA VERGONHA"]), 
		new Person(PATH+'people/caloiro7.png',-710,-433,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-710,-418,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-710,-403,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-710,-388,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-725,-388,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-725,-403,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-725,-418,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-725,-433,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-740,-433,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro6.png',-740,-418,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro5.png',-740,-403,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-740,-388,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-755,-388,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-770,-388,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-785,-388,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-785,-403,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-770,-403,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-755,-403,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-755,-418,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-770,-418,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-785,-418,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-785,-433,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-770,-433,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-755,-433,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/female3_0.png',-980,-408,speed,null,HITBOX_PERSON,["Esta é a estátua de um dos Reis de Portugal"]), 
		new Person(PATH+'people/caloira1.png',-1160,-383,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-1175,-383,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira1.png',-1190,-383,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-1205,-383,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-1220,-383,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-1220,-398,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-1205,-398,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloira2.png',-1190,-398,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-1175,-398,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-1160,-398,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-1160,-413,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-1175,-413,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro1.png',-1190,-413,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-1205,-413,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-1220,-413,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro2.png',-1220,-428,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-1205,-428,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro5.png',-1190,-428,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-1175,-428,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro7.png',-1160,-428,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro6.png',-1160,-443,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro5.png',-1175,-443,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-1190,-443,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro4.png',-1205,-443,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/caloiro3.png',-1220,-443,speed,null,HITBOX_PERSON,["SIM DOUTOR!"]), 
		new Person(PATH+'people/doutora_up.png',-1205,-463,speed,null,HITBOX_PERSON,["CALOIRADA!"]), 
		new Person(PATH+'people/doutora_up.png',-1195,-463,speed,null,HITBOX_PERSON,["CALOIROS COMPORTEM-SE!"]), 
		new Person(PATH+'people/doutora_up.png',-1185,-463,speed,null,HITBOX_PERSON,["APRENDAM AS MUSICAS DO NOSSO CURSO!"]), 
		new Person(PATH+'people/doutor_up.png',-1175,-463,speed,null,HITBOX_PERSON,["REPRESENTEM O NOSSO CURSO!"]), 
		new Person(PATH+'people/doutor_up.png',-1165,-463,speed,null,HITBOX_PERSON,["TENTEM CHEGAR AOS CALCANHARES","DOS CALOIROS DE INFORMÁTICA!"]), 
	);
	var structuresHome = new Array(
		new Structure(PATH+'structures/busStop.png', -455, -155,speed,null,HITBOX_BUS_STOP),
		new Structure(PATH+'structures/trash.png', -505, -180,speed,null,HITBOX_TRASH),
		//WALL
		new Structure(null, -0, -205,speed,930,35),//estrada sul
		new Structure(null, -675, -0,speed,30,240),//estrada este
		new Structure(null, -315, -0,speed,32,240),//estrada oeste
		new Structure(null, -355, -0,speed,315,157),//casas
		//TRIGGER
		new Teleporter(null, -460, -190, speed,40,20,PRACA_REPUBLICA,player.posX-620,player.posY-195,"up"),
		//PEOPLE
		new Person(PATH+'people/male4_0.png',-515,-178,speed,null,HITBOX_PERSON,["Podes apanhar o autocarro para ir à Praça"]), 
		new Person(PATH+'people/female1_0.png',-635,-153,speed,null,HITBOX_PERSON,["Meu filho a tua aventura começa aqui vai à","universidade conheceres os teus amigos"]), 
		new Person(PATH+'people/male1_2.png',-370,-168,speed,null,HITBOX_PERSON,["Se carregares na tecla M podes ver o mapa","da cidade"]), 
	);
	//MAPS
	var mapPR = new Map(PATH+"map/praca.png",0,0,speed,structuresPR);
	var mapUC = new Map(PATH+"map/uc.png",0,0,speed,structuresUC);
	var mapHome = new Map(PATH+"map/home.png",0,0,speed,structuresHome);
	//GAME
	new Game(ctx,player,
		new Array(mapHome,mapPR,mapUC),
		new Money(PATH+"gui/labelMoney.svg",ctx.canvas.width-50,10,45,17,10,false),
		new MiniMap(PATH+"map/map.png",0,0),
		new Dialog(PATH+"gui/dialog.svg",10, ctx.canvas.height-35, ctx.canvas.width-20,25)
	);
}

