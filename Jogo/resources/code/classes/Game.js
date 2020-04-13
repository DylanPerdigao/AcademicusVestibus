class Game {
    constructor(player,mapList,structuresList,money) {
		this.player=player;
		this.mapList=mapList;
		this.structuresList=structuresList;
		this.map = mapList[0];
		this.structures = structuresList[0]
		this.money=money;
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
 * @returns {Array} if the player has a collision with one of the structures and the structure with the player collided
 */
 	collisionSimulation(direction){
		var hasCollision;
		var k;
		var returnDirection;
		//simula a avancar na direcao desejada
		for(k=0;k<this.structures.length;k++){
			this.structures[k].move(direction);
			hasCollision=this.structures[k].checkIntersection(this.player);
			if(hasCollision){
				k++;//com o break o ciclo nao tem tempo de incrementar
				break;
			}
		}
		//recua os elementos que avancaram
		for(let i=0;i<k;i++){
			returnDirection = this.invertDirection(direction);
			this.structures[i].move(returnDirection);
		}
		if(hasCollision){
			return [hasCollision,this.structures[k-1]];
		}else{
			return [hasCollision,null];
		}
			
	}
/**
 * Updates the position of the elements verifying collisions with player, and if a structure is drawed before/after the player
 * @param {*} ctx canvas context
 * @param {string} direction direction of the player step
 */
 	updatePosition(ctx,direction){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var data = this.collisionSimulation(direction);
		var hasCollision = data[0];
		var structCollided = data[1];
		if(hasCollision==false){
			/*	CASO NAO HAJA COLISAO:
			 * 		-MOVE AS ESTRUTURAS 
			 *		-DESENHA AS ESTRUTURAS EM BACKGROUND
			 *		-MOVE O MAPA
			 *		-DESENHA O JOGADOR
			 *		-DESENHA AS ESTRUTURAS EM FOREGROUND
			 */
			this.move(ctx,direction)
		}else if (hasCollision==true && structCollided instanceof Trigger){
			/*	CASO HAJA COLISAO COM UM TRIGGER:
			 * 		-MOVE AS ESTRUTURAS 
			 *		-DESENHA AS ESTRUTURAS EM BACKGROUND
			 *		-MOVE O MAPA
			 *		-DESENHA O JOGADOR
			 *		-DESENHA AS ESTRUTURAS EM FOREGROUND
			 */
			this.move(ctx,direction);
			structCollided.action(ctx,this);
		}else{
			/*	CASO HAJA COLISAO:
			 * 		-DESNHA O MAPA
			 *		-DESENHA AS ESTRUTURAS EM BACKGROUND
			 *		-DESENHA O JOGADOR
			 *		-DESENHA AS ESTRUTURAS EM FOREGROUND
			 */
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

	move(ctx,direction){
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
	}
}

