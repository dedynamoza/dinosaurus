const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");

let isJumping = false;
let isGameOver = false;
let score = 0;
let level = 1;
let speed = 10;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    jump();
  }
});

function jump() {
  if (isJumping || isGameOver) return;
  isJumping = true;
  dino.classList.add("jump");
  jumpSound.play();
  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 400);
}
// Deteksi layar sentuh (mobile)
document.addEventListener("touchstart", function () {
    jump();
  });
  
function startGame() {
  let obstacleLeft = 800;
  obstacle.style.left = obstacleLeft + "px";
  const moveInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(moveInterval);
      return;
    }

    obstacleLeft -= speed;
    obstacle.style.left = obstacleLeft + "px";

    if (obstacleLeft < 0) {
      obstacleLeft = 800;
      updateScore();
    }

    // tabrakan
    const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    if (obstacleLeft > 40 && obstacleLeft < 90 && dinoBottom < 50) {
      hitSound.play();
      alert("💀 Game Over!\nScore: " + score);
      isGameOver = true;
      location.reload();
    }
  }, 20);
}

function updateScore() {
  score++;
  scoreText.textContent = score;

  if (score % 10 === 0) {
    level++;
    levelText.textContent = level;
    speed += 2;
  }
}

startGame();
