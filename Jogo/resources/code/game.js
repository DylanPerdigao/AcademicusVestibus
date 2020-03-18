"use strict";
(function(){window.addEventListener("load", main);}());

//FUNCTIONS
function main()
{   
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    var map = new Image();
    map.src = "../textures/map/praca.png";

    var player = new Player("Dylan","../textures/player/male/player_male","up",2);

    ctx.drawImage(map,-1200,-150);
    player.orientUp(ctx);
}
