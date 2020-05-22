class Structure extends Element {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,initialX,initialY) {
		super(src, posX, posY,speed); 
		if(initialX == undefined && initialY == undefined){
			this.initialX = posX;
			this.initialY = posY; 
		}else{
			this.initialX = initialX;
			this.initialY = initialY; 
		}
        this.hitboxWidth=hitboxWidth;
        this.hitboxHeight=hitboxHeight;
		this.type = this.constructor.name;
    }
    
	action(ctx,game,direction,map){
		return null;
    }
    
	interaction(ctx,game){
		return null;
    }
    
    /**
     * Draw a red rectangle where is the Structure's hitbox
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
     * Check if the Player's hitbox has an intersection with the Structure's hitbox
     * @param {Player} player user player
     * @returns {boolean} state of the intersection
     */
    checkIntersection(player){
        var dim = this.getDimensions();
        var dimPlayer = player.getDimensions();
        var x = dim[0];
        var y = dim[1];
        var w = dim[2];
        var h = dim[3];
        var xPlayer = dimPlayer[0];
        var yPlayer = dimPlayer[1];
        var wPlayer = dimPlayer[2];
        var hPlayer = dimPlayer[3];
        if(((x <= xPlayer) && (x+w >= xPlayer+wPlayer) && (y <= yPlayer) && (y+h >= yPlayer+hPlayer)) || ((xPlayer <= x) && (xPlayer+wPlayer >= x+w) && (yPlayer <= y) && (yPlayer+hPlayer >= y+h))){ //Inclusion
			return true;
		}else if(x <= xPlayer+wPlayer && xPlayer <= x+w && y <= yPlayer+hPlayer && yPlayer <= y+h){ //Intersection
			return true;
		}else{
			return false;
		}
    }
    /**
     * Check if the Player is behind the Structure
     * @param {Player} player user player
     * @returns {boolean} state of the position
     */
    isBehind(player){
        var dim = this.getDimensions();
        var dimPlayer = player.getDimensions();
        var y = dim[1];
        var yPlayer = dimPlayer[1];
        if(y<=yPlayer){
            return true;
        }else{
            return false;
        }
    }
    /**
     * Gets the dimensions of the Structure hitbox
     * @returns {Array<number>} array with the coordinates of the left corner, width and height of the hitbox
     */
    getDimensions(){
		if (this.src != null){
			return ([this.posX,this.posY+this.img.height-this.hitboxHeight,this.img.width,this.hitboxHeight]);
		}else{
			return ([this.posX,this.posY,this.hitboxWidth,this.hitboxHeight]);
		}
	}

}

