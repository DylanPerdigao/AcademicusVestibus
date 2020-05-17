class Teleporter extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src, obj.posX, obj.posY,obj.speed,obj.hitboxWidth,obj.hitboxHeight);
			this.location=obj.location;
			this.localX=obj.localX;
			this.localY=obj.localY;
			this.direction=obj.direction;
		}else{
			super(src, posX, posY,speed,hitboxWidth,hitboxHeight);
			this.location=location;
			this.localX=localX;
			this.localY=localY;
			this.direction=direction;
		}
		this.hitboxColor = "orange";
	}
    action(ctx,game,map) {
		return this.teleport(ctx,game,map) ;
	}

	teleport(ctx,game,map) {
		game.loadingAnimation(ctx,this.direction,map)
		game.map = map;
		game.map.updatePosition(this.localX,this.localY);
		game.map.setStructuresPositions();
		game.player.orientation=this.direction;
		game.draw(ctx);
		return game;
	}
}

