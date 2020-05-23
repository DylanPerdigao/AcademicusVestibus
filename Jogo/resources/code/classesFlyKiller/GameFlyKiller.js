"use strict";

class GameFlyKiller {
    constructor(ctx, canvas, mainWindow, arcade) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.isActive=false;
        this.init();
        this.timestamp = 0;
        this.gameTime = 30_000;

        //game over
        this.go = new ExitMinigame(mainWindow, arcade, canvas, this.ctx);
    }

    init() {
        this.moscasMortas = 0;
        let nLoad = 0;
		this.moscas = [];
		var path = "../../textures/";
        var background = new Image();
        background.addEventListener("load", imgLoadedHandler);
        background.src = path+"misc/background.png";

        this.imgMosca = new Image();
        this.imgMosca.addEventListener("load", imgLoadedHandler);
        this.imgMosca.src = path+"misc/mosca.png";

        this.imgMataMoscas = new Image();
        this.imgMataMoscas.src = path+"misc/mataMoscas.png";
        this.imgMataMoscas.addEventListener("load", imgLoadedHandler);

        this.imgMataMoscasAnim = new Image();
        this.imgMataMoscasAnim.src = path+"misc/mataMoscas_pressed.png";
        this.imgMataMoscasAnim.addEventListener("load", imgLoadedHandler);


        //this.mataMoscas = new SpriteImage(, )
        this.numMoscasIni = Math.floor(Math.random() * 5 + 1);
        let me = this;
        function imgLoadedHandler(ev) {
            nLoad++;
            if (nLoad === 4) {
                me.background = new SpriteImage(0, 50, me.canvas.width, me.canvas.height, background);
                me.mataMoscas = new FlyKiller(300, 250, 40, 85, me.imgMataMoscas, false, me.imgMataMoscasAnim);
                for (let i = 0; i < me.numMoscasIni; i++) {
                    me.moscas[i] =new Fly(Math.round(Math.random() * (me.canvas.width - 40 - 2*MOVEMENT_RADIUS)) + MOVEMENT_RADIUS, Math.round(Math.random() * (me.canvas.height - 40  - 2*MOVEMENT_RADIUS)) + 50 + MOVEMENT_RADIUS, 40, 40, me.imgMosca, 3_000);
                }
                me.start()
            }
        }

        this.MouseMoveHandler = function (ev) {
            if(!me.mataMoscas) return;
            if (!(ev.offsetX < me.mataMoscas.width / 2 || ev.offsetY > 350 - me.mataMoscas.height / 4 || ev.offsetY < 50 + me.mataMoscas.height / 8 || ev.offsetX > 600 - me.mataMoscas.width / 2)) {
                me.mataMoscas.x = ev.offsetX - me.mataMoscas.width / 2;
                me.mataMoscas.y = ev.offsetY - me.mataMoscas.height / 8;
            }
        };

        this.MouseHandler = function (ev) {
            me.mataMoscas.animation();
        };

        this.clickHandler = function (ev) {
            var i = 0;
            while (i < me.moscas.length) {
                if (me.mataMoscas.intersectPixels(me.moscas[i])) {
                    me.moscas.splice(i, 1);
                    me.moscasMortas++;
                    me.moscas.push(new Fly(Math.round(Math.random() * (me.canvas.width - 40 - 2*MOVEMENT_RADIUS)) + MOVEMENT_RADIUS, Math.round(Math.random() * (me.canvas.height - 40  - 2*MOVEMENT_RADIUS)) + 50 + MOVEMENT_RADIUS, 40, 40, me.imgMosca, 3_000));
                } else i++;
            }
        };
    }

    draw(ctx) {
		if (!this.isActive) return;
		var lang = JSON.parse(window.localStorage.getItem("lang"));
       	//this.ctx.font = "16px Comic Sans MS";
        //this.ctx.fillStyle = "red";
		//this.ctx.textAlign = "right";
		document.getElementById("goal").innerHTML=lang.minigame.flyKiller[0];
		document.getElementById("score").innerHTML=lang.minigame.flyKiller[1]+ this.moscasMortas;
		document.getElementById("time").innerHTML=lang.minigame.flyKiller[2]+(Math.abs(this.gameTime/1000)).toFixed(0);
        //this.ctx.fillText(lang.minigame.flyKiller[0], 425, 25);
        //this.ctx.fillText(lang.minigame.flyKiller[1] + this.moscasMortas, 350, 395);
        //this.ctx.fillText(lang.minigame.flyKiller[2] + (Math.abs(this.gameTime/1000)).toFixed(0), 350, 375);
        if(!this.mataMoscas) return;
        this.background.draw(ctx);
        for (let i = 0; i < this.moscas.length; i++) {
            this.moscas[i].draw(ctx);
        }
        if (this.mataMoscas)
            this.mataMoscas.draw(ctx);
    }

    start() {
        this.moscasMortas = 0;
        this.isActive = true;
        this.ctx.canvas.addEventListener("mousemove", this.MouseMoveHandler);
        this.ctx.canvas.addEventListener("click", this.clickHandler);
        this.ctx.canvas.addEventListener("mousedown", this.MouseHandler);
        this.ctx.canvas.addEventListener("mouseup", this.MouseHandler);
        
        this.ctx.canvas.style.cursor = "none";
    }

    update(time){
        if(this.gameTime > 0){
            this.gameTime = this.gameTime - (time - this.timestamp);
            for(let i = 0; i < this.moscas.length; i++){
                let time_diff = time - this.timestamp;
                this.moscas[i].update(time_diff);
                if(this.moscas[i].alive_time < 0){
                    this.moscas.splice(i, 1);
                    this.moscas.push(new Fly(Math.round(Math.random() * (this.canvas.width - 40 - 2*MOVEMENT_RADIUS)) + MOVEMENT_RADIUS, Math.round(Math.random() * (this.canvas.height - 40  - 2*MOVEMENT_RADIUS)) + 50 + MOVEMENT_RADIUS, 40, 40, this.imgMosca, 3_000));
                }
            }
        }else{
            //Game Over
            this.gameOver(Math.round(this.moscasMortas/5));
            return false;
        }
        this.timestamp = time;
        return true;
    }
	/**
	 * Returns difference between wins and losses after closing the game
	 * @param {*} coins 
	 */
    gameOver(coins){
        this.ctx.canvas.removeEventListener("mousemove", this.MouseMoveHandler);
        this.ctx.canvas.removeEventListener("click", this.clickHandler);
        this.ctx.canvas.style.cursor = "initial";

        //GAME OVER
        this.go.gameOver(coins);
    
    }

}