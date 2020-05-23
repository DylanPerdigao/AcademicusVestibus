"use strict";

const PATH = "resources/";

(function(){window.addEventListener("load", main);}());


function main(){
	//LANG DATA
	var lang = window.localStorage.getItem("currentLanguage");
	if(!lang){
		lang="PT";
	}
	dataRequest(PATH+"lang/lang_"+lang+".json","lang");
	//MAP DATA
	dataRequest(PATH+"json/maps.json","maps");
	//AUDIO
	var audios = document.getElementsByTagName("audio");
	var audioHandler = function(event){
		switchMusic(event,audios);
	}
	for(let i=0;i<audios.length;i++){
		audios[i].volume=0.3;
		audios[i].addEventListener("ended",audioHandler);
	}
	window.localStorage.setItem("volume",30);
	//Listeners
	window.addEventListener("message", messageHandler);
	window.postMessage("menu", "*");
}

function dataRequest(src,item){
	var request = new XMLHttpRequest();
	request.open("GET",src, true);
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if(request.status === 200 || request.status == 0){
				window.localStorage.setItem(item,request.responseText)
            }
		}
	}
	request.send();
}
function showMenu(src){
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = src;
	frm.addEventListener("load", iframeHandler);
}
	
function messageHandler(ev){
	switch(ev.data){
		case "menu":
		case "return":
		case "quitGame":
			showMenu(PATH+"html/menu/mainMenu.html");
			break;
		case "returnGameMenu":
		case "game":
			showMenu(PATH+"html/menu/gameMenu.html");
			break;
		case "play":
			showMenu(PATH+"html/game/game.html");
			break;
		case "create":
			window.localStorage.removeItem("game");
			showMenu(PATH+"html/game/game.html");
			break;
		case "new":
			showMenu(PATH+"html/menu/newGameMenu.html");
			break;
		case "options":
			showMenu(PATH+"html/menu/optionsMenu.html");
			break;
		case "help":
			showMenu(PATH+"html/menu/helpMenu.html");
			break;
		case "credits":
			showMenu(PATH+"html/menu/creditsMenu.html");
			break;
		case "arcade":
			showMenu(PATH+"html/menu/miniGamesMenu.html");
			break;
		case "montyHall":
			showMenu(PATH+"html/game/MontyHall.html");
			break;
		case "snake":
			showMenu(PATH+"html/game/Snake.html");
			break;
		case "fill":
			showMenu(PATH+"html/game/Fill.html");
			break;
		case "moscas":
			showMenu(PATH+"html/game/FlyKiller.html");
			break;
	}
}


function iframeHandler(ev){
	var frm = ev.target;
	frm.contentWindow.postMessage("arcade", "*");
}

function switchMusic(ev,audios){
	var id = ev.target.id;
	switch (id) {
		case "music0":
			audios[1].play();
			break
		case "music1":
			audios[2].play();
			break;
		case "music2":
			audios[3].play();
			break;
		case "music3":
			audios[0].play();
			break;
	}
	
}