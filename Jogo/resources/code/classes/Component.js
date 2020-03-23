class Component {
    constructor(ctx,src, posX, posY,speed) {
        this.ctx = ctx;
        this.src = src;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
    }

    draw(x,y){
		var image = new Image();
		image.src = this.src;
		this.ctx.drawImage(image,x,y)
	}
}

