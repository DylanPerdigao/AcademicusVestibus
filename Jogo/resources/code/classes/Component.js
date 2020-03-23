class Component {
    constructor(ctx,src, posX, posY) {
        this.ctx = ctx;
        this.src = src;
        this.posX = posX;
        this.posY = posY;
    }

    draw(x,y){
		var image = new Image();
		image.src = this.src;
		this.ctx.drawImage(image,x,y)
    }
    
}

