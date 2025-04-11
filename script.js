const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const jumpSound = document.getElementById("jumpSound");

let isJumping = false;
let score = 0;
let level = 1;
let speed = 10;

function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.classList.add("jump");
  jumpSound.play();
  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 400);
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump();
  }
});

function moveCactus() {
  let cactusLeft = 600;
  cactus.style.left = cactusLeft + "px";

  const moveInterval = setInterval(() => {
    cactusLeft -= speed;
    cactus.style.left = cactusLeft + "px";

    // tabrakan
    if (cactusLeft > 50 && cactusLeft < 90 && dino.offsetTop >= 140) {
      alert("Game Over!\nScore kamu: " + score);
      location.reload();
    }

    // lewat
    if (cactusLeft < -30) {
      clearInterval(moveInterval);
      score++;
      scoreDisplay.innerText = score;

      if (score % 10 === 0) {
        level++;
        levelDisplay.innerText = level;
        speed += 2;
      }

      setTimeout(moveCactus, Math.random() * 2000 + 1000);
    }
  }, 20);
}

moveCactus();
