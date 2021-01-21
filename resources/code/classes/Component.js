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
				ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			}
			this.img.addEventListener("load", imgHandler);
		}
    }
	drawShadow(){}
	/**
	 * Draw the component and his shadow if it has one
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Number} x position x in canvas
	 * @param {Number} y position y in canvas
	 */
    draw(ctx,x,y){
		if (this.src != null){
			this.drawShadow(ctx,this.hitboxHeight-1);
			ctx.drawImage(this.img,x,y)
		}
    } 
}

