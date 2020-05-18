"use strict";

(function(){window.addEventListener("load", main);}());


function main(){
	var lang = JSON.parse(window.localStorage.getItem("lang"));
	var buttons = document.getElementsByTagName("button");
	var slider = document.getElementById("volumeSlider");
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
	if(slider){
		slider.addEventListener("input",updateVolume);//para chrome/safari/firefox
		slider.addEventListener("change",updateVolume);//para IE
	}
	//set nome do objetos do html
	setNames(lang,buttons);
}


function messageHandler(ev){
	return ev.source;
}

function buttonHandler(ev,func,buttons,w){
	if (ev.target.className == "langButton"){
		updateLanguage(ev,buttons)
	}else{
		//remove os listeners
		for(let i=0;i<buttons.length;i++){
			buttons[i].removeEventListener("click",func);
		}
		//envia mensagem ao main da pagina escolhida
		w.postMessage(ev.currentTarget.id, "*");
	}
}

function setNames(lang,buttons){
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

function updateVolume(ev){
	var percentage = ev.target.value;
	parent.document.getElementsByTagName("audio")[0].volume = percentage/100;
	document.getElementById("percentage").innerHTML = percentage+"%";
}

function updateLanguage(ev,buttons){
	//pedir ficheiro de lingua
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET","../lang/lang_"+ev.target.id+".json", false);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			window.localStorage.setItem("lang",rawFile.responseText)
		}
	}
	rawFile.send();
	var lang = JSON.parse(window.localStorage.getItem("lang"));
	setNames(lang,buttons);
	//desativar o botao lingua selecionada
	for(let i=0;i<buttons.length;i++){
		if(buttons[i].id == ev.target.id){
			document.getElementById(buttons[i].id).disabled = true;
		}else{
			document.getElementById(buttons[i].id).disabled = false;
		}
	}
}