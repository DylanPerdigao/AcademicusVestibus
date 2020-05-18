class Bus extends Teleporter {
    constructor(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction) {
		if (arguments.length==1){
			var obj=src;
			super(obj.src, obj.posX, obj.posY,obj.speed,obj.hitboxWidth,obj.hitboxHeight,obj.location,obj.localX,obj.localY,obj.direction);
		}else{
			super(src, posX, posY,speed,hitboxWidth,hitboxHeight,location,localX,localY,direction);
		}
    }
    action(ctx,dialog,money) {
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		if(money>=BUS_COST){
			dialog.writeInfo(ctx,lang.informations[1]);
		}else{
			dialog.writeInfo(ctx,lang.informations[2]);
		}
    }
}

