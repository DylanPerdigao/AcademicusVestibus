(function () {
    window.addEventListener("load", main);
}());


function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    function msgHandler(ev) {
        var args=messageHandler(ev);
        new GameMontyHall(ctx, canvas, args[0], args[1]);
    }

    function messageHandler(ev){
        var arcade;
        if (ev.data=='arcade'){
            arcade=true;
        }
        else{
            arcade = false;
        }
        return [ev.source,arcade];
    }

    //listener
    window.addEventListener("message",msgHandler);
}
