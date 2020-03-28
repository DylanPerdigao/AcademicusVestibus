class Structure extends Element {
    constructor(src, posX, posY,width, height,speed) {
        super(src, posX, posY, width, height,speed);    
    }

    drawHitbox(ctx){
        this.ctx.draw(ctx,this.posX,this.posY);
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(this.posX, this.posY, this.img.width, this.img.height*25/100); 
        ctx.stroke();
    }

}

