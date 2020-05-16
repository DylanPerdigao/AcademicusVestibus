"use strict";

const IMG_PORTA_ABERTA = "../Mnty_Hall/resources/porta_aberta.png";
const IMG_PORTA_FECHADA = "../Mnty_Hall/resources/porta_fechada.png";
const IMG_MONEY = "../Mnty_Hall/resources/money.png";

class mhPorta extends SpriteImage{
    constructor(x, y, w, h, isWinner) {
        var PortaFechada = new Image();
        PortaFechada.src = IMG_PORTA_FECHADA;
        super(x, y, w, h, PortaFechada);
        this.money = new Image();
        this.money.src = IMG_MONEY
        this.isWinner = isWinner;
        this.isOpen = false;
    }

    open(){
        this.isOpen = true;
        this.img.src = IMG_PORTA_ABERTA;
    }

    reset(){
        this.isOpen = false;
        this.img.src = IMG_PORTA_FECHADA;
    }

    draw(ctx) {
        super.draw(ctx);
        if(this.isWinner && this.isOpen){

            ctx.drawImage(this.money, this.x, this.y + this.height/2, this.width/2, this.height/2);
        }
    }
}