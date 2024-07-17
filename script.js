// Getting all the quatities

let Rock = document.querySelector(".rock");
let Paper = document.querySelector(".paper");
let Scissors = document.querySelector(".Scissors");
let ShowResult = document.querySelector(".show-Result");
let resetBtn = document.querySelector("#reset-btn");

// Initialize score object
let score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

//Loads From localstorage

window.onload = () => {
  if (localStorage.getItem("score")) {
    score = JSON.parse(localStorage.getItem("score"));
  }
  displayScore();
};

// Adding EventListener
Rock.addEventListener("click", () => {
  UserStep("Rock");
});
Paper.addEventListener("click", () => {
  UserStep("Paper");
});
Scissors.addEventListener("click", () => {
  UserStep("Scissors");
});
resetBtn.addEventListener("click", resetScore);

// User Step
function UserStep(UserChoice) {
  let ComputerChoice = ComputerStep();
  const result = Winner(UserChoice, ComputerChoice);
  updateScore(result);
  displayResult(result, UserChoice, ComputerChoice);
}

// Computer Step
function ComputerStep() {
  let choices = ["Rock", "Paper", "Scissors"];
  let randomNumber = Math.floor(Math.random() * choices.length);
  return choices[randomNumber];
}

// Choose Winner
function Winner(UserChoice, ComputerChoice) {
  if (UserChoice === ComputerChoice) {
    return "Tie";
  }
  if (
    (UserChoice === "Rock" && ComputerChoice === "Paper") ||
    (UserChoice === "Paper" && ComputerChoice === "Scissors") ||
    (UserChoice === "Scissors" && ComputerChoice === "Rock")
  ) {
    return "Loss";
  }
  return "Win";
}

// Update Score
function updateScore(result) {
  if (result === "Win") {
    score.wins++;
  } else if (result === "Loss") {
    score.losses++;
  } else {
    score.ties++;
  }
  localStorage.setItem("score", JSON.stringify(score));
}

// Reset score
function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  displayScore();
  localStorage.setItem("score", JSON.stringify(score));
}

// Show Result
function displayResult(result, UserChoice, ComputerChoice) {
  ShowResult.innerHTML = `
    <div class="winner">
      <div class="user"> You Choose: <img src="./images/${UserChoice}.png" /> </div>
      <div class="computer"> Computer Choose: <img src="./images/${ComputerChoice}.png" /> </div>
    </div>
    <h2 class="final-Result">${
      result === "Win"
        ? "You won 😍"
        : result === "Loss"
        ? "You Lose 😥"
        : "It's a Tie 😆"
    }</h2>
    <div class="score">
      <p>Wins: ${score.wins}</p>
      <p>Losses: ${score.losses}</p>
      <p>Ties: ${score.ties}</p>
    </div>
  `;
}

function displayScore() {
  ShowResult.innerHTML = `
  <div class="score">
    <p>Wins: ${score.wins}</p>
    <p>Losses: ${score.losses}</p>
    <p>Ties: ${score.ties}</p>
  </div>
`;
}
