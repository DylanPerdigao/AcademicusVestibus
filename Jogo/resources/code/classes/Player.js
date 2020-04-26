class Player{
	constructor(src,name,x,y,hitboxHeight){
		this.src=src;
		this.name=name;
		this.step=0;
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
	/**
	 * Sets the position of the player in the canvas
	 * @param {number} x coordinate "x"
	 * @param {number} y coordinate "y"
	 */
	setPosition(x,y){
		this.posX = x-(this.sprite[0].width/2);
		this.posY = y-(this.sprite[0].height/2);
	}
	/**
	 * Draws the player choosing the sprite with the right step and rigth orientation
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} orientation where the player is facing
	 */
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
		this.drawShadow(ctx,this.hitboxHeight-1)
		ctx.drawImage(this.sprite[i],this.posX,this.posY);
	}
	/**
	 * Updates the step of the player and draw it
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} orientation where the player is facing
	 */
	walk(ctx,orientation){
		if (this.step>=3){
			this.step=0;
		}else{
			this.step++;
		}
		this.draw(ctx,orientation);
	}
	/**
	 * Draws player's shadow
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {number} radius shadow's radius
	 */
	drawShadow(ctx,radius){
		ctx.fillStyle = "rgba(0,0,0,0.4)";
		ctx.beginPath();
		ctx.arc(this.posX+this.sprite[0].width/2,this.posY+this.sprite[0].height-2,radius, 0, 2*Math.PI);
		ctx.fill();
	}
	/**
	 * Draws player's hitbox in red
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
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
	/**
	 * Gets player's dimensions
	 * @returns {Array<number>} Positions x/y and width/heigth
	 */
	getDimensions(){
		return ([this.posX+2,this.posY+this.sprite[0].height-this.hitboxHeight,this.sprite[0].width-4,this.hitboxHeight]);
	}
}

