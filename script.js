const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");
const loseSound = new Audio("sounds/lose.wav");
const drawSound = new Audio("sounds/draw.wav");

let soundOn = true;
const muteBtn = document.querySelector("#mute-btn");

let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  playSound(drawSound);
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};



const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    playSound(winSound);
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    playSound(loseSound);
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};



const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};




choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playSound(clickSound);
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});


const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;

  userScorePara.innerText = "0";
  compScorePara.innerText = "0";

  msg.innerText = "Play Your Move";
  msg.style.backgroundColor = "#081b31";
});

const playSound = (sound) => {
  if (!soundOn) return;
  sound.currentTime = 0;
  sound.play();
};

muteBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  muteBtn.innerText = soundOn ? "🔊 Sound On" : "🔇 Sound Off";
});

