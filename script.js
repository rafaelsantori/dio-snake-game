let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// criar cenario do jogo
function createScenario() {
    context.fillStyle = "Lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// criar a cobra do jogo
function createSnake() {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "red";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// desenhar comida
function drawFood() {
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);
}

// recuperar eventos de clique nas setas
document.addEventListener('keydown', update);

// controles do jogo
function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

// funcionamento do jogo
function startGame() {
    // tratamento de saida do cenario
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    // game over ao bater no corpo
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x  == snake[i].x && snake[0].y  == snake[i].y) {
            clearInterval(game);
            alert('Fim do Jogo!');
            document.location.reload(true); // recarrega a página para o jogo iniciar novamente
        }
    }


    // chamada das funcoes
    createScenario();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // movimento da cobra
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // aumentar tamanho da cobra com a comida
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);