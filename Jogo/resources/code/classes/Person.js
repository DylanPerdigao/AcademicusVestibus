class Person extends Trigger {
    constructor(src, posX, posY,speed, hitboxWidth, hitboxHeight,textID) {
		super(src, posX, posY,speed, hitboxWidth, hitboxHeight);
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
    speak(ctx,dialog) {
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		dialog.writeSpeak(ctx,lang.people[this.textID]);
    }

    action(ctx,dialog) {
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		dialog.writeInfo(ctx,lang.informations[0]);
	}
}

