const scoreEl = document.getElementById("score");
let grid;
let score = 0;

document.addEventListener('keydown', event => {
    //console.log(event.keyCode);
    const prevGrid = copyGrid(grid);
    
    switch(event.keyCode){
        // Up Arrow
        case 38:
            grid = flipGrid(grid);
            for(let i=0; i< 4; i++){
                grid[i] = operate(grid[i]);
            } 
            grid = flipGrid(grid);
            break;
        // Down Arrow
        case 40:
            for(let i=0; i< 4; i++){
                grid[i] = operate(grid[i]);
            }        
            break;
        // Left Arrow
        case 37:
            grid = rotateGrid(grid);
            grid = flipGrid(grid);
            for(let i=0; i< 4; i++){
                grid[i] = operate(grid[i]);
            } 
            grid = flipGrid(grid);
            grid = rotateGrid(grid);
            break;
        // Right Arrow
        case 39:
            grid = rotateGrid(grid);
            for(let i=0; i< 4; i++){
                grid[i] = operate(grid[i]);
            } 
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
            break;
    }

    if(compare(prevGrid,grid)) {
        addNumber();
    }

    update();
    if(isGameOver()){
        console.log("Game Over!");
    }
    if(isGameWon()){
        console.log("Game Won");
    }
});

function setup(){
    grid = blankGrid();

    addNumber();
    addNumber();
    console.table(grid);

    update();
}

function update(){
    drawGrid();
    scoreEl.innerHTML="Score: " + score;
}

function drawGrid(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let w = canvas.width / 4;
    for(let i = 0; i<4; i++){
        for(let j = 0; j < 4; j++){
            let val = grid[i][j];
            let s = val.toString();
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";      
            ctx.fillStyle = tiles[s].color;
            ctx.fillRect(i*w, j*w, w, w);
            ctx.strokeRect(i*w, j*w, w, w);
			if(val !== 0){
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = tiles[s].size + "px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(val, (i * w + w/2), (j * w + w/2));
            }
        }
    }
}