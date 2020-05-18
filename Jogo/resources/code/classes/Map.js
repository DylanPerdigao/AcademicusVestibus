class Map extends Element {
    constructor(src, posX, posY,speed,structures) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src,obj.posX,obj.posY,obj.speed);
			this.structures = new Array()
			for(let i in obj.structures){
				var struct = obj.structures[i]
				console.log(struct.type)
				switch(struct.type){
					case "Structure":
						this.structures.push(new Structure(struct));
						break;
					case "Teleporter":
						this.structures.push(new Teleporter(struct));
						break;
					case "Person":
						this.structures.push(new Person(struct));
						break;
					case "Bus":
						this.structures.push(new Bus(struct));
						break;
					case "Trigger":
						this.structures.push(new Trigger(struct));
						break;
					case "MiniGameTrigger":
						this.structures.push(new MiniGameTrigger(struct));
						break;
				}	
			}
		}else{
			super(src, posX, posY,speed);
			this.structures = structures;
		}
		this.setStructuresPositions();
	}
	setStructuresPositions(){
		for(let i=0;i<this.structures.length;i++){
			this.structures[i].posX = this.posX-this.structures[i].initialX
			this.structures[i].posY = this.posY-this.structures[i].initialY
		}
	}
}

