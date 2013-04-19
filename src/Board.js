var Board = function Board(width_in, height_in) {
    var board = this;

    var height = height_in;
    var width = width_in;

    var dead = false;
    var stablized = false;

    // Create the cells
    var cells = new Array()
    for(var row = 0; row < height; ++row) {
        cells[row] = new Array();
        for(var col = 0; col < width; ++col) {
            cells[row][col] = new Cell();
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
        var count;
        cells.forEach(function(row, rowNum) {
            row.forEach(function(cell, colNum) {
                count = getCountOfLivingNeighbors(rowNum, colNum);
                if(cell.isAlive()) {
                    if( count < 2 ) {
                        // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                        cell.willDie();
                    } else if ( count < 4 ) {
                        // Any live cell with two or three live neighbours lives on to the next generation.
                        cell.willLive();
                    } else {
                        // Any live cell with more than three live neighbours dies, as if by overcrowding.
                        cell.willDie();
                    }
                } else if ( 3 == count ) {
                    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                    cell.willLive();
                }
            });
        });

        var foundChange = false;
        var foundAlive = false;
        // After all cells are marked loop again and tick each cell.
        cells.forEach(function(row, rowNum) {
            row.forEach(function(cell, colNum) {
                changed = cell.evolve();
                if(!foundChange && changed) {
                    foundChange = true;
                }
                if(!foundAlive && cell.isAlive()) {
                    foundAlive = true;
                }
            });
        });

        if(!foundChange) {
            // If nothing changed during this iteration then the board
            // stabilized last generation.
            stablized = true;
        }
        if(!foundAlive) {
            // We found no live cells at the end of this generation. Everything
            // died during this generation.
            dead = true;
        }
    }

    var getCountOfLivingNeighbors = function(row, col) {
        var count = 0;
        count += checkIfCellIsAlive(row - 1, col - 1) ? 1 : 0;
        count += checkIfCellIsAlive(row - 1, col    ) ? 1 : 0;
        count += checkIfCellIsAlive(row - 1, col + 1) ? 1 : 0;
        count += checkIfCellIsAlive(row    , col - 1) ? 1 : 0;
        count += checkIfCellIsAlive(row    , col + 1) ? 1 : 0;
        count += checkIfCellIsAlive(row + 1, col - 1) ? 1 : 0;
        count += checkIfCellIsAlive(row + 1, col    ) ? 1 : 0;
        count += checkIfCellIsAlive(row + 1, col + 1) ? 1 : 0;
        return count;
    };

    var checkIfCellIsAlive = function(row, col) {
        // The board is a flattened sphere so any attempt to access a negative
        // row or col or a row or col larger than the board height or width
        // should wrap around;
        if(row < 0) { row = height - 1; }
        if(col < 0) { col = width - 1; }
        if(row >= height) { row = 0; }
        if(col >= width) { col = 0; }
        return cells[row][col].isAlive();
    };

    this.clickCell = function(row, column) {
        cells[row][column].toggle();
    }

    this.populate = function() {
        var chance = 0.50;
        cells.forEach(function(row, rowNum) {
            row.forEach(function(cell, colNum) {
                if ( Math.random() <= chance ) {
                    cell.willLive();
                } else {
                    cell.willDie();
                }
                cell.evolve();
            });
        });
    }
};
