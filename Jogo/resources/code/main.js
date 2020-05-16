"use strict";

const PATH = "resources/";

(function(){window.addEventListener("load", main);}());


function main(){
	//LANG DATA
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET",PATH+"lang/lang_PT.json", false);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			window.localStorage.setItem("lang",rawFile.responseText)
		}
	}
	rawFile.send();
	//Listeners
	window.addEventListener("message", messageHandler);
	window.postMessage("menu", "*");
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
			showMenu(PATH+"html/mainMenu.html");
			break;
		case "game":
			showMenu(PATH+"html/gameMenu.html");
			break;
		case "play":
			showMenu(PATH+"html/game.html");
			break;
		case "options":
			showMenu(PATH+"html/optionsMenu.html");
			break;
		case "help":
			showMenu(PATH+"html/helpMenu.html");
			break;
		case "credits":
			showMenu(PATH+"html/creditsMenu.html");
			break;
		case "arcade":
			showMenu(PATH+"html/miniGamesMenu.html");
			break;
		case "montyHall":
			showMenu(PATH+"code/classes/MiniGames/MontyHall/MontyHall.html");
			break;
		case "snake":
			showMenu(PATH+"code/classes/MiniGames/SnakeFill/Snake/Snake.html");
			break;
		case "fill":
			showMenu(PATH+"code/classes/MiniGames/SnakeFill/Fill/Fill.html");
			break;
		case "moscas":
			showMenu(PATH+"code/classes/MiniGames/MataMoscas/MataMoscas.html");
			break;
	}
}

function iframeHandler(ev){
	var frm = ev.target;
	frm.contentWindow.postMessage("loaded", "*");
}