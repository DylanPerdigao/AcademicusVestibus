class Bus extends Teleporter {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
        super(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction);
    }
    action(ctx,game,map) {
		game.dialog.write(ctx,["Carregue em ENTER/SPACE para apanhar o","Autocarro"])
		return game;
    }
}

