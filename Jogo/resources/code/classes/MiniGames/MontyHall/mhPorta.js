"use strict";

class mhPorta extends SpriteImage{
    constructor(x, y, w, h, imgPortaAberta, imgPortaFechada, imgMoney) {
        super(x, y, w, h, imgPortaFechada);
        this.imgPortaAberta = imgPortaAberta;
        this.imgPortaFechada = imgPortaFechada;
        this.imgMoney = imgMoney;
        this.isWinner = false;
        this.isOpen = false;
    }

    open(ctx){
        this.isOpen = true;
        super.img= this.imgPortaAberta;
        super.clear(ctx);
        this.draw(ctx);
    }

    reset(ctx){
        this.isOpen = false;
        super.img = this.imgPortaFechada;
        super.clear(ctx);
        this.draw(ctx);
    }

    draw(ctx) {
        super.draw(ctx);
        if(this.isWinner && this.isOpen){
            ctx.drawImage(this.imgMoney, this.x, this.y + this.height/2, this.width/2, this.height/2);
        }
    }
}