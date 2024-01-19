let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// Ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipImg;
let shipVelocityX = tileSize;
let shipSpeed = 2; 
let bulletRate = 2; 

// Aliens
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
let alienVelocityX = 1;

let alienEspecialImg; 
let alienEspecial2Img;
let alienEspecialWidth = tileSize * 2;
let alienEspecialHeight = tileSize;
let alienEspecialX = tileSize;
let alienEspecialY = 0;

// Bullets
let bulletArray = [];
let bulletVelocityY = -10;

let score = 0;
let gameOver = false;
let currentLevel = 1; 
let points = 0; 

let gameStarted = false;
let lastTimestamp;

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    
    shipImg = new Image();
    shipImg.src = "./Imagenes_ProtegeLaHuerta/ship.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg.src = "./Imagenes_ProtegeLaHuerta/alien.png";
    createLevel(currentLevel); 

    alienEspecialImg = new Image();
    alienEspecialImg.src = "./Imagenes_ProtegeLaHuerta/alien-yellow.png";

    alienEspecial2Img = new Image();
    alienEspecial2Img.src = "./Imagenes_ProtegeLaHuerta/alien-magenta.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousemove", moveShipWithMouse);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("contextmenu", function (e) {
        shoot(e, "normal");
    });
 
    document.addEventListener("keydown", function (e) {
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
            e.preventDefault(); 
            handleMoveShip(e.code);
        }
    });

    document.addEventListener("keyup", function (e) {
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
            stopMoveShip();
        }
    });
}

function startGame() {
    if (!gameStarted) {

            gameStarted = true;
            lastTimestamp = performance.now();
            requestAnimationFrame(update);

            document.getElementById("startButton").style.display = "none";
            document.getElementById("custom-dialog").style.display = "none";
    }
}

function redirectToOtherPage() {
    
    console.log("Redirigiendo a otra página");
    window.location.href = 'space_defenders_caña.html';
}

function showCustomDialog() {
    document.getElementById("custom-dialog").style.display = "block";
}

function changePage(selectedPage) {
    if (selectedPage) {
        window.location.href = selectedPage;
    }
}

function showGameOverMessage() {
    document.getElementById("gameOverMessage").style.display = "block";
    document.getElementById("finalScore").innerText = score;
}

function restartGame() {
    document.getElementById("gameOverMessage").style.display = "none";
    gameOver = false;
    score = 0;
    currentLevel = 1;
    points = 0;
    
    location.reload();
}

function redirectToIndex() {
    window.location.href = 'index.html';
}

function createLevel(level) {
    const alienProbabilities = {
        normal: 0.4,
        special: 0.3,
        especial2: 0.3
    };
    alienArray = [];
    alienCount = 0;

    let aliensPerRow;
    let aliensPerColumn;

    if (level <= 3) {
        aliensPerRow = 3 + level;
        aliensPerColumn = 2 + level;
    } else {
        aliensPerRow = 4;
        aliensPerColumn = 6;
    }

    for (let c = 0; c < aliensPerRow; c++) {
        for (let r = 0; r < aliensPerColumn; r++) {
            const random = Math.random();
            if (random < alienProbabilities.normal) {
                generateAlienNormal(c, r);
            } else if (random < alienProbabilities.normal + alienProbabilities.special) {
                generateAlienSpecial(c, r);
            } else {
                generateAlienEspecial2(c, r);
            }
            alienCount++;
        }
    }
}

function updateLevel() {

    createLevel(currentLevel);
}

function update() {

    if (!gameStarted) {
        return;
    }

    requestAnimationFrame(update);

    if (gameOver) {

        showGameOverMessage();
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;

            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;

                for (let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alienHeight;
                }
            }

            if (alien.tipo === "especial") {
                context.drawImage(alienEspecialImg, alien.x, alien.y, alien.width, alien.height);
            } else if (alien.tipo == "especial2"){
                context.drawImage(alienEspecial2Img, alien.x, alien.y, alien.width, alien.height);
            }else{
                context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
            }

            if (alien.y >= ship.y) {
                gameOver = true;
            }
        }
    }

    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                handleCollision(bullet, alien);
            }
        }
        
    }

    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    if (alienCount == 0) {
        points += currentLevel * 100; 
        currentLevel++; 
        updateLevel(); 
    }

    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText("Score: " + score, 5, 20);
    context.fillText("Points: " + points, 5, 40); 
    context.fillText("Level: " + currentLevel, 5, 60); 
}

