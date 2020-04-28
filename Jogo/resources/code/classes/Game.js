class Game {
    constructor(ctx,player,mapList,money,miniMap,dialog) {
		this.player=player;
		this.mapList=mapList;
		this.map = mapList[0];
		this.money=money;
		this.miniMap=miniMap;
		this.dialog = dialog;
		this.busStructCollided=null;
		this.canInteract=false;
		this.isShowingMap=false;
		this.isAnimated=false;
		this.isDebugging=false;
		this.yDebug = 0;
		this.yDebug = 0;
		this.window = window;
		//AJUSTES
		this.map.updatePosition(player.posX-635,player.posY-160);
		this.map.setStructuresPositions();
		this.loadingAnimation(ctx,"down",null); // ativa também o listener das teclas
		//LISTENER
		var game=this;
		this.kHandler = function(event){
			game.keyHandler(event,ctx);
		}
	}	
	/**
	 * Handles key press detection
	 * @param {Event} event event who's called the function
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */	
	keyHandler(event,ctx){
		if (this.isShowingMap){
			switch(event.code){
				case "KeyM":
				case "Escape":
					this.isShowingMap=false;
					this.miniMap.exitMap(ctx,this);
					break;
			}
		}else{
			switch(event.code){
				case "KeyM":
					this.isShowingMap=true;
					this.miniMap.showMap(ctx,this.player,this.mapList.indexOf(this.map));
					break;
				case "Enter":
				case "Space":
					this.interaction(ctx);
					break;
				case "KeyW":
				case "ArrowUp":
					this.updatePosition(ctx,"up");
					break;
				case "KeyA":
				case "ArrowLeft":
					this.updatePosition(ctx,"left");
					break;
				case "KeyS":
				case "ArrowDown":
					this.updatePosition(ctx,"down");
					break;
				case "KeyD":
				case "ArrowRight":
					this.updatePosition(ctx,"right");
					break;
				case "Digit1":
					this.map.structures.push(new Person(PATH+'people/female1_0.png',this.map.posX-this.xDebug,this.map.posY-this.yDebug,10,HITBOX_PERSON,["Hey"]))
					console.log("new Person(PATH+'people/female1_0.png',"+ this.xDebug +","+ this.yDebug +",speed,null,HITBOX_PERSON),\n")
					break;	
			}		
		}
	}
	/**
	 * Shows debugging elements
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
	showDebug(ctx){
		if(this.isDebugging){
			this.xDebug = this.map.posX-this.player.posX;
			this.yDebug = this.map.posY-this.player.posY;
			document.getElementById("debug").style.color="red"
			document.getElementById("debug").innerHTML="X:"+this.xDebug+"\nY:"+this.yDebug+"\n"
			this.showHitboxes(ctx);
		}
	}
	/**
	 * Shows structure's hitboxes
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
	showHitboxes(ctx){
		for(let i=0;i<this.map.structures.length;i++){
			this.map.structures[i].drawHitbox(ctx);
		}
		this.player.drawHitbox(ctx);
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
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} direction direction of the player step
	 */
 	updatePosition(ctx,direction){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var data = this.collisionSimulation(direction);
		var hasCollision = data[0];
		var structCollided = data[1];
		this.player.orientation=direction;
		this.canInteract=false;
		if(hasCollision==false){
			this.busStructCollided=null;
			this.move(ctx,direction)
		}else if (hasCollision==true && structCollided instanceof Bus){
			this.move(ctx,direction)
			this.busStructCollided = structCollided;
			this.busStructCollided.action(ctx,this.dialog,this.money.value);
		}else if (hasCollision==true && structCollided instanceof Teleporter){
			structCollided.action(ctx,this,this.mapList[structCollided.location]);
		}else{
			this.draw(ctx);
			this.canInteract=true;
			if(this.busStructCollided){
				this.busStructCollided.action(ctx,this.dialog,this.money.value);
			}else{
				structCollided.action(ctx,this.dialog);
			}
		}
		this.money.draw(ctx);
	}
	/**
	 * Daws the map and structures in the specified direction
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */	
	draw(ctx){
		this.map.draw(ctx,this.map.posX,this.map.posY);
		for(let i=0;i<this.map.structures.length;i++){
			if(this.map.structures[i].isBehind(this.player)){
				this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
			}
		}
		this.player.draw(ctx);
		for(let i=0;i<this.map.structures.length;i++){
			if(!this.map.structures[i].isBehind(this.player)){
				this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
			}
		}
		if (!this.isAnimated){
			this.showDebug(ctx);
			this.money.draw(ctx);
		}	
	}
	/**
	 * Moves the map and structures in the specified direction
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} direction direction where the player is facing
	 */	
	move(ctx,direction){
		this.player.orientation=direction;
		for(let i=0;i<this.map.structures.length;i++){
			this.map.structures[i].move(direction);
		}
		this.map.slide(ctx,direction);
		for(let i=0;i<this.map.structures.length;i++){
			if(this.map.structures[i].isBehind(this.player)){
				this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
			}
		}
		this.player.walk(ctx);
		for(let i=0;i<this.map.structures.length;i++){
			if(!this.map.structures[i].isBehind(this.player)){
				this.map.structures[i].draw(ctx,this.map.structures[i].posX,this.map.structures[i].posY);
			}
		}
	}
	/**
	 * Execute the possible interactions
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */	
	interaction(ctx){
		if (this.busStructCollided){//SE ESTA NA PAREGEM DE AUTOCARRO
			if(this.money.value>BUS_COST){
				this.money.removeMoney(BUS_COST);
				this.busStructCollided.teleport(ctx,this,this.mapList[this.busStructCollided.location]);
			}else{
				this.busStructCollided.action(ctx,this.dialog,this.money.value);
			}	
		}else if(this.canInteract){//SE ESTA COM UMA PESSOA EM FRENTE PARA FALAR
			this.collisionSimulation(this.player.orientation)[1].speak(ctx,this.dialog);
		}
	}
	/**
	 * Makes the animation of map loading and active key listener after the animation (during the animation key listeners are off)
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} direction direction where the player is facing
	 */	
	loadingAnimation(ctx,direction){
		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;
		var time = 0;
		var maxTime = ANIMATION_DURATION; 
		var interval = 50;
		var percentage = 0;
		var game = this;
		var anim = function(){
			if (time <= maxTime){
				if (game.player.posX < cw+10){
					game.player.posX += time/100;
				}else{
					game.player.posX = 0;
				}
				ctx.clearRect(0,0,cw,ch);
				ctx.fillStyle = "#86592D";
				ctx.fillText(percentage.toFixed(0)+"%",(cw/2)-7,ch/2, 14);
				game.player.orientation="right";
				game.player.walk(ctx);
				time+=interval;
				percentage = (time/maxTime)*100;
				setTimeout(anim,interval);
			}else{
				game.player.setPosition(cw/2,ch/2);
				game.loadMap(ctx,direction);
			}
		}
		ctx.clearRect(0,0,cw,ch);
		this.player.posX = 0;
		this.player.posY = ch-20;
		this.isAnimated=true;
		this.window.removeEventListener("keydown",this.kHandler);
		setTimeout(anim,interval);
	}
	/**
	 * Loads the map specified by the trigger collided
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} direction direction where the player is facing
	 */	
	loadMap(ctx,direction){
		this.move(ctx,direction);
		this.isAnimated=false;
		this.window.addEventListener("keydown",this.kHandler);
	}
}

