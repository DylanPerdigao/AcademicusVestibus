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
    const colors=[["#444554", "#F29559", "#C9C5BA", "#5A7D7C"], ["#260016", "#ed008c", "#daf3ec", "#00bff3"], ["#012824", "#ed008c", "#fcdeea", "#ff4d6d"], ["#08242b", "#fda000", "#ffffff", "#1d7c95"]]
    
    var menu;
    var level;


    var MouseUpColorHandler = function (ev){
        for (var i=0;i<menu.imgs.length;i++){
            if (menu.imgs[i].mouseOver(ev)){
                canvas.removeEventListener("mouseup", this);
                new SnakeGame(level,colors[i], cell, ctx)
            }
        }
        
    }

    var MouseUpLevelHandler = function (ev){
        for (var i=0;i<menu.imgs.length;i++){
            if (menu.imgs[i].mouseOver(ev)){
                canvas.removeEventListener("mouseup", this);
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



