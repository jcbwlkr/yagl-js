function newGame() {
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    game.init(width, height);
}

function init() {
    game = new Game();
    document.getElementById("height").addEventListener("input", newGame, false);
    document.getElementById("width").addEventListener("input", newGame, false);
    document.getElementById("board").addEventListener("mousedown", game.clickCell, false);

    newGame();
}

document.addEventListener("DOMContentLoaded", init, false);
