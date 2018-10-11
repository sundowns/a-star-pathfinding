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
        this.previous = null;
        this.wall = false;

        if (random(1) < 0.3) {
            this.wall = true;
        }

        this.show = (colour) => {
            fill(colour);
            if (this.wall) {
                fill(0);
            }
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
const cols = 30;
const rows = 30;
const grid = new Array(cols);
var cell_w;
var cell_h;

// A* Specific
var openSet = [];
var closedSet = []; 
var start;
var end;
var path = [];

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
    end = grid[randomIntBetween(Math.floor(cols/2), cols-1)][randomIntBetween(Math.floor(rows/2), rows-1)]
    end.wall = false;

    openSet.push(start);

    console.log(grid);
}

function draw() { 
    aStarStep();
    background(0);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    closedSet.forEach((cell) => {
        cell.show(color(255,165,0));
    });

    openSet.forEach((cell) => {
        cell.show(color(255,255,0));
    });
    
    path.forEach((cell) => {
        cell.show(color(0,255,0));
    });

    end.show(color(255,0,255));
}

const removeFromArray = (array, element) => {
    array.splice(array.lastIndexOf(element), 1); 
}

const randomIntBetween = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
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

const heuristic = (a, b) => {
    return abs(a.x-b.x) + abs(a.y+b.y);
}

const evaluatePath = (current) => {
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
}

const aStarStep = () => {
    if (openSet.length > 0) {
        var winner = getCurrentWinner();

        var current = openSet[winner];
        evaluatePath(current);
        if (current === end) {
            noLoop();
            console.log("DONE!");
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        current.neighbours.forEach((neighbour) => {
            if (!closedSet.includes(neighbour) && !neighbour.wall) {
                var tempG = current.g + 1;

                if (openSet.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                    }
                } else {
                    neighbour.g = tempG;
                    openSet.push(neighbour);
                }

                neighbour.h = heuristic(neighbour, end);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.previous = current;
            }
        })

    } else {
        console.log("No Solution :(!")
        // no solution
    }
}
