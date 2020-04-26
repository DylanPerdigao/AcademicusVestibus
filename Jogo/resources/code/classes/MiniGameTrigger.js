class MiniGameTrigger extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight) {
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight);
		this.hitboxColor = "blue";
	}
	
    action(ctx) {
		ctx.clearRect(0,0,ctx.canvas.width,ctx,canvas.height);
	}
}

