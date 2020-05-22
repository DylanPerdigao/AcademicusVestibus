class Person extends Trigger {
    constructor(src, posX, posY,speed, hitboxWidth, hitboxHeight,textID,initialX,initialY) {
		
		super(src, posX, posY,speed, hitboxWidth, hitboxHeight,initialX,initialY);
		this.textID=textID;
	}
	/**
	 * Draws the shadow under the person
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {number} radius shadow's radius
	 */
	drawShadow(ctx,radius){
		ctx.fillStyle = "rgba(0,0,0,0.4)";
		ctx.beginPath();
		ctx.arc(this.posX+this.img.width/2,this.posY+this.img.height-2,radius, 0, 2*Math.PI);
		ctx.fill();
	}
	/**
	 * Write the text of the Person in a dialog box
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Game} game This game
	 */
    speak(ctx,dialog,name,money) {
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		if(this.textID==129){
			if(money.value<BUS_COST){
				dialog.writeSpeak(ctx,lang.people[this.textID+1],name);
				return BUS_COST;
			}
				
			dialog.writeSpeak(ctx,lang.people[this.textID],name);
			return 0;

		}else{
			dialog.writeSpeak(ctx,lang.people[this.textID]);
			return 0;
		}
    }

    action(ctx,game,direction,map) {
		var dialog = game.dialog;
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		dialog.writeInfo(ctx,lang.informations[0]);
	}

	interaction(ctx,game){
		var dialog = game.dialog;
		var name = game.player.name;
		var money = game.money;
		var n = this.speak(ctx,dialog,name,money);
		money.addMoney(n);
	}
}

