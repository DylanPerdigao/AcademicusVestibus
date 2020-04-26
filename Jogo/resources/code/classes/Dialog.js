class Dialog extends Component {
    constructor(src, posX, posY,width,height) {
		super(src, posX, posY);
		this.width=width;
		this.height=height;
		this.enabled=false;
    }
	/**
	 * Write text in a dialog box
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Array<string>} text array of text, organized by lines
	 */
    write(ctx,text) {
		ctx.drawImage(this.img, this.posX,this.posY,this.width,this.height);
		ctx.fillStyle = "#86592D";
		ctx.font = "10px Arial";
		for(let i=0; i<text.length;i++){
			ctx.fillText(text[i],this.posX+8,this.posY+10*(i+1),this.width-16);
		}
    }
}

