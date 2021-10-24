const rock = {
  name: "rock",
  elementId: document.getElementById("rock"),
  elementSvg: document.getElementById("rock").firstElementChild,
  winsAgainst: "scissors",
};
const paper = {
  name: "paper",
  elementId: document.getElementById("paper"),
  elementSvg: document.getElementById("paper").firstElementChild,
  winsAgainst: "rock",
};
const scissors = {
  name: "scissors",
  elementId: document.getElementById("scissors"),
  elementSvg: document.getElementById("scissors").firstElementChild,
  winsAgainst: "paper",
};

const optionElementMap = { rock, paper, scissors };

const exitThreshold = 3;

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    cleanResult();
  }
});

function playerPlay(target) {
  return optionElementMap[target.id];
}

function computerPlay() {
  // This function returns the computer's chosen option
  const options = Object.keys(optionElementMap);
  let optLength = options.length;
  randomOption = Math.floor(optLength * Math.random());
  return optionElementMap[options[randomOption]];
}

function outputResult(result, playerScore, computerScore) {
  /* Apply win- and loss-specific classes to elements
  that were chosen by either player or computer */

  let highlightWinner = function (result) {
    if (result["loserElement"]) {
      optionElementMap[result.loserElement].elementSvg.classList.add("loss");
      optionElementMap[result.winnerElement].elementSvg.classList.add("win");
    } else {
      optionElementMap[result.draw].elementSvg.classList.add("draw");
    }
  };

  let addScore = function (playerScore, computerScore) {
    scoreCounter = document.getElementById("score");
    scoreCounter.textContent = `Player ${playerScore} : ${computerScore} Computer`;
  };

  highlightWinner(result);
  addScore(playerScore, computerScore);
}

function cleanResult() {
  const outcomeClasses = ["win", "loss", "draw"];
  outcomeClasses.forEach((outcomeSelector) => {
    let outcomeElements = Array.from(
      document.getElementsByClassName(outcomeSelector)
    );
    outcomeElements.forEach((outcomeElement) =>
      outcomeElement.classList.remove(outcomeSelector)
    );
  });
}

function exitGameIfEnoughScore(exitThreshold, playerScore, computerScore) {
  // Show an alert message when either score hits the threshold
  if (playerScore === exitThreshold) {
    alert("Player wins!");
  } else if (computerScore === exitThreshold) {
    alert("Computer wins!");
  }
}

function game(exitThreshold) {
  let controlButtons = document.querySelectorAll(".controls__button");
  // Initialize player and computer score counters
  let playerScore = 0;
  let computerScore = 0;

  const controlButtonListener = (event) => {
    // Clean option highlights before each new round
    cleanResult();

    let playerSelection = playerPlay(event.target);
    let computerSelection = computerPlay();
    let outcome = playRound(playerSelection, computerSelection);

    // Set highlights with respect to the selected playerSelection and computerSelection
    outputResult(outcome, playerScore, computerScore);
    exitGameIfEnoughScore(exitThreshold, playerScore, computerScore);
    event.stopPropagation();
  };

  const playRound = function (playerSelection, computerSelection) {
    // Returns the outcome of a round.
    let outcome = { draw: false, winner: undefined };

    if (playerSelection.winsAgainst === computerSelection.name) {
      outcome["winnerElement"] = playerSelection.name;
      outcome["loserElement"] = computerSelection.name;
      outcome["winner"] = "player";
      playerScore++;
    } else if (computerSelection.winsAgainst === playerSelection.name) {
      outcome["winnerElement"] = computerSelection.name;
      outcome["loserElement"] = playerSelection.name;
      outcome["winner"] = "computer";
      computerScore++;
    } else outcome["draw"] = computerSelection.name;

    return outcome;
  };

  controlButtons.forEach((controlButton) => {
    controlButton.addEventListener("click", controlButtonListener, {
      capture: true,
    });
  });
}

game(exitThreshold);
