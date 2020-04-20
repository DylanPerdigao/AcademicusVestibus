"use strict";

const IMG_MATAMOSCAS = "resources/mataMoscas.png";
const IMG_BACKGROUND = "resources/background.png";
const WIDTH_BACKGROUND = 600;
const HEIGHT_BACKGROUND = 300;

class MataMoscas {
    constructor(ctx, isActive) {
        if (isActive !== undefined) {
            this.isActive = isActive;
        } else {
            this.isActive = false;
        }
        this.ctx = ctx;
        this.init();
        this.timestamp = 0;
        this.gameTime = 30_000;
    }

    init() {
        this.moscasMortas = 0;
        let nLoad = 0;
        this.moscas = [];
        var background = new Image();
        background.src = IMG_BACKGROUND;
        this.background = new SpriteImage(0, 50, WIDTH_BACKGROUND, HEIGHT_BACKGROUND, background, false);

        this.imgMosca = new Image();
        this.imgMosca.addEventListener("load", imgLoadedHandler);
        this.imgMosca.src = "resources/mosca.png"; //TODO

        this.imgMataMoscas = new Image();
        this.imgMataMoscas.src = IMG_MATAMOSCAS;
        this.imgMataMoscas.addEventListener("load", imgLoadedHandler);


        //this.mataMoscas = new SpriteImage(, )
        this.numMoscasIni = Math.floor(Math.random() * 5 + 1);

        this.title = "Mate moscas para ganhar moedas!";

        let me = this;

        function imgLoadedHandler(ev) {
            nLoad++;
            if (nLoad === 2) {
                me.mataMoscas = new MatadorMoscas(300, 250, 40, 85, me.imgMataMoscas, true);
                for (let i = 0; i < me.numMoscasIni; i++) {
                    me.moscas[i] = new SpriteImage(Math.round(Math.random() * (600 - 40)), Math.round(Math.random() * (300 - 40)) + 50, 40, 40, me.imgMosca, false);
                }
            }
        }
    }

    draw(ctx) {
        if (!this.isActive) return;
        this.ctx.font = "16px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.title, 425, 25);
        this.ctx.fillText("Pontuação: " + this.moscasMortas, 350, 395);
        this.ctx.fillText("Tempo: " + (this.gameTime/1000).toFixed(0), 350, 375);
        this.background.draw(ctx);
        for (let i = 0; i < this.moscas.length; i++) {
            this.moscas[i].draw(ctx);
        }
        if (this.mataMoscas)
            this.mataMoscas.draw(ctx);
    }

    activate() {
        this.isActive = true;
        let me = this;
        var MouseMoveHandler = function (ev) {
            if (!(ev.offsetX < me.mataMoscas.width / 2 || ev.offsetY > 350 - me.mataMoscas.height / 4 || ev.offsetY < 50 + me.mataMoscas.height / 8 || ev.offsetX > 600 - me.mataMoscas.width / 2)) {
                me.mataMoscas.x = ev.offsetX - me.mataMoscas.width / 2;
                me.mataMoscas.y = ev.offsetY - me.mataMoscas.height / 8;
            }
        };
        this.ctx.canvas.addEventListener("mousemove", MouseMoveHandler);

        var clickHandler = function (ev) {
            var i = 0;
            while (i < me.moscas.length) {
                if (me.mataMoscas.intersectPixels(me.moscas[i])) {
                    me.moscas.splice(i, 1);
                    me.moscasMortas++;
                    me.moscas.push(new SpriteImage(Math.round(Math.random() * (600 - 40)), Math.round(Math.random() * (300 - 40)) + 50, 40, 40, me.imgMosca, false));
                } else i++;
            }
        };

        this.ctx.canvas.addEventListener("click", clickHandler);
    }

    update(time){
        this.gameTime = this.gameTime - (time - this.timestamp);
        this.timestamp = time;

    }
}