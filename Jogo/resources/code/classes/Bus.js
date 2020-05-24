class Bus extends Teleporter {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction,initialX,initialY) {
		super(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction,initialX,initialY);
	}
	/**
	 * Shows a dialog box with some informations for the player (if the player has enough money or not)
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {*} dialog dialog box
	 * @param {*} money money structure
	 */
	inform(ctx,dialog,money){
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		if(money.value>=BUS_COST){
			dialog.writeInfo(ctx,lang.informations[1]);
		}else{
			dialog.writeInfo(ctx,lang.informations[2]);
		}
	}
	/**
	 * It allows the player to walk in the bus trigger area and shows the dialog box with some information
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {*} game game structure
	 * @param {String} direction directions the player's facing
	 * @param {Number} numCollisions numbers of collisions the player has
	 */
    action(ctx,game,direction,_,numCollisions) {
		var dialog = game.dialog;
		var money = game.money;
		if(numCollisions<=1){
			game.move(ctx,direction)
		}else{
			game.draw(ctx);
		}
		this.inform(ctx,dialog,money)
	}
	/**
	 * Teleport if the player has enough money
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {*} game game structure
	 */
	interaction(ctx,game){
		var money = game.money;
		var dialog = game.dialog;
		if(money.value>=BUS_COST){
			money.addMoney(-BUS_COST, ctx);
			this.teleport(ctx,game,game.mapList[this.location]);
		}else{
			this.inform(ctx,dialog,money);
		}	
	}
}

