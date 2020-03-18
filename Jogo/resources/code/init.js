"use strict";

(function(){	window.addEventListener("load", main);}());


function main(){
	var screenWidth = window.screen.availWidth;
	var windowWidth = 520;
	var windowHeight = 520;
	var windowLeft = (screenWidth - windowWidth)/2;	//center window on the screen
	var myWindow = window.open("resources/html/game.html", "mainWindow", "width = " + windowWidth + ", height = " + windowHeight + ", left = " + windowLeft);
}

