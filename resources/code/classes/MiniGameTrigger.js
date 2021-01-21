class MiniGameTrigger extends Trigger {
    constructor(src, posX, posY, speed, hitboxWidth, hitboxHeight, miniGameSrc,initialX,initialY) {
		
		super(src, posX, posY,speed, hitboxWidth, hitboxHeight,initialX,initialY);
		this.miniGameSrc = miniGameSrc;
		
		this.hitboxColor = "blue";
	}

	interaction(ctx,game){

		document.getElementById("game").style.display = "none";
		var frm = document.getElementById("minigame");
		frm.src = this.miniGameSrc;
		frm.addEventListener("load", iframeHandler);
		frm.style.display = "block";
		window.addEventListener("message", messageHandler);

		function messageHandler(ev){
			frm.style.display = "none";
			var gameSection = document.getElementById("game");
			gameSection.style.display = "block";
			var z = top.window.document.getElementById("mainFrame");
			z.focus();
			var x = document.activeElement.tagName;
			game.money.updateMoney(parseInt(ev.data), ctx);
			if (ev.data=="-400"){
				game.player.trajar(ctx);
				game.loadingAnimation(ctx,"down",game.map);
				game.save();
				top.window.postMessage("credits",'*');
			}
			window.removeEventListener("message", messageHandler);
		}

		function iframeHandler(ev){
			let frm = ev.target;
			frm.contentWindow.postMessage(String([game.money.getMoney(),game.player.getTraje() === true ? 1 : 0]), "*");
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

