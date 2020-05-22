class Element extends Component {
    constructor(src, posX, posY,speed) {
        super(src, posX, posY);
        this.speed = speed;
    }
	/**
	 * Updates the position of the element in the canvas
	 * @param {Number} x position x in canvas
	 * @param {Number} y position y in canvas
	 */
	updatePosition(x,y){
		this.posX=x;
		this.posY=y;
	}
	/**
	 * Moves elements to make the illusion that the player is moving
	 * @param {String} direction where the elements goes
	 */
	move(direction){
		switch(direction){
			case "up":
				this.posY+=speed;
				break;
			case "left":
				this.posX+=speed;
				break;
			case "down":
				this.posY-=speed;
				break;
			case "right":
				this.posX-=speed;
				break;
		}
	}
	/**
	 * Moves and draws the element
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {String} direction 
	 */
    slide(ctx,direction){
		this.move(direction);
		this.draw(ctx,this.posX,this.posY)
    }

}

