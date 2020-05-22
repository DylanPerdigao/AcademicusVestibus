class Trigger extends Structure {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,initialX,initialY) {
        super(src, posX, posY,speed, hitboxWidth, hitboxHeight,initialX,initialY);
		this.hitboxColor = "white"
	}
	action() {}
	interaction(){}
	/**
     * Draw an orange rectangle where is the Trigger's hitbox
	 * @param {CanvasRenderingContext2D} ctx canvas context
     */
    drawHitbox(ctx){
        var dim = this.getDimensions();
        var x = dim[0];
        var y = dim[1];
        var w = dim[2];
        var h = dim[3];
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = this.hitboxColor;
        ctx.rect(x,y,w,h); 
        ctx.stroke();
    }


}

