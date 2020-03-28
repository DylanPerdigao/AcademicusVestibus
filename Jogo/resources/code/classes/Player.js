class Player{
	constructor(src,name,x,y,step){
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
}

