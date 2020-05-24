(function () {
    window.addEventListener("load", main);
}());


function main() {

    function msgHandler(ev) {
        var args=messageHandler(ev);
        new Shop(args[0], args[1], args[2]);
    }
    function messageHandler(ev){
        console.log(ev.data);
        var [coins, hasTraje] = ev.data.split(',');
        console.log(hasTraje);
        
        return [ev.source,parseInt(coins), hasTraje === '1'];
    }
    //listener
    window.addEventListener("message",msgHandler);
}

class Shop {
    constructor(mainWindow, coins, hasTraje) {
        this.mainWindow = mainWindow;
		this.spent=0;
        
        console.log(hasTraje);
        this.hasTraje=hasTraje;
        this.coins=coins;
        this.init();

    }

	init(){ //Handlers
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		document.getElementById("shop").innerHTML = lang.shop.title;
		document.getElementById("price").innerHTML = lang.shop.price;
		var labelMoney = document.getElementById("money");
		labelMoney.innerHTML = lang.shop.money[0] + this.coins + lang.shop.money[1];
        var buttons = document.getElementsByTagName("button");
        var buttonBuy = null; 
        this.score= document.getElementById("score");
        var me = this;
        var btnHandler = function(ev){
            if (ev.target.id == "buy"){
				me.coins -= 400;
				labelMoney.textContent = lang.shop.money[0] + me.coins + lang.shop.money[1];
                me.spent-=400;
                me.verifyBuy(buttonBuy);
            }
            else{   //back
                me.exit();
            }
        }

        for(let i=0;i<buttons.length;i++){
            switch(buttons[i].id){
				case "buy":
                	buttonBuy = buttons[i];
					buttonBuy.innerHTML = lang.shop.buy;
					this.verifyBuy(buttonBuy);
					break;
				case "return":
					buttons[i].innerHTML = lang.shop.return;
					break;
            }
            buttons[i].addEventListener("click",btnHandler);
        }


    }

    verifyBuy(button){
        if (this.coins<400){
            button.disabled = true;
        }
    }

    exit(){
        
        this.mainWindow.postMessage(String(this.spent),'*');
    }

}