class Structure extends Element {
    constructor(src, posX, posY,speed,hitboxHeight) {
        super(src, posX, posY,speed);   
        this.hitboxHeight=hitboxHeight;
    }

    drawHitbox(ctx){
        var dim = this.getDimensions();
        var x = dim[0];
        var y = dim[1];
        var w = dim[2];
        var h = dim[3];
        this.draw(ctx,this.posX,this.posY);
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(x,y,w,h); 
        ctx.stroke();
    }

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

    isBehind(player){
        var dim = this.getDimensions();
        var dimPlayer = player.getDimensions();
        var x = dim[0];
        var xPlayer = dimPlayer[0];
        if(x<xPlayer){
            return true;
        }else{
            return false;
        }
    }

    getDimensions(){
		return ([this.posX,this.posY+this.img.height-this.hitboxHeight,this.img.width,this.hitboxHeight]);
	}

}

