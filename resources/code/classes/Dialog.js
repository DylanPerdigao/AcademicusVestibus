class Dialog extends Component {
    constructor(src, posX, posY,width,height) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src,obj.posX,obj.posY);
			this.width=obj.width;
			this.height=obj.height;
			this.enabled=obj.enabled;
		}else{
			super(src, posX, posY);
			this.width=width;
			this.height=height;
			this.enabled=false;
		}
	}
	/**
	 * Sets the size of the box for speaking
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Array<String>} text array of text, organized by lines
	 * @param {String} name player name
	 */
	writeSpeak(ctx,text,name){
		this.posX=10;
		this.posY=ctx.canvas.height-35;
		this.width=ctx.canvas.width-20;
		this.height=25;
		this.write(ctx,text,name)
	}
	/**
	 * Sets the size of the box for showing a command.
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Array<String>} text array of text, organized by lines
	 */
	writeInfo(ctx,text){
		this.posX=ctx.canvas.width-70;
		this.posY=ctx.canvas.height-35;
		this.width=60;
		this.height=25;
		this.write(ctx,text)
	}
	/**
	 * Write text in a dialog box, if the array of text has two elements it put each element in a line
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {Array<String>} text array of text, organized by lines
	 * @param {String} name player name
	 */
    write(ctx,text,name) {
		ctx.drawImage(this.img, this.posX,this.posY,this.width,this.height);
		ctx.fillStyle = "#86592D";
		ctx.font = "10px Arial";
		if(text.length == 1){
			ctx.fillText(text[0],this.posX+8,this.posY+15,this.width-16);
		}else{
			for(let i=0; i<text.length;i++){
				if (i==0 && name != undefined){
					ctx.fillText(name+text[i],this.posX+8,this.posY+10*(i+1),this.width-16);
				}else{
					ctx.fillText(text[i],this.posX+8,this.posY+10*(i+1),this.width-16);
				}
			}
		}
    }
}

