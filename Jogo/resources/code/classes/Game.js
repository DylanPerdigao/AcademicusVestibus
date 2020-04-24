class Game {
    constructor(player,mapList,money,miniMap) {
		this.player=player;
		this.mapList=mapList;
		this.map = mapList[0];
		this.money=money;
		this.miniMap=miniMap;
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
		for(k=0;k<this.map.structures.length;k++){
			this.map.structures[k].move(direction);
			hasCollision=this.map.structures[k].checkIntersection(this.player);
			if(hasCollision){
				k++;//com o break o ciclo nao tem tempo de incrementar
				break;
			}
		}
		//recua os elementos que avancaram
		for(let i=0;i<k;i++){
			returnDirection = this.invertDirection(direction);
			this.map.structures[i].move(returnDirection);
		}
		if(hasCollision){
			return [hasCollision,this.map.structures[k-1]];
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
			switch (structCollided.location){
				case HOME:
					structCollided.action(ctx,this,this.mapList[HOME]);
					break;
				case PRACA_REPUBLICA:
					structCollided.action(ctx,this,this.mapList[PRACA_REPUBLICA]);
					break;
				case UNIVERSITY:
					structCollided.action(ctx,this,this.mapList[UNIVERSITY]);
					break;
			}
		}else{
			/*	CASO HAJA COLISAO:
			 * 		-DESNHA O MAPA
			 *		-DESENHA AS ESTRUTURAS EM BACKGROUND
			 *		-DESENHA O JOGADOR
			 *		-DESENHA AS ESTRUTURAS EM FOREGROUND
			 */
			this.map.draw(ctx,this.map.posX,this.map.posY);
			for(let i=0;i<this.map.structures.length;i++){
				if(this.map.structures[i].isBehind(this.player)){
					this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
				}
			}
			this.player.walk(ctx,direction);
			for(let i=0;i<this.map.structures.length;i++){
				if(!this.map.structures[i].isBehind(this.player)){
					this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
				}
			}
		}
	}

	move(ctx,direction){
		for(let i=0;i<this.map.structures.length;i++){
			this.map.structures[i].move(direction);
		}
		this.map.slide(ctx,direction);
		for(let i=0;i<this.map.structures.length;i++){
			if(this.map.structures[i].isBehind(this.player)){
				this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
			}
		}
		this.player.walk(ctx,direction);
		for(let i=0;i<this.map.structures.length;i++){
			if(!this.map.structures[i].isBehind(this.player)){
				this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
			}
		}
	}
}

