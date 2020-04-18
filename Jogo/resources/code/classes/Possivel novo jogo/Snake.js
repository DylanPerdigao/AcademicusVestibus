//Snake

class Snake{
    constructor(color, cell){
        this.x=0;
        this.y=100;
        this.xspeed=1;
        this.yspeed=0;
        this.color=color;
        this.cell=cell;
    }

    update(){
        this.x+=this.xspeed*this.cell;
        this.y+=this.yspeed*this.cell;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.cell, this.cell);
    }

    changeDir(xspeed,yspeed){
        this.xspeed=xspeed;
        this.yspeed=yspeed;
    }
}