const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const gameOverEl = document.getElementById("gameOver");
let grid;
let score = 0;
var highScore = 0;

if(localStorage.getItem("highScore")){
    highScore = localStorage.getItem("highScore");
}

var startX;
var startY;
var endX;
var endY;

var threshold = 80; //this sets the minimum swipe distance, to avoid noise and to filter actual swipes from just moving fingers

window.addEventListener('touchstart', function(event){
    //console.log(event);
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;      
});
    
window.addEventListener('touchend', function(event){
    //console.log(event);
    const prevGrid = copyGrid(grid);

    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    handleTouch(startX, endX, startY, endY);

    if(compare(prevGrid,grid)) {
        addNumber();
    }

    update();
    endOfGame()
});

document.addEventListener('keydown', event => {
    //console.log(event.code);
    const prevGrid = copyGrid(grid);
    
    switch(event.code){
        // Up Arrow
        case "ArrowUp":
            handleUp();
            break;
        // Down Arrow
        case "ArrowDown":
            handleDown();        
            break;
        // Left Arrow
        case "ArrowLeft":
            handleLeft();
            break;
        // Right Arrow
        case "ArrowRight":
            handleRight();
            break;
    }

    if(compare(prevGrid,grid)) {
        addNumber();
    }

    update();
    endOfGame()
});

function endOfGame(){
    if(isGameOver()){
        console.log("Game Over!");
        gameOverEl.innerHTML = "Game Over!";
    }
    if(isGameWon()){
        console.log("Game Won");
        gameOverEl.innerHTML = "Congrats!";
    }
}

//Function to handle swipes
function handleTouch(x1, x2, y1, y2){
    //calculate the distance on x-axis and o y-axis. Check wheter had the great moving ratio.
    var xDist = Math.abs(x2 - x1);
    var yDist = Math.abs(y2 - y1);
    //console.log("xDist: " + xDist); console.log("yDist: " + yDist);

    if((xDist > threshold) || (yDist > threshold)) {
        if((xDist > yDist) && (x2 - x1 < 0)) { 
            console.log("Swiped left!"); 
            handleLeft();
        }
        if((xDist > yDist) && (x2 - x1 > 0)) { 
            console.log("Swiped right!"); 
            handleRight();
        }
        if((xDist < yDist) && (y2 - y1 < 0)) { 
            console.log("Swiped up!"); 
            handleUp();
        }
        if((xDist < yDist) && (y2 - y1 > 0)) { 
            console.log("Swiped down!"); 
            handleDown();
        }
    }
}

function handleUp() {
    grid = flipGrid(grid);
    for(let i=0; i< 4; i++){
        grid[i] = operate(grid[i]);
    } 
    grid = flipGrid(grid);
}

function handleDown() {
    for(let i=0; i< 4; i++){
        grid[i] = operate(grid[i]);
    }   
}

function handleLeft() {
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    for(let i=0; i< 4; i++){
        grid[i] = operate(grid[i]);
    } 
    grid = flipGrid(grid);
    grid = rotateGrid(grid);
}

function handleRight() {
    grid = rotateGrid(grid);
    for(let i=0; i< 4; i++){
        grid[i] = operate(grid[i]);
    } 
    grid = rotateGrid(grid);
    grid = rotateGrid(grid);
    grid = rotateGrid(grid);
}

function setup(){
    grid = blankGrid();

    addNumber();
    addNumber();
    console.table(grid);

    update();
}

function update(){
    drawGrid();

    if(highScore !== null){
        if (score > highScore) {
            localStorage.setItem("highScore", score);    
            highScore = score;  
        }
    }
    else{
        localStorage.setItem("highScore", score);
    }

    scoreEl.innerHTML="Score: " + score;
    highScoreEl.innerHTML="High Score: " + highScore;
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
