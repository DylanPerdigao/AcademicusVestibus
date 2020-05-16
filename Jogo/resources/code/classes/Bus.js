class Bus extends Teleporter {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
        super(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction);
    }
    action(ctx,dialog,money) {
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		if(money>=BUS_COST){
			dialog.writeInfo(ctx,lang.informations[1]);
		}else{
			dialog.writeInfo(ctx,lang.informations[2]);
		}
    }
}

