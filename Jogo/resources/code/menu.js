"use strict";

(function(){window.addEventListener("load", main);}());


function main(){
	var lang = JSON.parse(window.localStorage.getItem("lang"));
	var buttons = document.getElementsByTagName("button");
	var mainWindow;
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
		buttons[i].addEventListener("click",btnHandler);
	}
	//set nome do objetos do html
	var title = document.getElementsByTagName("h1")[0]
	title.innerHTML = lang.title[title.id];
	var subtitles = document.getElementsByTagName("h2");
	for(let i=0;i<subtitles.length;i++){
		subtitles[i].innerHTML =lang.subtitle[subtitles[i].id];
	}
	for(let i=0;i<buttons.length;i++){
		buttons[i].innerHTML =lang.buttons[buttons[i].id];
	}
	var acknowledgments = document.getElementsByTagName("ack");
	for(let i=0;i<acknowledgments.length;i++){
		acknowledgments[i].innerHTML =lang.text[acknowledgments[i].id];
	}
	var controls = document.getElementsByTagName("control");
	for(let i=0;i<controls.length;i++){
		controls[i].innerHTML =lang.text[controls[i].id];
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

function nameValidation(){
	var name = document.getElementById("name").value;
	var regExp = /[A-Z][àâæáäãåāéèêëęėēîïìíįīôœöòóõøōûùüúūÿçćčñń\-a-z]{2,10}$/g;
	if (regExp.test(name)){
		document.getElementById("create").disabled = false;
		window.localStorage.setItem("name",name);
	}else{
		document.getElementById("create").disabled = true;
	}
}