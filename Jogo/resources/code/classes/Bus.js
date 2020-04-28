class Bus extends Teleporter {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
        super(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction);
    }
    action(ctx,dialog,money) {
		if(money>=BUS_COST){
			dialog.writeInfo(ctx,["APANHAR","AUTOCARRO"]);
		}else{
			dialog.writeInfo(ctx,["DINHEIRO","INSUFICIENTE"]);
		}
    }
}

