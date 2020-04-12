class Trigger extends Structure {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight) {
        super(src, posX, posY,speed,hitboxWidth,hitboxHeight);
	}
	
	/**
     * Draw an orange rectangle where is the Trigger's hitbox
     * @param {*} ctx canvas context
     */
    drawHitbox(ctx){
        var dim = this.getDimensions();
        var x = dim[0];
        var y = dim[1];
        var w = dim[2];
        var h = dim[3];
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "orange";
        ctx.rect(x,y,w,h); 
        ctx.stroke();
    }
    action() {}

}

