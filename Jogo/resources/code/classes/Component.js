class Component {
    constructor(src, posX, posY) {
        this.src = src;
        this.posX = posX;
        this.posY = posY;
        this.img = new Image()
        this.img.src = this.src;
        
    }

    draw(ctx,x,y){
      ctx.drawImage(this.img,x,y)
    }
    
}

