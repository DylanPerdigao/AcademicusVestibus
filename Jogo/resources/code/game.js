"use strict";
(function(){window.addEventListener("load", main);}());

//FUNCTIONS
function main()
{   
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 250;
    
    var map = new Image();
    //map.src = "../textures/map/praca.png";
    map.src = "resources/textures/map/praca.png";

    //var player = new Player("Dylan","../textures/player/male/player_male","up",2);
    var player = new Player(ctx,"Dylan","resources/textures/player/male/player_male",0);
    ctx.drawImage(map,-1200,-150);

    var kHandler = function(event){
        keyHandler(event,ctx,canvas,player,map);
    }

    window.addEventListener("keydown",kHandler);

   
}


function keyHandler(event,ctx,canvas,player,map){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map,-1200,-150);
    switch(event.code){
        case "KeyW":
            player.walk("up");
            break;
        case "KeyA":
            player.walk("left");
            break;
        case "KeyS":
            player.walk("down");
            break;
        case "KeyD":
            player.walk("right");
            break;
        

    }
}