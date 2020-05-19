"use strict";

const PATH = "resources/";

(function(){window.addEventListener("load", main);}());


function main(){
	//LANG DATA
	var request = new XMLHttpRequest();
	request.open("GET",PATH+"lang/lang_PT.json", true);
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if(request.status === 200 || request.status == 0){
				window.localStorage.setItem("lang",request.responseText)
            }
		}
	}
	request.setRequestHeader("Access-Control-Allow-Origin","*");
	request.send();

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
		case "returnGameMenu":
		case "game":
			showMenu(PATH+"html/gameMenu.html");
			break;
		case "play":
			showMenu(PATH+"html/game.html");
			break;
		case "create":
			showMenu(PATH+"html/game.html");
			break;
		case "new":
			showMenu(PATH+"html/newGameMenu.html");
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
	frm.contentWindow.postMessage("arcade", "*");
}