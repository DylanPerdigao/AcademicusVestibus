class Money extends Component {
    constructor(src, posX, posY, value,isHidden) {
        super(src, posX, posY);
		this.value = value;
		this.isHidden=isHidden;
    }
	draw(ctx){
		if (!this.isHidden){
			ctx.drawImage(this.img,this.posX,this.posY)
			ctx.font = "10px EvilEmpire";
			ctx.fillStyle = "#86592D";
			ctx.fillText(this.value,this.posX+15,this.posY+11);
		}
    } 
    addMoney(n) {
        this.value+=n;
        return this.value;
    }
}

