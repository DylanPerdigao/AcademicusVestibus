class Game {
    constructor(ctx,storedData,player,mapList,money,miniMap,dialog) {
		if(storedData==null){
			this.player=player;
			this.mapList=mapList;
			this.map = mapList[0];
			this.money=money;
			this.miniMap=miniMap;
			this.dialog = dialog;
			//AJUSTES
			this.map.updatePosition(player.posX-640,player.posY-170);
			this.map.setStructuresPositions();
		}else{
			this.player = new Player(storedData.player);
			this.mapList = new Array();
			for (let i =0;i<storedData.mapList.length;i++){
				this.mapList.push(new Map(storedData.mapList[i]));
			}
			this.map = new Map(storedData.map);
			this.money= new Money(storedData.money);
			this.miniMap= new MiniMap(storedData.miniMap);
			this.dialog = new Dialog(storedData.dialog);
		}
		this.busStructCollided=null;
		this.canInteract=false;
		this.isShowingMap=false;
		this.isAnimated=false;
		this.isDebugging=true;
		this.isPaused=false;
		this.yDebug = 0;
		this.yDebug = 0;
		this.window = window;
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
		//CASO ESTEJA EM PAUSA
		if(this.isPaused){
			switch(event.code){
				case "Escape":
					this.pauseManagement();
					break;
			}
		}else{
		//CASO NAO ESTEJA EM PAUSA MAS ESTA A MOSTRAR O MAPA
			if (this.isShowingMap){
				switch(event.code){
					case "KeyM":
						this.isShowingMap=false;
						this.miniMap.exitMap(ctx,this);
						break;
				}
		//CASO NEM ESTA EM PAUSA NEM ESTA A MOSTRAR O MAPA
			}else{
				switch(event.code){
					case "Escape":
						this.pauseManagement();
						break;
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
				}
				switch(event.key){
					case "&":
						this.money.addMoney(1);
						break;	
					case "%":
						this.money.removeMoney(1);
						break;
				}	
				showDebug(ctx);	
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
			document.getElementById("debug").style.color="red";
			document.getElementById("debug").innerHTML="X:"+this.xDebug+"\nY:"+this.yDebug+"\n";
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
	 * Manage the pause in the game
	 */
	pauseManagement(){
		if(this.isPaused){
			this.unpause();
		}else{
			this.pause();
		}
	}
	/**
	 * Unpause the game
	 */
	unpause(){
		document.getElementById("game").style.display = "block";
		document.getElementById("pause").style.display = "none";
		this.isPaused=false;
	}
	/**
	 * Pause the game
	 */
	pause(){
		//esconder jogo para aparecer o menu pausa
		document.getElementById("game").style.display = "none";
		document.getElementById("pause").style.display = "block";
		//set do volume
		var volume = window.localStorage.getItem("volume");
		document.getElementById("percentage").innerHTML=volume+"%";;
		//mudar estado
		this.isPaused=true;
		//ativar os listeners dos botoes
		var game = this;
		var saveBtn = document.getElementById("save");
		saveBtn.onclick = function(e){game.save()};
		var returnBtn = document.getElementById("returnGame");
		returnBtn.onclick = function(e){game.unpause()};
	}
	/**
	 * Save the game
	 */
	save(){
		var save = {
			"player":this.player,
			"mapList":this.mapList,
			"map":this.map,
			"money":this.money,
			"miniMap":this.miniMap,
			"dialog":this.dialog
		}
		window.localStorage.setItem("game",JSON.stringify(save));
		document.getElementById("save").disabled = true;
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
		var returnDirection;
		var collidedStruct = new Array();
		//simula a avancar na direcao desejada
		for(let k=0;k<this.map.structures.length;k++){
			this.map.structures[k].move(direction);
			hasCollision=this.map.structures[k].checkIntersection(this.player);
			if(hasCollision){
				collidedStruct.push(this.map.structures[k]);
			}
		}
		//recua os elementos que avancaram
		for(let i=0;i<this.map.structures.length;i++){
			returnDirection = this.invertDirection(direction);
			this.map.structures[i].move(returnDirection);
		}
		return collidedStruct;
			
	}
	/**
	 * Updates the position of the elements verifying collisions with player, and if a structure is drawed before/after the player
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {string} direction direction of the player step
	 */
 	updatePosition(ctx,direction){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var collidedStructs = this.collisionSimulation(direction);
		this.player.orientation=direction;
		this.canInteract=false;
		if(collidedStructs.length==0){
			this.move(ctx,direction)	
		}else{
			this.draw(ctx);
			this.canInteract=true;
			for(let i=0; i<collidedStructs.length; i++){
				collidedStructs[i].action(ctx,this,direction,this.mapList[collidedStructs[i].location],collidedStructs.length);
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
		var collidedStructs = this.collisionSimulation(this.player.orientation);
		for(let i = 0; i<collidedStructs.length; i++){
			collidedStructs[i].interaction(ctx,this)
		}	
	}
	/**
	 * Makes the animation of map loading and active key listener after the animation (during the animation key listeners are off)
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {String} direction direction where the player is facing
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
	 * @param {String} direction direction where the player is facing
	 */	
	loadMap(ctx,direction){
		this.move(ctx,direction);
		this.isAnimated=false;
		this.window.addEventListener("keydown",this.kHandler);
	}
}

