class MiniGameTrigger extends Trigger {
    constructor(src, posX, posY, speed, hitboxWidth, hitboxHeight, miniGameSrc,initialX,initialY) {
		
		super(src, posX, posY,speed, hitboxWidth, hitboxHeight,initialX,initialY);
		this.miniGameSrc = miniGameSrc;
		
		this.hitboxColor = "blue";
	}
	
    action(ctx) {
		ctx.clearRect(0,0,ctx.canvas.width,ctx,canvas.height);
	}

	interaction(ctx,game){

		document.getElementById("game").style.display = "none";
		var frm = document.getElementsByTagName("iframe")[0];
		frm.src = this.miniGameSrc;
		frm.addEventListener("load", iframeHandler);
		frm.style.display = "block";
		window.addEventListener("message", messageHandler);


		function messageHandler(ev){
			frm.style.display = "none";
			document.getElementById("game").style.display = "block";
			game.money.updateMoney(parseInt(ev.data), ctx);
			if (ev.data=="-400"){
				game.player.trajar();
			}
			window.removeEventListener("message", messageHandler);
		}

		function iframeHandler(ev){
			let frm = ev.target;
			frm.contentWindow.postMessage(String(game.money.getMoney()), "*");
			frm.removeEventListener("load", iframeHandler);
		}
	}

	action(ctx,game,direction,map,numCollisions) {
		var dialog = game.dialog;
		if(numCollisions<=1){
			game.move(ctx,direction)
		}else{
			game.draw(ctx);
		}
		this.inform(ctx,dialog)
	}

	inform(ctx,dialog){
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		dialog.writeInfo(ctx,lang.informations[3]);
		
	}
}

