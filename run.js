function newGame() {
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    game.init(width, height);
}

function play() {
    intervalId = window.setInterval(game.evolve, 200);
    var btn = document.getElementById("playPause");
    btn.value = "Pause";
    btn.removeEventListener("click", play, false);
    btn.addEventListener("click", pause, false);
}

function pause() {
    window.clearInterval(intervalId);
    var btn = document.getElementById("playPause")
    btn.value = "Play";
    btn.addEventListener("click", play, false);
    btn.removeEventListener("click", pause, false);
}

function init() {
    game = new Game();
    document.getElementById("board").addEventListener("mousedown", game.clickCell, false);
    document.getElementById("height").addEventListener("input", newGame, false);
    document.getElementById("width").addEventListener("input", newGame, false);
    document.getElementById("playPause").addEventListener("click", play, false);
    document.getElementById("evolve").addEventListener("click", game.evolve, false);
    document.getElementById("populate").addEventListener("click", game.populate, false);

    newGame();
}

document.addEventListener("DOMContentLoaded", init, false);
