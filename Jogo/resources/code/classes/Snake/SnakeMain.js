"use strict";

(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var mainWindow;
    var cell=Math.floor(Math.min(canvas.height,canvas.width)/30);
    
    //colors
    const colors=[["#625772", "#a9eee6", "#fefaec", "#f9a1bc"], ["#743c08", "#df760b", "#ffebaf", "#f6b61e"], ["#142850", "#00909e", "#dae1e7", "#27496d"], ["#222831", "#f2a365", "#ececec", "#30475e"]]
    
    var menu;
    var level;

    //message
    var me=this;
    function msgHandler(ev) {
        me.mainWindow = messageHandler(ev);
    }
    //listener
        
    window.addEventListener("message",msgHandler);
    
    
    function messageHandler(ev){
        return ev.source;
    }
    


    var MouseUpColorHandler = function (ev){
        for (var i=0;i<menu.imgs.length;i++){
            if (menu.imgs[i].mouseOver(ev)){
                canvas.removeEventListener("mouseup", MouseUpColorHandler);
                new SnakeGame(level,colors[i], cell, ctx, me.mainWindow)
            }
        }
        
    }

    var MouseUpLevelHandler = function (ev){
        for (var i=0;i<menu.imgs.length;i++){
            if (menu.imgs[i].mouseOver(ev)){
                canvas.removeEventListener("mouseup", MouseUpLevelHandler);
                level=i;
                new SnakeMenus(ctx, cell, imgColorl0, imgColorl1 ,imgColorl2, imgColorl3);
                canvas.addEventListener("mouseup",MouseUpColorHandler);
                
            }
        }
        
    }

    var imgLoaded = 0;
    function imgLoadedHandler(ev) {
        imgLoaded++;
        if (imgLoaded == 8) {
            menu = new SnakeMenus(ctx, cell, imgLevel0, imgLevel1 ,imgLevel2, imgLevel3);
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



