//Wall

class Wall{
    constructor(x, y, width, height, color){
        this.color=color;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    insideWall(x,y){
        console.log(x,y);
        if (this.x<=x && x<this.x+this.width && this.y<=y && y<this.y+this.height){
            console.log(this.x,this.x+this.width)
            console.log(this.y,this.y+this.height)
            return true;
        }
        return false;
    }
}