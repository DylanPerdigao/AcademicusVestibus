"use strict";


function snake_fill_main(snake) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var cell=Math.floor(Math.min(canvas.height,canvas.width)/30);
    
    //colors
    const colors=[["#625772", "#a9eee6", "#fefaec", "#f9a1bc"], ["#743c08", "#df760b", "#ffebaf", "#f6b61e"], ["#142850", "#00909e", "#dae1e7", "#27496d"], ["#222831", "#f2a365", "#ececec", "#30475e"]]
    
    var menu;
    var level;
    var mainWindow;

    //message
    function msgHandler(ev) {
        mainWindow = messageHandler(ev);
    }
    //listener
        
    window.addEventListener("message",msgHandler);
    
    
    function messageHandler(ev){
        return ev.source;
    }
    

    function drawLevel(ctx,backgroundColor,wallColor,cell,level){
        //Background
        ctx.fillStyle = backgroundColor;
        ctx.strokeStyle= backgroundColor;
        ctx.fillRect(0, 0, 30*cell, 30*cell);
        var walls = [], wall;
        switch(level){
            case 4:
                //extras

            case 3:
                //resto 

                //top
                wall = new Wall(5*cell,4*cell,20*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(11*cell,10*cell,8*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //bot
                wall = new Wall(11*cell,19*cell,8*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(5*cell,25*cell,20*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

            case 2:
                //sides

                //left
                wall = new Wall(3*cell,8*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(4*cell,11*cell,cell,8*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(3*cell,19*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //right
                wall = new Wall(26*cell,8*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(25*cell,11*cell,cell,8*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                wall = new Wall(26*cell,19*cell,cell,3*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

            case 1:
                //mid top bot
                //top
                wall = new Wall(8*cell,7*cell,14*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //bot
                wall = new Wall(8*cell,22*cell,14*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                

            case 0:
                //caixa
                //left
                wall = new Wall(0,0,cell,30*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                //right
                wall = new Wall(29*cell,0,cell,30*cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //bot
                wall = new Wall(0,29*cell,30*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);

                //top
                wall = new Wall(0,0,30*cell,cell,wallColor);
                wall.draw(ctx);
                walls.push(wall);
                
                break;

        }
        return walls;
    }

    var MouseUpColorHandler = function (ev){
        for (var i=0;i<menu.imgs.length;i++){
            if (menu.imgs[i].mouseOver(ev)){
                canvas.removeEventListener("mouseup", MouseUpColorHandler);
                if (snake){
                    new SnakeGame(level,colors[i], cell, ctx,drawLevel(ctx,colors[i][2],colors[i][0],cell,level), mainWindow);
                }
                else{
                    new FillGame(level,colors[i], cell, ctx,drawLevel(ctx,colors[i][2],colors[i][0],cell,level), mainWindow);
                }
            }

        }
        
    }

    var MouseUpLevelHandler = function (ev){
        for (var i=0;i<menu.imgs.length;i++){
            if (menu.imgs[i].mouseOver(ev)){
                canvas.removeEventListener("mouseup", MouseUpLevelHandler);
                level=i;
                new SnakeFillMenus(ctx, cell, imgColorl0, imgColorl1 ,imgColorl2, imgColorl3);
                canvas.addEventListener("mouseup",MouseUpColorHandler);
                
            }
        }
        
    }

    var imgLoaded = 0;
    function imgLoadedHandler(ev) {
        imgLoaded++;
        if (imgLoaded == 8) {
            menu = new SnakeFillMenus(ctx, cell, imgLevel0, imgLevel1 ,imgLevel2, imgLevel3);
            canvas.addEventListener("mouseup",MouseUpLevelHandler);
        }
    }


    var imgLevel0 = new Image();
    imgLevel0.addEventListener("load", imgLoadedHandler);
    imgLevel0.src = "Level0.png";

    var imgLevel1 = new Image();
    imgLevel1.addEventListener("load", imgLoadedHandler);
    imgLevel1.src = "Level1.png";

    var imgLevel2 = new Image();
    imgLevel2.addEventListener("load", imgLoadedHandler);
    imgLevel2.src = "Level2.png";

    var imgLevel3 = new Image();
    imgLevel3.addEventListener("load", imgLoadedHandler);
    imgLevel3.src = "Level3.png";

    var imgColorl0 = new Image();
    imgColorl0.addEventListener("load", imgLoadedHandler);
    imgColorl0.src = "color0.png";

    var imgColorl1 = new Image();
    imgColorl1.addEventListener("load", imgLoadedHandler);
    imgColorl1.src = "color1.png";

    var imgColorl2 = new Image();
    imgColorl2.addEventListener("load", imgLoadedHandler);
    imgColorl2.src = "color2.png";

    var imgColorl3 = new Image();
    imgColorl3.addEventListener("load", imgLoadedHandler);
    imgColorl3.src = "color3.png";
    
}



