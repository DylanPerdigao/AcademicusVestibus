class Teleporter extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
		
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight);
		this.location=location;
		this.localX=localX;
		this.localY=localY;
		this.direction=direction;
		
		this.hitboxColor = "orange";
	}

    action(ctx,game,direction,map) {
		return this.teleport(ctx,game,map);
	}

	interaction(ctx,game){
		return null;
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

