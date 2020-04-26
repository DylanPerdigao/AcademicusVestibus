class Money extends Component {
    constructor(src, posX, posY,width,height, value,isHidden) {
		super(src, posX, posY);
		this.width=width;
		this.height=height;
		this.value = value;
		this.isHidden=isHidden;
    }
	draw(ctx){
		if (!this.isHidden){
			ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
			ctx.fillStyle = "#86592D";
			ctx.fillText(this.value,this.posX+15,this.posY+11, this.width-20);
		}
    } 
    addMoney(n) {
        this.value+=n;
        return this.value;
    }
}

