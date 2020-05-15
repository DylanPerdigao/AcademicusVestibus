"use strict";

const IMG_MATAMOSCAS = "../MataMoscas/resources/mataMoscas.png";
const IMG_BACKGROUND = "../MataMoscas/resources/background.png";
const IMG_MOSCA = "../MataMoscas/resources/mosca.png";
const WIDTH_BACKGROUND = 600;
const HEIGHT_BACKGROUND = 300;
const ALIVE_TIME = 3_000;
const GAME_TIME = 30_000;
const INITIAL_MESSAGE_MOSCAS = "Mate moscas para ganhar moedas!";

class GameMataMoscas {
    constructor(ctx, isActive) {
        if (isActive !== undefined) {
            this.isActive = isActive;
        } else {
            this.isActive = false;
        }
        this.replay_button = document.getElementById("play_again");
        this.exit_button = document.getElementById("exit");
        this.ctx = ctx;
        this.init();
        this.timestamp = 0;
        this.gameTime = GAME_TIME;
        this.gameOver = false;
        this.total_earned = 0;
    }

    init() {
        this.moscasMortas = 0;
        let nLoad = 0;
        this.moscas = [];
        var background = new Image();
        background.addEventListener("load", imgLoadedHandler);
        background.src = IMG_BACKGROUND;

        this.imgMosca = new Image();
        this.imgMosca.addEventListener("load", imgLoadedHandler);
        this.imgMosca.src = IMG_MOSCA;

        this.imgMataMoscas = new Image();
        this.imgMataMoscas.src = IMG_MATAMOSCAS;
        this.imgMataMoscas.addEventListener("load", imgLoadedHandler);


        //this.mataMoscas = new SpriteImage(, )
        this.numMoscasIni = Math.floor(Math.random() * 5 + 1);

        this.title = INITIAL_MESSAGE_MOSCAS;

        let me = this;

        function imgLoadedHandler(ev) {
            nLoad++;
            if (nLoad === 3) {
                me.background = new SpriteImage(0, 50, WIDTH_BACKGROUND, HEIGHT_BACKGROUND, background);
                me.mataMoscas = new MatadorMoscas(300, 250, 40, 85, me.imgMataMoscas);
                for (let i = 0; i < me.numMoscasIni; i++) {
                    me.moscas[i] = new Mosca(Math.round(Math.random() * (600 - 40)), Math.round(Math.random() * (300 - 40)) + 50, 40, 40, me.imgMosca);
                }
            }
        }

        this.MouseMoveHandler = function (ev) {
            if(!me.mataMoscas) return;
            if (!(ev.offsetX < me.mataMoscas.width / 2 || ev.offsetY > 350 - me.mataMoscas.height / 4 || ev.offsetY < 50 + me.mataMoscas.height / 8 || ev.offsetX > 600 - me.mataMoscas.width / 2)) {
                me.mataMoscas.x = ev.offsetX - me.mataMoscas.width / 2;
                me.mataMoscas.y = ev.offsetY - me.mataMoscas.height / 8;
            }
        };

        this.clickHandler = function (ev) {
            if(me.gameOver) return;
            var i = 0;
            while (i < me.moscas.length) {
                if (me.mataMoscas.intersectPixels(me.moscas[i])) {
                    me.moscas.splice(i, 1);
                    me.moscasMortas++;
                    me.moscas.push(new Mosca(Math.round(Math.random() * (600 - 40)), Math.round(Math.random() * (300 - 40)) + 50, 40, 40, me.imgMosca));
                } else i++;
            }
        };
    }

    draw(ctx) {
        if (!this.isActive) return;
        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.title, 425, 25);
        this.ctx.fillText("Pontuação: " + this.moscasMortas, 350, 395);
        this.ctx.fillText("Tempo: " + (Math.abs(this.gameTime/1000)).toFixed(0), 350, 375);
        if(!this.mataMoscas) return;
        this.background.draw(ctx);
        for (let i = 0; i < this.moscas.length; i++) {
            this.moscas[i].draw(ctx);
        }
        if (this.mataMoscas)
            this.mataMoscas.draw(ctx);
    }

    activate() {
        this.gameOver = true;
        this.reset();
        this.isActive = true;
        this.ctx.canvas.addEventListener("mousemove", this.MouseMoveHandler);
        this.ctx.canvas.addEventListener("click", this.clickHandler);
        let me = this;
        this.replay_button.onclick = function (ev) {
            me.reset()
        };
        this.exit_button.onclick = function (ev) {
            me.deactivate()
        };
        this.ctx.canvas.style.cursor = "none";
    }

    deactivate(){// closes game and returns coins earned
        this.isActive = false;
        this.ctx.canvas.removeEventListener("mousemove", this.MouseMoveHandler);
        this.ctx.canvas.removeEventListener("click", this.clickHandler);
        this.replay_button.onclick = null;
        this.exit_button.onclick = null;
        this.ctx.canvas.style.cursor = "initial";
        return this.moscasMortas + this.total_earned;
    }

    update(time){
        if(this.gameTime > 0){
            this.gameTime = this.gameTime - (time - this.timestamp);
            for(let i = 0; i < this.moscas.length; i++){
                this.moscas[i].alive_time -= (time - this.timestamp);
                if(this.moscas[i].alive_time < 0){
                    this.moscas.splice(i, 1);
                    this.moscas.push(new Mosca(Math.round(Math.random() * (600 - 40)), Math.round(Math.random() * (300 - 40)) + 50, 40, 40, this.imgMosca));
                }
            }
        }else{
            this.gameOver = true;
        }
        this.timestamp = time;
    }

    reset(){
        if(!this.gameOver) return;
        this.total_earned += this.moscasMortas;
        this.gameTime = GAME_TIME;
        this.moscasMortas = 0;
        this.gameOver = false;
    }
}