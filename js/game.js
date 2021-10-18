const rock = { option: document.getElementById("rock") };
const paper = { option: document.getElementById("paper") };
const scissors = { option: document.getElementById("scissors") };

Object.defineProperty(rock, "winsAgainst", { value: scissors });
Object.defineProperty(paper, "winsAgainst", { value: rock });
Object.defineProperty(scissors, "winsAgainst", { value: paper });

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
  let outcome = { draw: false };

  if (playerSelection.winsAgainst.option === computerSelection.option) {
    outcome["winner"] = playerSelection.option;
    outcome["loser"] = computerSelection.option;
  } else if (computerSelection.winsAgainst.option === playerSelection.option) {
    outcome["winner"] = computerSelection.option;
    outcome["loser"] = playerSelection.option;
  } else outcome["draw"] = computerSelection.option;

  return outcome;
}

function addButtonListeners() {
  // Sets up listeners that register player input
  buttons = document.querySelectorAll(".controls__button");
  buttons.forEach((button) =>
    button.addEventListener(
      "click",
      (buttomImageListener = (e) => {
        cleanResult();

        computerSelection = computerPlay();
        playerSelection = playerPlay(e.target);

        result = playRound(playerSelection, computerSelection);
        outputResult(result);
      })
    )
  );
}

function outputResult(result) {
  // Apply win- and loss-specific classes to elements
  // that were chosen by either player or computer
  if (result["loser"]) {
    result["loser"].classList.add("loss");
    result["winner"].classList.add("win");
  } else {
    result["draw"].classList.add("draw");
  }
}

function cleanResult() {
  resultField = document.querySelector(".result-bar__text");
  resultField.textContent = "RESULT: ";

  Object.values(optionElementMap).forEach((element) => {
    element.option.classList.remove("loss");
    element.option.classList.remove("win");
    element.option.classList.remove("draw");
  });
}

addButtonListeners();
