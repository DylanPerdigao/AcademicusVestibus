class Map extends Element {
    constructor(src, posX, posY,speed,structures) {
        super(src, posX, posY,speed);
		this.structures = structures;
		this.setStructuresPositions();
	}


	setStructuresPositions(){
		for(let i=0;i<this.structures.length;i++){
			this.structures[i].posX = this.posX-this.structures[i].initialX
			this.structures[i].posY = this.posY-this.structures[i].initialY
		}
	}
}

