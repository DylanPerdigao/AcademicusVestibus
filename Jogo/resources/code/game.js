"use strict";
(function(){window.addEventListener("load", main);}());
//GLOBAL VARIABLE HERE

//FUNCTIONS
function main()
{   
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    var map = new Image();
    map.src = "../textures/map/praca.png";

    ctx.drawImage(map,-1200,-150);
}
