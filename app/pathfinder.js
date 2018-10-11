//https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs
//^Useful docs on representing graphs rather than a simple grid

// End Class Definitions
class Cell {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        //A* variables
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];

        this.show = (colour) => {
            fill(colour);
            noStroke();
            rect(this.x*cell_w, this.y*cell_h, cell_w-1, cell_h-1);
        }

        this.addNeighbours = function(inGrid) {
            if (this.x < cols - 1) this.neighbours.push(inGrid[this.x + 1][this.y]);
            if (this.x > 0)        this.neighbours.push(inGrid[this.x - 1][this.y]);
            if (this.y < rows - 1) this.neighbours.push(inGrid[this.x][this.y + 1]);
            if (this.y > 0)        this.neighbours.push(inGrid[this.x][this.y - 1]);
        }
    }
}

// Globals
const cols = 10;
const rows = 10;
const grid = new Array(cols);
var cell_w;
var cell_h;

// A* Specific
var openSet = [];
var closedSet = []; 
var start;
var end;

function setup() {
    createCanvas(400, 400)
    cell_w = width / cols;
    cell_h = height / rows;

    console.log(`Pathfinder generating a ${cols}x${rows} grid`)
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbours(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols-1][rows-1];

    openSet.push(start);

    console.log(grid);
}

function draw() { 
    aStarStep();
    //TODO: 32:39 into the vid https://www.youtube.com/watch?v=aKYlikFAV4k
    background(0);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    closedSet.forEach((cell) => {
        cell.show(color(255,0,0))
    });

    openSet.forEach((cell) => {
        cell.show(color(0,255,0))
    });
}

const removeFromArray = (array, element) => {
    array.splice(array.lastIndexOf(element), 1); 
}

const getCurrentWinner = () => {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
            winner = i;
        }
    }
    return winner;
}

const aStarStep = () => {
    if (openSet.length > 0) {
        var winner = getCurrentWinner();

        var current = openSet[winner];

        if (current === end) {
            console.log("DONE!")
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

    } else {
        // no solution
    }
}
