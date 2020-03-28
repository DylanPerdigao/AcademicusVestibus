"use strict";
(function(){window.addEventListener("load", main);}());
const speed = 5;
const path = "resources/textures/";
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
    var player = new Player(path+"player/male/player_male","Dylan",canvas.width/2,canvas.height/2,0);
    //MAP
    var map = new Element(path+"map/praca.png",player.posX,player.posY,speed);
    var structures = new Array(
        //LIXO FORA DA PRACA
        new Structure(path+'structures/trash.png',map.posX-(0),map.posY-(-155),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-145),map.posY-(-155),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-335),map.posY-(-155),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-440),map.posY-(-155),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-710),map.posY-(-155),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-800),map.posY-(-155),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-900),map.posY-(-155),10,10),
        //ARVORES
        new Structure(path+'structures/tree.png',map.posX-(0),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-125),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-250),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-375),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-500),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-625),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-255),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-375),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-750),map.posY-(-485),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-625),map.posY-(-485),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-500),map.posY-(-485),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-375),map.posY-(-485),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-250),map.posY-(-485),10,10),
        new Structure(path+'structures/tree.png',map.posX-(-125),map.posY-(-485),10,10),
        new Structure(path+'structures/tree.png',map.posX-(0),map.posY-(-485),10,10),
        //BANCOS
        new Structure(path+'structures/bench_down.png',map.posX-(-45),map.posY-(-265),10,10), 
        new Structure(path+'structures/bench_down.png',map.posX-(-175),map.posY-(-265),10,10),
        new Structure(path+'structures/bench_down.png',map.posX-(-305),map.posY-(-265),10,10),
        new Structure(path+'structures/bench_down.png',map.posX-(-420),map.posY-(-265),10,10),
        new Structure(path+'structures/bench_down.png',map.posX-(-555),map.posY-(-265),10,10),
        new Structure(path+'structures/bench_down.png',map.posX-(-685),map.posY-(-265),10,10),
        new Structure(path+'structures/bench_left.png',map.posX-(-750),map.posY-(-300),10,10),
        new Structure(path+'structures/bench_left.png',map.posX-(-750),map.posY-(-420),10,10),
        //LIXO NO MEIO DA PRACA
        new Structure(path+'structures/trash.png',map.posX-(-80),map.posY-(-270),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-455),map.posY-(-270),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-670),map.posY-(-270),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-750),map.posY-(-345),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-750),map.posY-(-470),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-645),map.posY-(-500),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-520),map.posY-(-500),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-265),map.posY-(-500),10,10),
        new Structure(path+'structures/trash.png',map.posX-(-15),map.posY-(-500),10,10),
        //PARAGEM DE AUTOCARRO
        new Structure(path+'structures/busStop.png',map.posX-(-550),map.posY-(-160),10,10)
    );
    //LISTENERS
    var kHandler = function(event){
        keyHandler(event,canvas,ctx,player,map,structures);
    }
    window.addEventListener("keydown",kHandler);
    //INIT
    map.slide(ctx,"up");
    player.walk(ctx,"up");
    map.slide(ctx,"down");
    player.walk(ctx,"down");
}
 
function keyHandler(event,canvas,ctx,player,map,structs){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = map.posX-player.posX;
    y = map.posY-player.posY;
    document.getElementById("debug").style.color="red"
    document.getElementById("debug").innerHTML="X:"+ x+"\nY:"+y+"\nX:"
    switch(event.code){//ISTO TEM DE SER MUDADO, CASO O TECLADO SEJA DIFERENTE (AZERTY,QWERTZ), AS TECLAS NAO FAZEM SENTIDO
        case "KeyW":
            map.slide(ctx,"up");
            for(let i=0;i<structs.length;i++){
                structs[i].slide(ctx,"up");
            }
            player.walk(ctx,"up");
            break;
        case "KeyA":
            map.slide(ctx,"left");
            for(let i=0;i<structs.length;i++){
                structs[i].slide(ctx,"left");
            }
            player.walk(ctx,"left");
            break;
        case "KeyS":
            map.slide(ctx,"down");
            for(let i=0;i<structs.length;i++){
                structs[i].slide(ctx,"down");
            }
            player.walk(ctx,"down");
            break;
        case "KeyD":
            map.slide(ctx,"right");
            for(let i=0;i<structs.length;i++){
                structs[i].slide(ctx,"right");
            }
            player.walk(ctx,"right");
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
}