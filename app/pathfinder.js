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

        this.show = (colour) => {
            fill(colour);
            noStroke();
            rect(this.x*cell_w, this.y*cell_h, cell_w-1, cell_h-1);
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

    start = grid[0][0];
    end = grid[cols-1][rows-1];

    openSet.push(start);


    console.log(grid)
}

function draw() { 
    if (openSet.length > 0) {
        //TODO: https://www.youtube.com/watch?v=aKYlikFAV4k&t=22m10s
    } else {
        // no solution
    }

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

