class MiniGameTrigger extends Trigger {
    constructor(src, posX, posY, speed, hitboxWidth, hitboxHeight, miniGame,initialX,initialY) {
		
		super(src, posX, posY,speed, hitboxWidth, hitboxHeight,initialX,initialY);
		this.miniGameSrc ="../code/classes/MiniGames/"+miniGame;
		
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
			game.money.addMoney(parseInt(ev.data));
			frm.style.display = "none";
			document.getElementById("game").style.display = "block";
			
			window.removeEventListener("message", messageHandler);
		}

		function iframeHandler(ev){
			let frm = ev.target;
			frm.contentWindow.postMessage("-", "*");
			frm.removeEventListener("load", iframeHandler);
		}
	}
}

