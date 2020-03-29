class Player{
	constructor(src,name,x,y,step,hitboxHeight){
		this.src=src;
		this.name=name;
		this.step=step;
		//load das imagens todas
		this.sprite=new Image()
		for(let i=0;i<4;i++){
			this.sprite.src=this.src+"_"+"up"+i+".png";
			this.sprite.src=this.src+"_"+"left"+i+".png";
			this.sprite.src=this.src+"_"+"right"+i+".png";
			this.sprite.src=this.src+"_"+"down"+i+".png";
		}
		//ajuste da posiçao final
		this.posX = x-(this.sprite.width/2);
		this.posY = y-(this.sprite.height/2);
		//hitbox
		this.hitboxHeight=hitboxHeight;
	} 

	draw(ctx,orientation){
		this.sprite.src = this.src+"_"+orientation+this.step+".png";
		ctx.drawImage(this.sprite,this.posX,this.posY);
	}
	walk(ctx,orientation){
		if (this.step>=3){
			this.step=0;
		}else{
			this.step++;
		}
		this.draw(ctx,orientation);
	}

	drawHitbox(ctx){
        var dim = this.getDimensions();
        var x = dim[0];
        var y = dim[1];
        var w = dim[2];
        var h = dim[3];
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(x,y,w,h); 
        ctx.stroke();
	}
	
	getDimensions(){
		return ([this.posX,this.posY+this.sprite.height-this.hitboxHeight,this.sprite.width,this.hitboxHeight]);
	}
}

