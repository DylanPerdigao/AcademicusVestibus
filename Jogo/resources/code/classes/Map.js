class Map extends Element {
    constructor(src, posX, posY,speed,structures) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src,obj.posX,obj.posY,obj.speed);
			this.structures = new Array()
			for(let i=0;i<obj.structures.length;i++){
				var struct = obj.structures[i]
				switch(struct.type){
					case "Structure":
						this.structures.push(new Structure(struct.src, struct.posX, struct.posY, struct.speed, struct.hitboxWidth, struct.hitboxHeight));
						break;
					case "Teleporter":
						this.structures.push(new Teleporter(struct.src, struct.posX, struct.posY, struct.speed, struct.hitboxWidth, struct.hitboxHeight, struct.location, struct.localX, struct.localY, struct.direction));
						break;
					case "Person":
						this.structures.push(new Person(struct.src, struct.posX, struct.posY, struct.speed, struct.hitboxWidth, struct.hitboxHeight, struct.textID));
						break;
					case "Bus":
						this.structures.push(new Bus(struct.src, struct.posX, struct.posY, struct.speed, struct.hitboxWidth, struct.hitboxHeight, struct.location, struct.localX, struct.localY, struct.direction));
						break;
					case "Trigger":
						this.structures.push(new Trigger(struct.src, struct.posX, struct.posY, struct.speed, struct.hitboxWidth, struct.hitboxHeight));
						break;
					case "MiniGameTrigger":
						this.structures.push(new MiniGameTrigger(struct.src, struct.posX, struct.posY, struct.speed, struct.hitboxWidth, struct.hitboxHeight, struct.miniGame));
						break;
				}	
			}
		}else{
			super(src, posX, posY,speed);
			this.structures = structures;
		}
	}
	setStructuresPositions(){
		for(let i=0;i<this.structures.length;i++){
			this.structures[i].posX = this.posX-this.structures[i].initialX
			this.structures[i].posY = this.posY-this.structures[i].initialY
		}
	}
}

