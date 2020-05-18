class MiniGameTrigger extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src, obj.posX, obj.posY,obj.speed,obj.hitboxWidth,obj.hitboxHeight);
		}else{
			super(src, posX, posY,speed, hitboxWidth, hitboxHeight);
		}
		this.hitboxColor = "blue";
	}
	
    action(ctx) {
		ctx.clearRect(0,0,ctx.canvas.width,ctx,canvas.height);
	}
}

