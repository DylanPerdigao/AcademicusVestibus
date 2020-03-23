class Map extends Component{
	constructor(ctx,src, posX, posY,speed){
		super(ctx,src, posX, posY,speed);
	} 

	slide(direction){
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
		this.draw(this.posX,this.posY)
	}


}

