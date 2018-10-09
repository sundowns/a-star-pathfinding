const cols = 5;
const rows = 5;
const grid = new Array(cols);

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.colour = colour;
    }
}

// class Colour {
//     red: number;
//     green: number;
//     blue: number;
//     constructor(r: number=255, g: number=255, b: number=255) {
//         this.red = r;
//         this.green = g;
//         this.blue = b;
//     }
// }

console.log(`Pathfinder generating a ${cols}x${rows} grid`)

const setup = () => {
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
        for (var j = 0; j < rows; j++) {
            
            grid[i][j] = new Cell(i, j);
            console.log('??')
        }
    }
}

const draw = () => { 
    background(0)
}

// setup();
//setTimeout(console.log(grid), 2000);
console.log("setup isnt being run, how import p5!!!!!")