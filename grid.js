
function blankGrid() {
    return [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
}

function copyGrid(grid) {
    let newGrid  = blankGrid();

    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            newGrid[i][j] = grid[i][j]
        }
    }
    return newGrid;
}

function addNumber() {
    let options = [];
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(grid[i][j] === 0){
                options.push({x: i, y: j});
            }
        }
    }

    if(options.length > 0){
        let r = Math.floor(Math.random(options)*options.length);
        let spot = options[r];
    
        r = Math.random(1);
        grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
    }
    
}

function compare(a,b) {

    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(a[i][j] !== b[i][j]){
                return true;
            }
        }
    }
    return false;
}

function flipGrid(grid){
    for(let i= 0; i< 4 ; i++){
        grid[i].reverse();
    }
    return grid;
}

function rotateGrid(grid){
    let newGrid = blankGrid();
    for(let i= 0; i< 4 ; i++){
        for(let j= 0; j< 4 ; j++){
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
}