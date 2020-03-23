"use strict";
(function(){window.addEventListener("load", main);}());
const speed = 5;
//FUNCTIONS
function main()
{   
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 250;
    var map = new Map(ctx,"resources/textures/map/praca.png",-1200,-150,speed);
    map.draw(-1200,-150);
    var player = new Player(ctx,"Dylan","resources/textures/player/male/player_male",0);
    player.draw("down");
    

    var kHandler = function(event){
        keyHandler(event,ctx,canvas,player,map);
    }

    window.addEventListener("keydown",kHandler);

   
}


function keyHandler(event,ctx,canvas,player,map){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch(event.code){
        case "KeyW":
            map.slide("up");
            player.walk("up");
            break;
        case "KeyA":
            map.slide("left");
            player.walk("left");
            break;
        case "KeyS":
            map.slide("down");
            player.walk("down");
            break;
        case "KeyD":
            map.slide("right");
            player.walk("right");
            break;
    }
}