//Snake

class Fill{
    constructor(color, cell){

        this.xspeed=1;
        this.yspeed=0;

        this.lastDir = [1,0];

        this.color=color;
        this.cell=cell;
        this.head=[14*cell,14*cell];
        this.last=[];
    }

    update(ctx, walls){


        var x=this.head[0]+this.xspeed*this.cell;
        var y=this.head[1]+this.yspeed*this.cell;

        this.lastDir=[this.xspeed,this.yspeed];

        //check Wall colision
        if (this.insideWalls(x,y,walls) || this.insideLast(x,y)){
            return true;
        }

        
        //Move
        this.last.push([x,y]);
        this.drawCell(ctx,x,y,this.color);

        
        this.head=[x,y];
        
        return false;
    }

    drawCell(ctx,x,y,color){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.cell, this.cell);
        ctx.strokeRect(x, y, this.cell, this.cell);
    }

    insideWalls(x,y, walls){
        for (let i = 0; i<walls.length;i++){
            if (walls[i].insideWall(x,y)){
                return true;
            }
        }
        return false;
    }

    changeDir(xspeed,yspeed){
        if (xspeed!= -this.lastDir[0] && yspeed!= -this.lastDir[1]){
            this.xspeed=xspeed;
            this.yspeed=yspeed;
        }
    }

    insideLast(x,y){
        for (let i=0;i<this.last.length;i++){
            if (x==this.last[i][0] && y==this.last[i][1]){
                return true;
            }
        }
        return false;
    }
}