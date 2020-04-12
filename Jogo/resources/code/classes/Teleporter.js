class Teleporter extends Trigger {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,map,structs,localX,localY,direction) {
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight);
		this.map=map;
		this.structs=structs;
		this.localX=localX;
		this.localY=localY;
		this.direction=direction;
    }
    action(ctx,game) {
		game.map = new Element(this.map.src,this.localX,this.localY,this.map.speed);
		game.structures = this.structs;
		for(let i=0;i<this.structs.length;i++){
			game.structures[i].updatePosition(this.localX+game.structures[i].posX-game.player.posX,this.localY+game.structures[i].posY-game.player.posY);
		}
		var invertedDir = game.invertDirection(this.direction);
		game.updatePosition(ctx,invertedDir);
		game.updatePosition(ctx,this.direction);
		return game;
	}

}

