// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of each square in the grid
let box = 32;

// Initialize the snake to start in the middle of the canvas
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Set the initial direction of the snake
let direction = "right";

// Place the first food item at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Define the obstacles
let obstacles = [
    { x: 8 * box, y: 4 * box },
    { x: 8 * box, y: 12 * box },
    // Add more obstacles as needed
];

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.drawImage(snaketexture, snake[i].x, snake[i].y, box, box);
        // context.fillStyle = "green";
        // context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.drawImage(rat, food.x, food.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game loop
function startGame() {
    // If the snake hits the border, it appears on the other side
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Draw the game elements
    createBG();
    createSnake();
    drawFood();

    // Draw the obstacles
    drawObstacles();

    // Move the snake in the current direction
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Check for collisions with obstacles
    for (let i = 0; i < obstacles.length; i++) {
        console.log(snakeX + ' = ' + obstacles[i].x + ' and ' + snakeY + ' = ' + obstacles[i].y);
        if (snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        // If not, remove the tail
        snake.pop();
    } else {
        // If yes, generate new food and don't remove the tail
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Add a new head to the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Function to draw the obstacles
function drawObstacles() {
    context.fillStyle = "blue";
    for (let i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Start the game loop
let game = setInterval(startGame, 100);