function handleMoveShip(direction) {
    if (gameOver) return;

    ship.x += direction === "ArrowLeft" ? -shipVelocityX * shipSpeed : shipVelocityX * shipSpeed;
    ship.x = Math.max(0, Math.min(ship.x, board.width - ship.width));
}

function stopMoveShip() {

}

function moveShipWithMouse(e) {
    if (gameOver) return;

    const mouseX = e.clientX - board.getBoundingClientRect().left;

    
    ship.x = mouseX - ship.width / 2;

    
    ship.x = Math.max(0, Math.min(ship.x, board.width - ship.width));

    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}


function generateAlienSpecial(c, r) {
    let alienEspecial = {
        img: alienEspecialImg,
        x: alienX + c * alienEspecialWidth,
        y: alienY + r * alienEspecialHeight,
        width: alienEspecialWidth,
        height: alienEspecialHeight,
        alive: true,
        tipo: "especial"
    };
    alienArray.push(alienEspecial);
}

function generateAlienEspecial2(c, r) {
    let alienEspecial2 = {
        img: alienEspecial2Img,
        x: alienX + c * alienEspecialWidth,
        y: alienY + r * alienEspecialHeight,
        width: alienEspecialWidth,
        height: alienEspecialHeight,
        alive: true,
        tipo: "especial2"
    };
    alienArray.push(alienEspecial2);
}

function generateAlienNormal(c, r) {
    let alien = {
        img: alienImg,
        x: alienX + c * alienWidth,
        y: alienY + r * alienHeight,
        width: alienWidth,
        height: alienHeight,
        alive: true,
        tipo: "normal"
    };
    alienArray.push(alien);
}

function shoot(e) {
    if (gameOver) {
        return;
    }

    if (e.code === "Space" || e.button === 2) {
        e.preventDefault();
        if (bulletArray.length < bulletRate) {
            const bulletX = ship.x + shipWidth * 15 / 32;
            const bullet = {
                x: bulletX,
                y: ship.y,
                width: tileSize / 8,
                height: tileSize / 2,
                used: false
            };
            bulletArray.push(bullet);
        }
    }

}

function resetShoot() {
    
}

function handleShoot(e, alienType) {
    if (gameOver) {
        return;
    }

    e.preventDefault();

    let bulletColor = "white"; 

    switch (e.code) {
        case "Space":
            bulletColor = "white";
            break;
        case "ContextMenu": 
            alienType = "normal"; 
            break;
        case "KeyW":
            bulletColor = "red";
            break;
        case "KeyE":
            bulletColor = "blue";
            break;
    }

    if (bulletArray.length < bulletRate) {
        const bulletX = ship.x + shipWidth * 15 / 32;
        const bullet = {
            x: bulletX,
            y: ship.y,
            width: tileSize / 8,
            height: tileSize / 2,
            used: false,
            alienType: alienType,
            color: bulletColor
        };
        bulletArray.push(bullet);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function handleCollision(bullet, alien) {
    bullet.used = true;
    alien.alive = false;
    alienCount--;

    if (alien.tipo === "normal" && bullet.color === "white") {
        score += 100;
    } else if (alien.tipo === "especial" && bullet.color === "red") {
        score += 300;
    } else if (alien.tipo === "especial2" && bullet.color === "blue") {
        score += 500;
    }
}

function handleKeyPress(e) {
    if (gameOver) return;

    switch (e.code) {
        case "Space":
            handleShoot(e, "normal");
            break;
        case "KeyW":
            handleShoot(e, "especial");
            break;
        case "KeyE":
            handleShoot(e, "especial2");
            break;
    }
}

function handleKeyUp(e) {
    if (gameOver) return;

    switch (e.code) {
        case "Space":
        case "KeyW":
        case "KeyE":
            resetShoot();
            break;
    }
}





