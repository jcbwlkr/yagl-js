var Game = function Game() {
    var game    = this;
    var inited  = false;
    var canvas = document.getElementById("board");
    var context = canvas.getContext('2d');

    var cellHeight;
    var cellWidth;
    var board;
    var generation;


    this.init = function(width, height) {
        // Starting a new game
        generation = 0;
        board      = new Board(width, height);
        cellHeight = canvas.height / board.getHeight();
        cellWidth  = canvas.width / board.getWidth();

        renderBoard();
    }

    /**
     * Draws the board
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

        document.getElementById("generation").innerHTML = generation;
    }

    this.clickCell = function(event) {
        // Identify the clicked cell based on coords
        var coords = canvas.relMouseCoords(event);
        var row = Math.floor(coords.y / cellHeight);
        var column = Math.floor(coords.x / cellWidth);

        console.log("click " + row + " " + column);

        // Tell the board that the cell was clicked
        board.clickCell(row, column);

        // Human intervention means we're starting a new seed so reset generation
        generation = 0;

        // Redraw the board
        renderBoard();
    }

    this.evolve = function() {
        board.evolve();
        ++generation;
        renderBoard();
    }
};
