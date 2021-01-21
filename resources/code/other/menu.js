"use strict";

(function(){window.addEventListener("load", main);}());


function main(){
	var lang = JSON.parse(window.localStorage.getItem("lang"));
	var buttons = document.getElementsByTagName("button");
	var slider = document.getElementById("volumeSlider");
	var input = document.getElementById("name");
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
	updateDisabledButtons(buttons);
	for(let i=0;i<buttons.length;i++){
		if (buttons[i].id != "save" && buttons[i].id != "returnGame")
		buttons[i].addEventListener("click",btnHandler);
	}
	if(slider){
		slider.addEventListener("input",updateVolume);//para chrome/safari/firefox
		slider.addEventListener("change",updateVolume);//para IE
	}
	//setVolume
	updateVolume(null);
	if(slider){
		var volume = window.localStorage.getItem("volume");
		document.getElementById("percentage").innerHTML=volume+"%";;
		slider.value=volume;
	}
	//set nome do objetos do html
	setNames(lang,buttons);
	//focus no input para escrever diretamente sem clicar
	if(input){
		input.focus();
	}
}


function messageHandler(ev){
	return ev.source;
}

function buttonHandler(ev,func,buttons,w){
	if (ev.target.className == "langButton"){
		updateLanguage(ev,buttons)
	}else if(ev.target.id == "delete"){
		var lang = JSON.parse(window.localStorage.getItem("lang"));
		var confirmation = confirm(lang.text.confirm);
		if (confirmation == true) {
			window.localStorage.removeItem("game");
		}
		updateDisabledButtons(buttons);
	}else{
		//envia mensagem ao main da pagina escolhida
		w.postMessage(ev.currentTarget.id, "*");
		updateDisabledButtons(buttons);
	}
}

function setNames(lang,buttons){
	var titles = document.getElementsByTagName("h1");
	for(let i=0;i<titles.length;i++){
		titles[i].innerHTML = lang.title[titles[i].id];
	}
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
	var regExp = /^[àâæáäãåāéèêëęėēîïìíįīôœöòóõøōûùüúūÿçćčñń\-a-z]{2,10}$/ig;
	if (regExp.test(name)){
		document.getElementById("create").disabled = false;
		name = name.charAt(0).toUpperCase() + name.slice(1);
		window.localStorage.setItem("name",name);
	}else{
		document.getElementById("create").disabled = true;
	}
}

function updateVolume(ev){
	var percentage;
	if(ev){
		percentage = ev.target.value;
	}else{
		percentage = window.localStorage.getItem("volume");
	}
	var label = document.getElementById("percentage");
	var audios = parent.document.getElementsByTagName("audio")
	for (let i=0;i<audios.length;i++){
		audios[i].volume = percentage/100;
	}
	if(label){
		label.innerHTML = percentage+"%";
		window.localStorage.setItem("volume",percentage);
	}
}

function updateLanguage(ev,buttons){
	//pedir ficheiro de lingua
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET","../../lang/lang_"+ev.target.id+".json", false);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status == 0){
				window.localStorage.setItem("lang",rawFile.responseText)
            }
		}
	}
	rawFile.send();
	window.localStorage.setItem("currentLanguage",ev.target.id);
	var lang = JSON.parse(window.localStorage.getItem("lang"));
	setNames(lang,buttons);
	//desativar o botao lingua selecionada
	updateDisabledButtons(buttons);
}

function updateDisabledButtons(buttons){
	for(let i=0;i<buttons.length;i++){
		switch (buttons[i].id){
			case window.localStorage.getItem("currentLanguage"):
			case "create":
				document.getElementById(buttons[i].id).disabled = true;
				break;
			case "delete":
			case "play":
				if(window.localStorage.getItem("game")==undefined){
					document.getElementById(buttons[i].id).disabled = true;
					break;
				}
				//normal de nao ter break aqui
			default:
				document.getElementById(buttons[i].id).disabled = false;
				break;
		}
	}
}