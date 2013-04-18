var Board = function Board(width_in, height_in) {
    var board = this;

    var height = height_in;
    var width = width_in;

    // Create the cells
    var cells = new Array()
    for(var row = 0; row < height; ++row) {
        cells[row] = new Array();
        for(var j = 0; j < width; ++j) {
            cells[row][j] = new Cell();
        }
    }

    this.getHeight = function() {
        return height;
    }

    this.getWidth = function() {
        return width;
    }

    this.getCells = function() {
        return cells;
    }

    this.evolve = function() {
        // This is the main logic for The Game of Life.
        // Loop through cells and mark each as whether they will live or die
        // during at the end of this generation.
        cells.forEach(function(rowNum, row) {
            row.forEach(function(colNum, cell) {
                console.log 
            });
        });
        // After all cells are marked loop again and tick each cell.
    }

    this.clickCell = function(row, column) {
        cells[row][column].toggle();
    }

};
