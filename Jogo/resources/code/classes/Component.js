class Component {
    constructor(src, posX, posY) {
        this.src = src;
        this.posX = posX;
		this.posY = posY;
		if (this.src != null){
			this.img = new Image()
			this.img.src = this.src;
		}
    }

    draw(ctx,x,y){
		if (this.src != null){
			ctx.drawImage(this.img,x,y)
		}
    } 
}

