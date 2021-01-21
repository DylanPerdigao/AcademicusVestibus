"use strict";
(function(){window.addEventListener("load", main);}());

const speed = 5;
const BUS_COST = 3;
const HOME = 0;
const PRACA_REPUBLICA = 1;
const UNIVERSITY = 2;
const ANIMATION_DURATION = 2500;//ms

//FUNCTIONS
function main(){   
    //CANVAS 
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
    canvas.width = 250;
	canvas.height = 250;
	//GAME
	var game;
	var storedGame = JSON.parse(window.localStorage.getItem("game"));
	if(storedGame){
		game = new Game(ctx,storedGame);
	}else{
		var maps = JSON.parse(window.localStorage.getItem("maps"));
		var mapHome = new Map(maps.HOME);
		var mapPlace = new Map(maps.PLACE);
		var mapUniversity = new Map(maps.UNIVERSITY);
		var name = window.localStorage.getItem("name");
		game = new Game(ctx,null,
			new Player("../../textures/player/male",name,canvas.width/2,canvas.height/2,5,false),
			new Array(mapHome,mapPlace,mapUniversity),
			new Money("../../textures/gui/labelMoney.svg",ctx.canvas.width-50,10,45,17,10,false),
			new MiniMap("../../textures/map/map.png",0,0),
			new Dialog("../../textures/gui/dialog.svg",10, ctx.canvas.height-35, ctx.canvas.width-20,25),
		);
	}
}


