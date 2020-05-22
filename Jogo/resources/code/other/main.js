"use strict";

const PATH = "resources/";

(function(){window.addEventListener("load", main);}());


function main(){
	//LANG DATA
	var lang = window.localStorage.getItem("currentLanguage");
	if(!lang){
		lang="PT";
	}
	var request = new XMLHttpRequest();
	request.open("GET",PATH+"lang/lang_"+lang+".json", true);
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if(request.status === 200 || request.status == 0){
				window.localStorage.setItem("lang",request.responseText)
            }
		}
	}
	request.setRequestHeader("Access-Control-Allow-Origin","*");
	request.send();
	window.localStorage.setItem("volume",30);
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