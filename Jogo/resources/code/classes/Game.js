class Game {
    constructor(player,map,structures) {
		this.player=player;
		this.map=map;
		this.structures=structures
    }


	showMap(ctx,map){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(map,0,0,ctx.canvas.width,ctx.canvas.height);
	}

	exitMap(ctx){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.updatePosition(ctx,"up");
		this.updatePosition(ctx,"down")
	}
/**
 * Invert the direction specified
 * @param {string} direction 
 * @returns {string} oposite direction of the specified string
 */
	invertDirection(direction){
		var returnDirection;
			switch(direction){
				case "up":
					returnDirection="down";
					break;
				case "left":
					returnDirection="right";
					break;
				case "down":
					returnDirection="up";
					break;
				case "right":
					returnDirection="left";
					break;
			}
		return returnDirection;
	}
/**
 * Make a simulation of advance one step in the specified direction
 * @param {string} direction direction of the player step
 * @returns {boolean} if the player has a collision with one of the structures
 */
 	collisionSimulation(direction){
		var hasCollision;
		var structIndex;
		var returnDirection;
		//simula a avancar na direcao desejada
		for(structIndex=0;structIndex<this.structures.length;structIndex++){
			this.structures[structIndex].move(direction);
			hasCollision=this.structures[structIndex].checkIntersection(this.player);
			if(hasCollision){
				structIndex++;//com o break o ciclo nao tem tempo de incrementar
				break;
			}
		}
		//recua os elementos que avancaram
		for(let i=0;i<structIndex;i++){
			returnDirection = this.invertDirection(direction);
			this.structures[i].move(returnDirection);
		}
		return hasCollision;
	}
/**
 * Updates the position of the elements verifying collisions with player, and if a structure is drawed before/after the player
 * @param {*} ctx canvas context
 * @param {string} direction direction of the player step
 */
 	updatePosition(ctx,direction){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(this.collisionSimulation(direction)==false){
			for(let i=0;i<this.structures.length;i++){
				this.structures[i].move(direction);
			}
			this.map.slide(ctx,direction);
			for(let i=0;i<this.structures.length;i++){
				if(this.structures[i].isBehind(this.player)){
					this.structures[i].draw(ctx,this.structures[i].posX,this.structures[i].posY);
				}
			}
			this.player.walk(ctx,direction);
			for(let i=0;i<this.structures.length;i++){
				if(!this.structures[i].isBehind(this.player)){
					this.structures[i].draw(ctx,this.structures[i].posX,this.structures[i].posY);
				}
			}
		}else{
			this.map.draw(ctx,this.map.posX,this.map.posY);
			for(let i=0;i<this.structures.length;i++){
				if(this.structures[i].isBehind(this.player)){
					this.structures[i].draw(ctx,this.structures[i].posX,this.structures[i].posY);
				}
			}
			this.player.walk(ctx,direction);
			for(let i=0;i<this.structures.length;i++){
				if(!this.structures[i].isBehind(this.player)){
					this.structures[i].draw(ctx,this.structures[i].posX,this.structures[i].posY);
				}
			}
		}
	}
}

