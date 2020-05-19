class Trigger extends Structure {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src, obj.posX, obj.posY,obj.speed,obj.hitboxWidth,obj.hitboxHeight);
		}else{
			super(src, posX, posY,speed, hitboxWidth, hitboxHeight);
		}
		this.hitboxColor = "white"
	}
	action(ctx,game,direction,map) {
		return null;
	}
	interaction(ctx,game){
		return null;
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
        ctx.strokeStyle = this.hitboxColor;
        ctx.rect(x,y,w,h); 
        ctx.stroke();
    }


}

