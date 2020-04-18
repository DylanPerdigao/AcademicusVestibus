//Snake

class Snake{
    constructor(color){
        this.x=0;
        this.y=0;
        this.xspeed=1;
        this.yspeed=0;
        this.color=color;
    }

    update(){
        this.x+=this.xspeed;
        this.y+=this.yspeed;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 10, 10);
    }
}