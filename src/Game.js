var Game = function Game() {
    var game    = this;
    var inited  = false;
    var canvas  = document.getElementById("board");
    var context = canvas.getContext('2d');

    var generation = 0;

    var cellHeight;
    var cellWidth;
    var board;

    this.init = function(width, height) {
        if(inited) {
            return;
        }
        inited = true;

        board = new Board(width, height);
        canvas = document.getElementById("board");
        context = canvas.getContext('2d');

        canvas.addEventListener("mousedown", game.clickCell, false);
        cellHeight = canvas.height / board.getHeight();
        cellWidth = canvas.width / board.getWidth();

        renderBoard();
    }

    /**
     * Draws the initial state of the board
     */
    var renderBoard = function() {
        var y = 0;
        board.getCells().forEach(function(row) {
            var x = 0;
            row.forEach(function(cell) {
                context.beginPath();
                context.rect(x, y, cellWidth, cellHeight);
                context.strokeStyle = 'grey';
                context.fillStyle = cell.isAlive() ? 'black' : 'white';
                context.fill();
                context.stroke();
                x += cellWidth;
            });
            y += cellHeight;
        });

        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
    }

    this.clickCell = function(event) {
        var coords = canvas.relMouseCoords(event);
        // Identify the clicked cell based on coords
        var row = Math.floor(coords.y / cellHeight);
        var column = Math.floor(coords.x / cellWidth);

        board.clickCell(row, column);
        generation = 0;
        renderBoard();
    }

    this.evolve = function() {
        board.evolve();
        ++generation;
        renderBoard();
    }
};
