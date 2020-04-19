//Snake

class Snake{
    constructor(color, cell){

        this.xspeed=1;
        this.yspeed=0;

        this.color=color;
        this.cell=cell;
        this.body=[[cell,15*cell]]   //head,body1,body2....
    }

    update(ctx, fruitPos, backgroundColor, interval , walls, mainWindow){     //return True if eated a fruit

        var out=true;

        var x=this.body[0][0]+this.xspeed*this.cell;
        var y=this.body[0][1]+this.yspeed*this.cell;

        //check Wall colision
        if (insideWalls(x,y,walls) || this.insideSnake(x,y)){
            console.log('E MOREU');
            window.clearInterval(interval);
            mainWindow.postMessage("arcade",'*');
            return
        }

        
        
        //Increase 1 size
        this.body.unshift([x,y]);
        this.drawCell(ctx,x,y,this.color);

        //if didn´t ate
        if (!(this.body[0][0]==fruitPos[0] && this.body[0][1]==fruitPos[1])){
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
        ctx.strokeRect(x, y, this.cell, this.cell);
    }

    changeDir(xspeed,yspeed){
        this.xspeed=xspeed;
        this.yspeed=yspeed;
    }

    insideSnake(x,y){
        for (let i=0;i<this.body.length;i++){
            if (x==this.body[i][0] && y==this.body[i][1]){
                return true;
            }
        }
        return false;
    }
}