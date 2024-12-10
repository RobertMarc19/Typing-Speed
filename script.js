const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sentence = ["programare", "test", "raspuns", "wellcode", "hangman", "airplane", "fighter", "dinosaur", "runner"];
let color = sentence.map(word => Array(word.length).fill("white"));
let wordIndex = 0;
let correctLetters = 0;
let currentLetter = 0;
let correctWords = 0;
let middleYPage = canvas.height / 2;

function playTheGame() {
  window.addEventListener("keypress", function (event) {
    if (event.key == sentence[wordIndex][currentLetter]) {
      color[wordIndex][currentLetter] = "green";
      ++correctLetters;
    } else {
      color[wordIndex][currentLetter] = "red";
    }
    ++currentLetter;
    if (currentLetter == sentence[wordIndex].length) {
      if (correctLetters == sentence[wordIndex].length) {
        ++correctWords;
      }
      ++wordIndex;
      currentLetter = 0;
      correctLetters = 0;
    }
    if (wordIndex == sentence.length) {
      gameEnded();
      return;
    }
    updatedText();
  });
}

function updatedText() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "40px Courier";
  ctx.textAlign = "center";
  let middleXPage = 15;
  for (let i = 0; i < sentence.length; ++i) {
    for (let j = 0; j < sentence[i].length; ++j) {
      ctx.fillStyle = color[i][j];
      let charWidth = ctx.measureText(sentence[i][j]).width;
      ctx.fillText(sentence[i][j], middleXPage, middleYPage);
      middleXPage += charWidth;
    }
    middleXPage += 20;
  }
}

function gameEnded() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "80px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`You written: ${correctWords} correct words`, canvas.width / 2, canvas.height / 2);
}

updatedText();