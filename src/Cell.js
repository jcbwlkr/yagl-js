var Cell = function Cell() {
    var alive = false;
    var nextState = null;

    this.toggle = function() {
        alive = !alive;
    }

    this.isAlive = function() {
        return alive;
    }

    this.willLive = function() {
        nextState = true;
    }

    this.willDie = function() {
        nextState = false;
    }

    this.evolve = function() {
        // TODO throw error is nextState is null meaning we didn't do something
        // we should have further up
        var changed = alive == nextState;
        alive = nextState;
        nextState = null;

        return changed;
    }
}
