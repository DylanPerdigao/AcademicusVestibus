"use strict";

(function(){window.addEventListener("load", main);}());


function main(){
	var buttons = document.getElementsByTagName("button")
	var mainWindow;;
	//listener nas mensagens da janela principal
	var msgHandler = function(ev){
		mainWindow = messageHandler(ev);
	}
	window.addEventListener("message", msgHandler);
	//mete listener em todos os butoes
	var btnHandler = function(ev){
		buttonHandler(ev,btnHandler,buttons,mainWindow);
	}
	for(let i=0;i<buttons.length;i++){
		buttons[i].addEventListener("click",btnHandler)
	}
}

function messageHandler(ev){
	return ev.source;
}

function buttonHandler(ev,func,buttons,w){
	//remove os listeners
	for(let i=0;i<buttons.length;i++){
		buttons[i].removeEventListener("click",func)
	}
	//envia mensagem ao main da pagina escolhida
	w.postMessage(ev.currentTarget.id, "*");
}