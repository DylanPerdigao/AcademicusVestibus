class Money extends Component {
    constructor(src, posX, posY,width,height, value,isHidden) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src,obj.posX,obj.posY);
			this.width=obj.width;
			this.height=obj.height;
			this.value = obj.value;
			this.isHidden=obj.isHidden;
		}else{
			super(src, posX, posY);
			this.width=width;
			this.height=height;
			this.value = value;
			this.isHidden=isHidden;
		}
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
	removeMoney(n) {
		this.value-=n;
        return this.value;
    }
}

