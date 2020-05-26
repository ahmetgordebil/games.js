const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//bir ünite:

const box = 32;

//görselleri yükleme

let ground = new Image();
ground.src = "img/ground.png";

let foodImg = new Image();
foodImg.src = "img/food.png";

//ses dosyaları içeri yüklenir:
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const down = new Audio();
const right = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";

//yılanı oluşturma

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

//yemeği oluşturma

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

//skoru yaratma:

let score = 0;

//yılanı kontrol etme:
let d;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
    down.play();
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
    up.play();
  }
}

// çarpışma kontrol fonksiyonu:

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//canvasa çizim:

function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    //eğer index 0'sa yeşil, değilse beyaz yap.
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  //yılan başı eski pozisyon:
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Yönlendirme:
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //yemek yılanın boyunu uzatsın, yeni yemek oluştursun:
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    //kuyruğu sil
    snake.pop();
  }

  //Yeni baş eklenir:
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //Gameover:

  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//0.1 saniyede bir yeniden çizim
let game = setInterval(draw, 100);
