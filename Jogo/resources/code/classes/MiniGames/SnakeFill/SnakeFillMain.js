"use strict";


class SnakeFillMain {
    constructor(snake){
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.cell=Math.floor(Math.min(canvas.height,canvas.width)/30);
        
        //colors
        this.colors=[["#625772", "#a9eee6", "#fefaec", "#f9a1bc"], ["#743c08", "#df760b", "#ffebaf", "#f6b61e"], ["#142850", "#00909e", "#dae1e7", "#27496d"], ["#222831", "#f2a365", "#ececec", "#30475e"]]
        
        this.menu;
        this.level;
        this.mainWindow;
        this.arcade;

        
        //message
        var me=this

        function msgHandler(ev) {
            var args=messageHandler(ev);
            me.mainWindow =args[0];
            me.arcade =args[1];
        }

        function messageHandler(ev){
            var arcade;
            if (ev.data=='arcade'){
                arcade=true;
            }
            else{
                arcade = false;
            }
            return [ev.source,arcade];
        }

        //listener
        window.addEventListener("message",msgHandler);
        
        var MouseUpColorHandler = function (ev){
            for (var i=0;i<me.menu.imgs.length;i++){
                if (me.menu.imgs[i].mouseOver(ev)){
                    me.canvas.removeEventListener("mouseup", MouseUpColorHandler);
                    if (snake){
                        new SnakeGame(me.level,me.colors[i], me.cell, me.ctx, me.canvas, me.drawLevel(me.ctx,me.colors[i][2],me.colors[i][0],me.cell,me.level), me.mainWindow, me.arcade);
                    }
                    else{
                        new FillGame(me.level,me.colors[i], me.cell, me.ctx, me.canvas, me.drawLevel(me.ctx,me.colors[i][2],me.colors[i][0],me.cell,me.level), me.mainWindow, me.arcade);
                    }
                }
    
            }
            
        }
    
        var MouseUpLevelHandler = function (ev){
            for (var i=0;i<me.menu.imgs.length;i++){
                if (me.menu.imgs[i].mouseOver(ev)){
                    me.canvas.removeEventListener("mouseup", MouseUpLevelHandler);
                    me.level=i;
                    new SnakeFillMenus(me.ctx, me.cell, me.imgColorl0, me.imgColorl1 ,me.imgColorl2, me.imgColorl3);
                    me.canvas.addEventListener("mouseup",MouseUpColorHandler);
                    
                }
            }
            
        }
    

        this.imgLevel0 = new Image();
        this.imgLevel0.addEventListener("load", imgLoadedHandler);
        this.imgLevel0.src = "../Resources/Level0.png";
    
        this.imgLevel1 = new Image();
        this.imgLevel1.addEventListener("load", imgLoadedHandler);
        this.imgLevel1.src = "../Resources/Level1.png";
    
        this.imgLevel2 = new Image();
        this.imgLevel2.addEventListener("load", imgLoadedHandler);
        this.imgLevel2.src = "../Resources/Level2.png";
    
        this.imgLevel3 = new Image();
        this.imgLevel3.addEventListener("load", imgLoadedHandler);
        this.imgLevel3.src = "../Resources/Level3.png";
    

        this.imgColorl0 = new Image();
        this.imgColorl0.addEventListener("load", imgLoadedHandler);
        this.imgColorl0.src = "../Resources/color0.png";
    
        this.imgColorl1 = new Image();
        this.imgColorl1.addEventListener("load", imgLoadedHandler);
        this.imgColorl1.src = "../Resources/color1.png";
    
        this.imgColorl2 = new Image();
        this.imgColorl2.addEventListener("load", imgLoadedHandler);
        this.imgColorl2.src = "../Resources/color2.png";
    
        this.imgColorl3 = new Image();
        this.imgColorl3.addEventListener("load", imgLoadedHandler);
        this.imgColorl3.src = "../Resources/color3.png";

        this.imgLoaded = 0;
        function imgLoadedHandler(ev) {
            me.imgLoaded++;
            if (me.imgLoaded == 8) {
                me.menu = new SnakeFillMenus(me.ctx, me.cell, me.imgLevel0, me.imgLevel1, me.imgLevel2, me.imgLevel3);
                me.canvas.addEventListener("mouseup",MouseUpLevelHandler);
            }
        }
    }

    drawLevel(ctx,backgroundColor,wallColor,cell,level){
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
    
}



