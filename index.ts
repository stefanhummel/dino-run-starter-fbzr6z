import "./style.css";
import { Sounds } from "./sounds";

const dino = document.querySelector(".dino") as HTMLDivElement;
const grid = document.querySelector(".grid") as HTMLDivElement;
const background = document.querySelector(".desert") as HTMLDivElement;
const gameOverImage = document.querySelector(".gameOver") as HTMLImageElement;
const scoreField = document.querySelector(".score") as HTMLDivElement;
let dinoPosition = 0;
let gameOver = false;
let isJumping = false;
let score = 0;

function onTouch() {
  onKeydown({ key: " " } as any);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === " " && !isJumping && !gameOver) {
    Sounds.dinoJumpSound.play();
    dinoPosition = 0;
    isJumping = true;
    let upMovement = setInterval(() => {
      dinoPosition += 20;
      dino.style.bottom = dinoPosition + "px";
      if (dinoPosition >= 150) {
        clearInterval(upMovement);
        let downMovement = setInterval(() => {
          dinoPosition -= 10;
          dino.style.bottom = dinoPosition + "px";
          if (dinoPosition <= 0) {
            clearInterval(downMovement);
            isJumping = false;
          }
        }, 20);
      }
    }, 20);
  }
}

document.addEventListener("keydown", onKeydown);
document.addEventListener("touchstart", onTouch, false);

function generateCacti() {
  if (gameOver) return;
  const cacti = document.createElement("div");
  cacti.classList.add("cacti");
  grid.appendChild(cacti);
  let cactiPosition = 1500;
  cacti.style.left = cactiPosition + "px";
  let leftMovement = setInterval(() => {
    cactiPosition -= 9;
    cacti.style.left = cactiPosition + "px";
    if (cactiPosition < 60 && cactiPosition > 0 && dinoPosition < 60) {
      clearInterval(leftMovement);
      Sounds.gameOverSound.play();
      background.style.animationPlayState = "paused";
      gameOverImage.style.display = "inline-block";
      gameOver = true;
    }
    if (gameOver) clearInterval(leftMovement);
  }, 20);
  let randomTime = 1000 + Math.random() * 2500;
  setTimeout(generateCacti, randomTime);
}

let addScore = setInterval(() => {
  score++;
  scoreField.innerHTML = score.toString();
  if (gameOver) clearInterval(addScore);
}, 100);

generateCacti();
