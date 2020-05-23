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
	/**
	 * Shows the label where zhr money is displayed
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
	draw(ctx){
		if (!this.isHidden){
			ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
			ctx.fillStyle = "#86592D";
			ctx.fillText(this.value,this.posX+15,this.posY+11, this.width-20);
		}
	} 
	/**
	 * Adds money
	 * @param {Number} n 
	 * @returns the value after adicioned
	 */
    addMoney(n, ctx) {
		this.value+=n;
		this.draw(ctx);
        return this.value;
	}
	
	getMoney(){
        return this.value;
	}
}

