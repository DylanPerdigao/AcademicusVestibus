"use strict";

class mhPorta extends SpriteImage{
    constructor(x, y, w, h, isWinner) {
        var PortaFechada = new Image();
        PortaFechada.src = "resources/porta_fechada.png";
        super(x, y, w, h, PortaFechada);
        this.isWinner = isWinner;
        this.isOpen = false;
    }

    open(){
        this.isOpen = true;
        this.img.src = "resources/porta_aberta.png";
    }

    draw(ctx) {
        super.draw(ctx);
        if(this.isWinner && this.isOpen){
            var money = new Image();
            money.src = "resources/money.png";
            ctx.drawImage(money, this.x, this.y + this.height/2, this.width/2, this.height/2);
        }
    }
}