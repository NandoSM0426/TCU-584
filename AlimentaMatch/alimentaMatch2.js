var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

var rowBusterEnabled = false;
var columnBusterEnabled = false;

var rowBusterCost = 500;    
var columnBusterCost = 300; 

var colorBombPowerUpEnabled = false;
var colorBombPowerUpCost = 300; 

var multiplierBombPowerUpEnabled = false;
var multiplierBombPowerUpCost = 400; 
var multiplierDuration = 5;

var gameStarted = false;

var timer; 
var gameDuration = 100; 
var targetScore = 1500;
var timerInterval;

window.onload = function() {
    


    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
        checkBoosters(); 
        checkPowerUps();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; 
}

function startGame() {
    if (gameStarted) {
        return; 
    }


    board = [];
    document.getElementById("board").innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    gameStarted = true; 

    timer = setInterval(function() {
        gameDuration--;
        updateTimerDisplay();

        if (gameDuration <= 0 || score >= targetScore) {

            clearInterval(timer);
            endGame();
        }
    }, 1000);

}

function updateTimerDisplay() {

    var minutes = Math.floor(gameDuration / 60);
    var seconds = gameDuration % 60;
    var secondsStr = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timerDisplay").innerText = "Tiempo restante: " + minutes + ":" + secondsStr;
}

function showDialog(text) {
    document.getElementById("dialogText").innerText = text;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("customDialog").style.display = "block";
}

function closeDialog() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("customDialog").style.display = "none";
}

function endGame(reachedMinScore) {
    if (reachedMinScore) {
        showDialog("¡Felicidades! Has alcanzado el puntaje mínimo.");

        setTimeout(function() {
            gameStarted = false;
            score = 0;
            document.getElementById("score").innerText = score;
            updateTimerDisplay();
        }, 2000);
    } else {
        showDialog("Tiempo agotado!. \nTu puntaje final es: " + score);

        score = 0;
        document.getElementById("score").innerText = score;
        updateTimerDisplay();
    }
}

function restartGame() {

    location.reload();
}

function dragStart() {

    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {

    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}

function crushThree() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }


    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function crushFour() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];

            if (
                candy1.src == candy2.src &&
                candy2.src == candy3.src &&
                candy3.src == candy4.src &&
                !candy1.src.includes("blank")
            ) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40; 
            }
        }
    }


    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];

            if (
                candy1.src == candy2.src &&
                candy2.src == candy3.src &&
                candy3.src == candy4.src &&
                !candy1.src.includes("blank")
            ) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40; 
            }
        }
    }
}

function crushFive() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            let candy5 = board[r][c + 4];

            if (
                candy1.src == candy2.src &&
                candy2.src == candy3.src &&
                candy3.src == candy4.src &&
                candy4.src == candy5.src &&
                !candy1.src.includes("blank")
            ) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50; 
            }
        }
    }


    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            let candy5 = board[r + 4][c];

            if (
                candy1.src == candy2.src &&
                candy2.src == candy3.src &&
                candy3.src == candy4.src &&
                candy4.src == candy5.src &&
                !candy1.src.includes("blank")
            ) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50; 
            }
        }
    }
}

function checkValid() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }


    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}


function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}

function enableRowBuster() {
    if (score >= rowBusterCost) {
        rowBusterEnabled = true;
    }
}

function enableColumnBuster() {
    if (score >= columnBusterCost) {
        columnBusterEnabled = true;
    }
}

function disableBoosters() {
    rowBusterEnabled = false;
    columnBusterEnabled = false;
}

function useRowBuster() {
    if (rowBusterEnabled) {
        
        let rowToRemove = Math.floor(Math.random() * rows);
        for (let c = 0; c < columns; c++) {
            board[rowToRemove][c].src = "./images/blank.png";
        }
        score -= rowBusterCost; 
        disableBoosters(); 
    }
}

function useColumnBuster() {
    if (columnBusterEnabled) {
        
        let columnToRemove = Math.floor(Math.random() * columns);
        for (let r = 0; r < rows; r++) {
            board[r][columnToRemove].src = "./images/blank.png";
        }
        score -= columnBusterCost; 
        disableBoosters(); 
    }
}

function checkBoosters() {

    if (score >= rowBusterCost) {
        enableRowBuster();
    }
    if (score >= columnBusterCost) {
        enableColumnBuster();
    }
}

function enableColorBombPowerUp() {
    if (score >= colorBombPowerUpCost) {
        colorBombPowerUpEnabled = true;
    }
}


function useColorBombPowerUp() {
    if (colorBombPowerUpEnabled) {

        let colorToRemove = candies[Math.floor(Math.random() * candies.length)];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c].src.includes(colorToRemove)) {
                    board[r][c].src = "./images/blank.png";
                }
            }
        }

        score -= colorBombPowerUpCost; 
        colorBombPowerUpEnabled = false; 
    }
}


function checkPowerUps() {

    if (score >= colorBombPowerUpCost) {
        enableColorBombPowerUp();
    }
}