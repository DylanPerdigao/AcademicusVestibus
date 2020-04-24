class Component {
    constructor(src, posX, posY) {
        this.src = src;
        this.posX = posX;
		this.posY = posY;
		if (this.src != null){
			this.img = new Image()
			this.img.src = this.src;
			var comp = this;
			var imgHandler = function(event){
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				ctx.drawImage(comp.img,0,0);
			}
			this.img.addEventListener("load", imgHandler);
		}
    }

    draw(ctx,x,y){
		if (this.src != null){
			ctx.drawImage(this.img,x,y)
		}
    } 
}

