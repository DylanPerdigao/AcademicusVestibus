class Element extends Component {
    constructor(src, posX, posY,speed) {
        super(src, posX, posY);
        this.speed = speed;
    }

	updatePosition(x,y){
		this.posX=x;
		this.posY=y;
	}

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

    slide(ctx,direction){
		this.move(direction);
		this.draw(ctx,this.posX,this.posY)
    }

}

