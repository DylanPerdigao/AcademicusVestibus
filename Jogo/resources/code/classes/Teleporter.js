class Teleporter extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction,initialX,initialY) {
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight,initialX,initialY);
		this.location=location;
		this.localX=localX;
		this.localY=localY;
		this.direction=direction;
		this.hitboxColor = "orange";
	}
	interaction(){}
	/**
	 * Calls teleport function
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {*} game game structure
	 * @param {*} map map where the player is teleported
	 */
    action(ctx,game,_,map) {
		return this.teleport(ctx,game,map);
	}
	/**
	 * Teleports the player to the selected map
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {*} game game structure
	 * @param {*} map map where the player is teleported
	 */
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

