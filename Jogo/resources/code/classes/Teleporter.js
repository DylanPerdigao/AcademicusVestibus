class Teleporter extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight);
		this.location=location;
		this.localX=localX;
		this.localY=localY;
		this.direction=direction;
		this.hitboxColor = "orange";
	}
    action(ctx,game,map) {
		game.map = map;
		game.map.updatePosition(this.localX,this.localY);//this.localX+game.map.posX-game.player.posX,this.localY+game.map.posY-game.player.posY);
		game.map.setStructuresPositions();
		var invertedDir = game.invertDirection(this.direction);
		game.updatePosition(ctx,invertedDir);
		game.updatePosition(ctx,this.direction);
		return game;
	}
}

