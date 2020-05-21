class MiniMap extends Component {
    constructor(src, posX, posY) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src,obj.posX,obj.posY);
		}else{
			super(src, posX, posY);
		}
	}

	showMap(ctx,player,location){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(this.img,0,0,ctx.canvas.width,ctx.canvas.height);
		var x,y;
		switch (location){
			case HOME:
				x=ctx.canvas.width * 0.55;
				y=ctx.canvas.height * 0.45;
				break;
			case PRACA_REPUBLICA:
				x=ctx.canvas.width * 0.32;
				y=ctx.canvas.height * 0.18;
				break;
			case UNIVERSITY:
				x=ctx.canvas.width * 0.25;
				y=ctx.canvas.height * 0.25;
				break;
		}
		ctx.fillStyle = "#860DFF"
		ctx.beginPath();
		ctx.arc(Math.floor(x)+player.sprite[0].width/2,Math.floor(y)+player.sprite[0].height/2, 10, 0, 2 * Math.PI);
		ctx.fill();
		ctx.drawImage(player.sprite[0],Math.floor(x),Math.floor(y));
	}

	exitMap(ctx,game){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		game.draw(ctx,game.player.orientation);
	}
}

