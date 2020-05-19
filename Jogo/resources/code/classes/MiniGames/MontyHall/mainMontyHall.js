(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    function msgHandler(ev) {
        new GameMontyHall(ctx, canvas, messageHandler(ev));
    }

    function messageHandler(ev){
        return ev.source;
    }

    //listener
    window.addEventListener("message",msgHandler);
}
