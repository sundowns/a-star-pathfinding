//https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs
//^Useful docs on representing graphs rather than a simple grid


// Globals
const wallChance = 0.2;
const cols = 40;
const rows = 40;
const grid = new Array(cols);
var cell_w;
var cell_h;

// A* Specific
var openSet = [];
var closedSet = []; 
var start;
var end;
var path = [];

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

        if (random(1) < wallChance && abs(x+y) > 4) {
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


function setup() {
    createCanvas(400, 400)
    cell_w = width / cols;
    cell_h = height / rows;
    generateGrid(0, 0);
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

function mousePressed() {
    let newX = Math.floor(mouseX/cell_w);
    let newY = Math.floor(mouseY/cell_h);
    if (newX >= 0 && newX <= cols -1 && 
        newY >= 0 && newY <= rows -1) {
            loop();
            generateGrid(newX, newY);
        }
    return false;
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

const generateGrid = (startX, startY) => {
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

    start = grid[startX][startY];
    end = grid[randomIntBetween(Math.floor(cols/2), cols-1)][randomIntBetween(Math.floor(rows/2), rows-1)]
    end.wall = false;

    openSet = [];
    closedSet = [];

    openSet.push(start);
}

const aStarStep = () => {
    if (openSet.length > 0) {
        var winner = getCurrentWinner();

        var current = openSet[winner];
        evaluatePath(current);
        if (current === end) {
            noLoop();
            console.log('%c DONE!', 'color: green; font: bold; font-size: xx-large');
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
        console.log('%c NO SOLUTION :(', 'color: red; font: bold; font-size: xx-large');
        // no solution
    }
}
