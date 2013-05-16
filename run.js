function newGame() {
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    game.init(width, height);
}

function play() {
    intervalId = window.setInterval(game.evolve, 200);
    var btn = document.getElementById("playPause");
    btn.innerHTML = "<span>Pause</span> <i class='icon-pause icon-white'></i>";
    btn.removeEventListener("click", play, false);
    btn.addEventListener("click", pause, false);
}

function pause() {
    if(typeof intervalId != "undefined") {
        window.clearInterval(intervalId);
    }
    var btn = document.getElementById("playPause")
    btn.innerHTML = "<span>Play</span> <i class='icon-play icon-white'></i>";
    btn.addEventListener("click", play, false);
    btn.removeEventListener("click", pause, false);
}

function resize() {
    var d = document;
    var docWidth = d.documentElement.clientWidth;
    var widthAdjustment = heightAdjustment = 0;

    if(docWidth <= 767) {
        heightAdjustment = 70;
    } else {
        widthAdjustment = 40;
        heightAdjustment = 50;
    }

    var width = d.getElementById("play-area").offsetWidth - widthAdjustment;
    var height = d.documentElement.clientHeight - heightAdjustment;

    // Sane minimums
    width  = Math.max(width, 200);
    height = Math.max(height, 100);

    game.resizeBoard(width, height);
}

function init() {
    game = new Game();
    document.getElementById("board").addEventListener("mousedown", game.clickCell, false);
    document.getElementById("height").addEventListener("input", newGame, false);
    document.getElementById("width").addEventListener("input", newGame, false);
    document.getElementById("evolve").addEventListener("click", game.evolve, false);
    document.getElementById("populate").addEventListener("click", game.populate, false);
    document.getElementById("clear").addEventListener("click", newGame, false);

    window.onresize = function(event) {
        resize();
    }

    newGame();
    resize();
    pause();
}

document.addEventListener("DOMContentLoaded", init, false);
