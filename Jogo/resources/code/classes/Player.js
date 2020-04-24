class Player{
	constructor(src,name,x,y,step,hitboxHeight){
		this.src=src;
		this.name=name;
		this.step=step;
		//load das imagens todas
		this.sprite=new Array() 
		var player = this;
		var imgHandler = function(event){
			var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			for(let i=0;i<player.sprite.length;i++){
				ctx.drawImage(player.sprite[i],0,0);
			}
		}
		for(let i=0;i<16;i++){
			this.sprite.push(new Image())
			this.sprite[i].src = this.src + i + ".png";
			this.sprite[i].addEventListener("load", imgHandler);
		}
		//ajuste da posiçao final
		this.posX = x-(this.sprite[0].width/2);
		this.posY = y-(this.sprite[0].height/2);
		//hitbox
		this.hitboxHeight=hitboxHeight;
	} 

	resetPosition(x,y){
		this.posX = x-(this.sprite[0].width/2);
		this.posY = y-(this.sprite[0].height/2);
	}
	
	draw(ctx,orientation){
		var i = this.step;
		switch(orientation){
			case "down":
				i+=0
				break;
			case "left":
				i+=4
				break;
			case "right":
				i+=8
				break;
			case "up":
				i+=12
				break;
		}
		ctx.drawImage(this.sprite[i],this.posX,this.posY);
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
		return ([this.posX,this.posY+this.sprite[0].height-this.hitboxHeight,this.sprite[0].width,this.hitboxHeight]);
	}
}

