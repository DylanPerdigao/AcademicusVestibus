//Snake

class Snake{
    constructor(color, cell){

        this.xspeed=1;
        this.yspeed=0;

        this.color=color;
        this.cell=cell;
        this.body=[[100,100]]   //head,body1,body2....
    }

    update(ctx, fruitPos, backgroundColor){     //return True if eated a fruit

        var out=true;

        var x=this.body[0][0]+this.xspeed*this.cell;
        var y=this.body[0][1]+this.yspeed*this.cell;

        //check Wall colision
        if (x==0 || x==600-this.cell || y==0 || y==600-this.cell){
            console.log('E MOREU');
        }

        
        
        //Increase 1 size
        this.body.unshift([x,y]);
        this.drawCell(ctx,x,y,this.color);

        if (!this.checkFruit(fruitPos)){
            //remove tail
            var tail = this.body.pop();
            this.drawCell(ctx,tail[0],tail[1],backgroundColor);
            out=false;
        }
        
        return out;
    }

    drawCell(ctx,x,y,color){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.cell, this.cell);
    }

    removeTail

    changeDir(xspeed,yspeed){
        this.xspeed=xspeed;
        this.yspeed=yspeed;
    }

    checkFruit(fruitPos){
        if (this.body[0][0]==fruitPos[0] && this.body[0][1]==fruitPos[1]){
            return true;
        }
        
        return false;
    }
}