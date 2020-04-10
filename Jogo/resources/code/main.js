"use strict";

const MAIN_MENU = 0;
const NEW_GAME_MENU = 1;
const OPTIONS_MENU = 2;
const HELP_MENU = 3;
const CREDITS_MENU = 4;
const EXIT = 5;

const PATH = "resources/";

(function(){window.addEventListener("load", main);}());


function main(){
	window.addEventListener("message", messageHandler);
	window.postMessage(MAIN_MENU, "*");
}

function showMenu(src){
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = src;
	frm.addEventListener("load", iframeHandler);
}

function messageHandler(ev){
	switch(ev.data){
		case MAIN_MENU:
			showMenu(PATH+"html/mainMenu.html");
			break;
		case NEW_GAME_MENU:
			showMenu(PATH+"html/game.html");
			break;
		case OPTIONS_MENU:
			showMenu(PATH+"html/optionsMenu.html");
			break;
		case HELP_MENU:
			showMenu(PATH+"html/helpMenu.html");
			break;
		case CREDITS_MENU:
			showMenu(PATH+"html/creditsMenu.html");
			break;
		case EXIT:
			showMenu("");
			window.close();
			break;
	}
}

function iframeHandler(ev){
	var frm = ev.target;
	frm.contentWindow.postMessage("loaded", "*");
}