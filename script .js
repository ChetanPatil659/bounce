const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const resetbtn = document.getElementById("reset");
const gravityUp = document.getElementById("gravity_up");
const gravityDown = document.getElementById("gravity_down");

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: "blue",
    speed: 9,
    dx: 0,
    dy: 0,
    collisions: 0, 
    gravity: 0
};

const floor = {
    y: canvas.height - 20 
};

const ceiling = {
    y: 20 
};

const backgroundSizeMultiplier = 1.3; 

const backgroundImage = new Image();
backgroundImage.src = "https://e1.pxfuel.com/desktop-wallpaper/982/569/desktop-wallpaper-flappy-bird-backgrounds-flappy-bird.jpg"; 
let backgroundXOffset = (canvas.width * (backgroundSizeMultiplier - 1)) / 2;
let backgroundYOffset = (canvas.height * (backgroundSizeMultiplier - 1)) / 2;


backgroundImage.onload = function () {
    drawGame();
};



function drawBackground() {
    ctx.drawImage(
        backgroundImage,
        -backgroundXOffset,
        -backgroundYOffset,
        canvas.width * backgroundSizeMultiplier,
        canvas.height * backgroundSizeMultiplier
    );
}

function drawBall() {
    const gradient = ctx.createRadialGradient(
        ball.x, ball.y, 5, ball.x, ball.y, ball.radius
    );

    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "black");

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
}

function drawFloor() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, floor.y, canvas.width, canvas.height - floor.y);
}

function drawCeiling() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, ceiling.y);
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.dy += ball.gravity;

    if (ball.y + ball.radius >= floor.y) {
        ball.y = floor.y - ball.radius;
        ball.dy = -ball.dy * 0.6;
        ball.collisions++; 
    }

    if (ball.y - ball.radius <= ceiling.y) {
        ball.y = ceiling.y + ball.radius;
        ball.dy = -ball.dy * 0.6;
        ball.collisions++;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
        ball.collisions++; 
    }
    displayCollisionCount();
    
    backgroundXOffset -= ball.dx * 0.2; 
    backgroundYOffset -= ball.dy * 0.2; 
}

canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const deltaX = mouseX - ball.x;
    const deltaY = mouseY - ball.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // ball.dx = (deltaX / distance) * ball.speed;
    // ball.dy = (deltaY / distance) * ball.speed;

    
    ball.y = mouseY 
    ball.x= mouseX
    console.log(mouseX, mouseY);
})

function gameLoop() {
    updateCanvas();
    drawBackground();
    drawFloor();
    drawCeiling();
    drawBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function displayCollisionCount() {
    document.getElementById("collisionCount").innerText = `Collisions : ${ball.collisions}`;
}

resetbtn.addEventListener("click", (event) => {
    resetGame();
})

gravityUp.addEventListener("click", (event) => {
    if (ball.radius < 40) {
        ball.radius += 2
    }
})

gravityDown.addEventListener("click", (event) => {
    if (ball.radius > 10) {
        ball.radius -= 2
    }
})

function resetGame() {
    ball.collisions = 0;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 0;
    ball.dy = 0;
    ball.radius = 20;
    backgroundXOffset = (canvas.width * (backgroundSizeMultiplier - 1)) / 2;
    backgroundYOffset = (canvas.height * (backgroundSizeMultiplier - 1)) / 2;
}

