const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

rock = { option: rock, winsAgainst: scissors, losesAgainst: paper };
paper = { option: paper, winsAgainst: rock, losesAgainst: scissors };
scissors = { option: scissors, winsAgainst: paper, losesAgainst: rock };

const optionElementMap = { rock, paper, scissors };

function computerPlay() {
  // This function returns the computer's chosen option
  const options = Object.keys(optionElementMap);
  let optLength = options.length;
  randomOption = Math.floor(optLength * Math.random());
  return optionElementMap[options[randomOption]];
}

function playerPlay(target) {
  // This function returns the option clicked by the player
  let optionName = target.id;
  return optionElementMap[optionName];
}

function playRound(playerSelection, computerSelection) {
  // Returns the outcome of a round.
  if (playerSelection === "rock") {
    switch (computerSelection) {
      case paper:
        result = "computer";
        break;
      case scissors:
        result = "player";
        break;
      case rock:
        result = "draw";
        break;
    }
  }

  if (playerSelection === "paper") {
    switch (computerSelection) {
      case "scissors":
        result = "computer";
        break;
      case "rock":
        result = "player";
        break;
      case "paper":
        result = "draw";
        break;
    }
  }

  if (playerSelection === "scissors") {
    switch (computerSelection) {
      case "rock":
        result = "computer";
        break;
      case "paper":
        result = "player";
        break;
      case "scissors":
        result = "draw";
        break;
    }
  }
  return result;
}

function buttonListener(e) {
  cleanResult();
  computerSelection = computerPlay();
  playerSelection = playerPlay(e.target);

  result = playRound(playerSelection, computerSelection);
  outputResult(result);
}

function addButtonListeners() {
  buttons = document.querySelectorAll(".controls__button");
  buttons.forEach((button) => button.addEventListener("click", buttonListener));
}

function outputResult(result) {}

function cleanResult() {
  resultField = document.querySelector(".result-bar__text");
  resultField.textContent = "RESULT: ";
}

addButtonListeners();
