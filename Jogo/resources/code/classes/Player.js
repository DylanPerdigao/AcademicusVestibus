class Player{
	constructor(name,src,orientation,step){
		this.name=name;
		this.src=src;
		this.orientation=orientation;
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
	orientUp(ctx){
		var sprite = new Image();
		sprite.src = this.src+"_"+this.orientation+".png";
		var ctxPosX = (ctx.width/2)-(sprite.width/2);
		var ctxPosY = (ctx.height/2)-(sprite.height/2);
		ctx.drawImage(sprite,ctxPosX,ctxPosY);
	} 
	orientDown(ctx,){
		var sprite = new Image();
		sprite.src = src+"_down.png";
		var ctxPosX = (ctx.width/2)-(sprite.width/2);
		var ctxPosY = (ctx.height/2)-(sprite.height/2);
		ctx.drawImage(sprite,ctxPosX,ctxPosY);
	} 
	orientLeft(ctx){
		var sprite = new Image();
		sprite.src = src+"_left.png";
		var ctxPosX = (ctx.width/2)-(sprite.width/2);
		var ctxPosY = (ctx.height/2)-(sprite.height/2);
		ctx.drawImage(sprite,ctxPosX,ctxPosY);
	} 
	orientRight(ctx){
		var sprite = new Image();
		sprite.src = src+"_right.png";
		var ctxPosX = (ctx.width/2)-(sprite.width/2);
		var ctxPosY = (ctx.height/2)-(sprite.height/2);
		ctx.drawImage(sprite,ctxPosX,ctxPosY);
	}
}

