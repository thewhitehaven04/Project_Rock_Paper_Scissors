const rock = { option: document.getElementById("rock") };
const paper = { option: document.getElementById("paper") };
const scissors = { option: document.getElementById("scissors") };

Object.defineProperty(rock, "winsAgainst", { value: scissors });
Object.defineProperty(paper, "winsAgainst", { value: rock });
Object.defineProperty(scissors, "winsAgainst", { value: paper });

const optionElementMap = { rock, paper, scissors };

let playerCount = 0;
let computerCount = 0;

const exitThreshold = 4;

function addButtonListeners() {
  // Sets up listeners that register player input
  buttons = document.querySelectorAll(".controls__button");
  buttons.forEach((button) =>
    button.addEventListener("click", (e) => {
      cleanResult();

      computerSelection = computerPlay();
      playerSelection = playerPlay(e.target);

      result = playRound(playerSelection, computerSelection);
      outputResult(result);
    })
  );
}

window.addEventListener("keypress", (e) => {
  /* Adds listener that stops the application of the loss, 
  draw and win classes to the computer's and player's options of choice */
  if (e.Key === "Enter") {
    cleanResult();
  }
});

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
  let outcome = { draw: false, winner: undefined };

  if (playerSelection.winsAgainst.option === computerSelection.option) {
    outcome["winnerElement"] = playerSelection.option;
    outcome["loserElement"] = computerSelection.option;
    outcome["winner"] = "player";
    playerCount++;
  } else if (computerSelection.winsAgainst.option === playerSelection.option) {
    outcome["winnerElement"] = computerSelection.option;
    outcome["loserElement"] = playerSelection.option;
    outcome["winner"] = "computer";
    computerCount++;
  } else outcome["draw"] = computerSelection.option;

  return outcome;
}

function addButtonListeners() {
  // Sets up listeners that register player input
  buttons = document.querySelectorAll(".controls__button");
  buttons.forEach((button) =>
    button.addEventListener("click", (e) => {
      cleanResult();

      computerSelection = computerPlay();
      playerSelection = playerPlay(e.target);

      result = playRound(playerSelection, computerSelection);
      outputResult(result);
      exitGameIfEnoughScore();
    })
  );
}

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    cleanResult();
  }
});

function outputResult(result) {
  /* Apply win- and loss-specific classes to elements
  that were chosen by either player or computer */

  let applyClasses = function () {
    if (result["loserElement"]) {
      result["loserElement"].classList.add("loss");
      result["winnerElement"].classList.add("win");
    } else {
      result["draw"].classList.add("draw");
    }
  };

  let addScore = function () {
    scoreCounter = document.getElementById("score");
    scoreCounter.textContent = `PLAYER ${playerCount}:${computerCount} COMPUTER`;
  };

  applyClasses(result);
  addScore();
}

function cleanResult() {
  const outcomeClasses = ["win", "loss", "draw"];
  outcomeClasses.forEach((outcomeClass) => {
    let outcomeClassElements = document.getElementsByClassName(outcomeClass);
    Array.from(outcomeClassElements).forEach((element) =>
      element.classList.remove(outcomeClass)
    );
  });
}

function exitGameIfEnoughScore() {
  if (playerCount === exitThreshold) {
    alert("Player wins!");
  } else if (computerCount === exitThreshold) {
    alert("Computer wins!");
  }
}

addButtonListeners();
