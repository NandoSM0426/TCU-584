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
let shipSpeed = 2; // Ship's initial speed
let bulletRate = 2; // Initial bullet fire rate (bullets per frame)

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

let alienEspecialImg; // Image for the special alien
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
let currentLevel = 1; // Initialize at level 1
let points = 0; // Player's points

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load images
    shipImg = new Image();
    shipImg.src = "./ship.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg.src = "./alien.png";
    createLevel(currentLevel); // Create the initial level

    alienEspecialImg = new Image();
    alienEspecialImg.src = "./alien-yellow.png";

    alienEspecial2Img = new Image();
    alienEspecial2Img.src = "./alien-magenta.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
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

            // Draw the special alien if it's of type "special," otherwise use the normal alien image
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
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
        
                if (alien.tipo === "especial") {
                    score += 300;
                } else if (alien.tipo === "especial2") { 
                    score += 500; 
                } else {
                    score += 100;
                }
            }
        }
        
    }

    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    if (alienCount == 0) {
        points += currentLevel * 100; // Points for completing the level
        currentLevel++; // Move to the next level
        updateLevel(); // Create the next level
    }

    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText("Score: " + score, 5, 20);
    context.fillText("Points: " + points, 5, 40); // Display player's points
    context.fillText("Level: " + currentLevel, 5, 60); // Display the current level
}

function moveShip(e) {
    if (gameOver) return;

    ship.x = e.code === "ArrowLeft" ? Math.max(ship.x - shipVelocityX * shipSpeed, 0) :
             e.code === "ArrowRight" ? Math.min(ship.x + shipVelocityX * shipSpeed, board.width - ship.width) :
             ship.x;
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

    if (e.code === "Space") {
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

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function updateLevel() {

   
    createLevel(currentLevel);
}
