class Element extends Component {
    constructor(src, posX, posY,speed) {
        super(src, posX, posY);
        this.speed = speed;
    }

    slide(ctx,direction){
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
		this.draw(ctx,this.posX,this.posY)
    }

}

