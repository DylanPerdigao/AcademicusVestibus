class Bus extends Teleporter {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
		
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction);
		
	}
	inform(ctx,dialog,money){
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		if(money.value>=BUS_COST){
			dialog.writeInfo(ctx,lang.informations[1]);
		}else{
			dialog.writeInfo(ctx,lang.informations[2]);
		}
	}
    action(ctx,game,direction,map,numCollisions) {
		var dialog = game.dialog;
		var money = game.money;
		if(numCollisions<=1){
			game.move(ctx,direction)
		}else{
			game.draw(ctx);
		}
		this.inform(ctx,dialog,money)
	}
	interaction(ctx,game){
		var money = game.money;
		var dialog = game.dialog;
		if(money.value>BUS_COST){
			money.removeMoney(BUS_COST);
			this.teleport(ctx,game,game.mapList[this.location]);
		}else{
			this.inform(ctx,dialog,money);
		}	
	}
}

