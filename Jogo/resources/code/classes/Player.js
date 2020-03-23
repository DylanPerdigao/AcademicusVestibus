class Player{
	constructor(ctx,name,src,step){
		this.ctx=ctx;
		this.name=name;
		this.src=src;
		this.step=step;
	} 

	moveUp(elementArray){
		for(var i=0;i<elementArray.length;i++){
			elementArray[i].posX++;
		}
	}
	moveDown(elementArray){
		for(var i=0;i<elementArray.length;i++){
			elementArray[i].posX--;
		}
	}
	moveLeft(elementArray){
		for(var i=0;i<elementArray.length;i++){
			elementArray[i].posY++;
		}
	}
	moveRight(elementArray){
		for(var i=0;i<elementArray.length;i++){
			elementArray[i].posY--;
		}
	}
	walk(orientation){
		var sprite = new Image();
		var canvas = document.getElementById("canvas");
		var ctxPosX = (canvas.width/2)-(sprite.width/2);
		var ctxPosY = (canvas.height/2)-(sprite.height/2);
		if (this.step>=3){
			this.step=0;
		}else{
			this.step++;
		}
		sprite.src = this.src+"_"+orientation+this.step+".png";
		this.ctx.drawImage(sprite,ctxPosX,ctxPosY);
	}
}

