function newGame() {
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    game.init(width, height);
}

function play() {
    intervalId = window.setInterval(game.evolve, 200);
    var btn = document.getElementById("playPause");
    btn.innerHTML = "Pause <i class='icon-pause icon-white'></i>";
    btn.removeEventListener("click", play, false);
    btn.addEventListener("click", pause, false);
}

function pause() {
    window.clearInterval(intervalId);
    var btn = document.getElementById("playPause")
    btn.innerHTML = "Play <i class='icon-play icon-white'></i>";
    btn.addEventListener("click", play, false);
    btn.removeEventListener("click", pause, false);
}

function resize() {
    var width = document.getElementById("play-area").offsetWidth - 50;
    var height = document.documentElement.clientHeight - 40;

    console.log(width);
    // Sane minimums
    width  = Math.max(width, 240);
    height = Math.max(height, 240);

    game.resizeBoard(width, height);
}

function init() {
    game = new Game();
    document.getElementById("board").addEventListener("mousedown", game.clickCell, false);
    document.getElementById("height").addEventListener("input", newGame, false);
    document.getElementById("width").addEventListener("input", newGame, false);
    document.getElementById("playPause").addEventListener("click", play, false);
    document.getElementById("evolve").addEventListener("click", game.evolve, false);
    document.getElementById("populate").addEventListener("click", game.populate, false);
    document.getElementById("clear").addEventListener("click", newGame, false);

    window.onresize = function(event) {
        resize();
    }

    newGame();
    resize();
}

document.addEventListener("DOMContentLoaded", init, false);
