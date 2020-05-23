(function () {
    window.addEventListener("load", main);
}());


function main() {

    function msgHandler(ev) {
        var args=messageHandler(ev);
        new Shop(args[0], args[1]);
    }
    function messageHandler(ev){
        console.log(ev.data)
        var coins = parseInt(ev.data);
        console.log(coins)
        
        return [ev.source,coins];
    }
    //listener
    window.addEventListener("message",msgHandler);
}

class Shop {
    constructor(mainWindow, coins) {
        this.mainWindow = mainWindow;
        
        this.spent=0;
        this.coins= document.getElementById("coins");
        this.coins.textContent=coins;
        this.init();

    }

    init(){ //Handlers
        var buttons = document.getElementsByTagName("button");

        var buttonBuy = null; 

        this.score= document.getElementById("score");
        
        var me = this;

        var btnHandler = function(ev){
            if (ev.target.id == "buy"){
                me.coins.textContent -= 400;
                me.spent-=400;
                me.verifyBuy(buttonBuy);
            }
            else{   //back
                me.exit();
            }
        }

        for(let i=0;i<buttons.length;i++){
            if (buttons[i].id == "buy"){
                buttonBuy = buttons[i];
                
                this.verifyBuy(buttonBuy);
            }
            buttons[i].addEventListener("click",btnHandler);
        }


    }

    verifyBuy(button){
        if (this.coins.textContent<400){
            button.disabled = true;
        }
    }

    exit(){
        
        this.mainWindow.postMessage(String(this.spent),'*');
    }

}