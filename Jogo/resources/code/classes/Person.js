class Person extends Trigger {
    constructor(src, posX, posY,speed, hitboxWidth, hitboxHeight,text) {
		super(src, posX, posY,speed, hitboxWidth, hitboxHeight);
		this.text=text;
	}
	/**
	 * Draws the shadow under the person
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {number} radius shadow's radius
	 */
	drawShadow(ctx,radius){
		ctx.fillStyle = "rgba(0,0,0,0.4)";
		ctx.beginPath();
		ctx.arc(this.posX+this.sprite[0].width/2,this.posY+this.sprite[0].height-2,radius, 0, 2*Math.PI);
		ctx.fill();
	}
	/**
	 * Write the text of the Person in a dialog box
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Game} game This game
	 */
    action(ctx,dialog) {
		dialog.write(ctx,this.text);
    }
}

