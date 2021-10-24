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

let playerScore = 0;
let computerScore = 0;

const optionElementMap = { rock, paper, scissors };

const exitThreshold = 3;

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    cleanResult();
  }
});

const restartButton = document.getElementById("button-continue");
restartButton.addEventListener("click", () => {
  // Set the score to 0:0;
  scoreCounter = document.getElementById("score");
  scoreCounter.textContent = `Player 0 : 0 Computer`;

  // Hide back the endgame dialog
  const endgameDialog = document.getElementById("endgame-message-dialog");
  endgameDialog.classList.remove("endgame-message-dialog__visible");

  // Start a new game
  newGame(exitThreshold);
});

function playerPlay(target) {
  // Return the object with links to the respective option image, its svg and the option it wins against
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

  let showOutcome = function (result) {
    let roundText = document.getElementById("round-text");
    console.dir(result);
    if (result.winnerElement) {
      roundText.textContent = `${result.winnerElement} beats ${result.loserElement}!`;
    } else {
      roundText.textContent = `It's a draw! Both the computer and you chose ${result.draw}`;
    }
  };
  highlightWinner(result);
  showOutcome(result);
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
  let endgameDialog = document.getElementById("endgame-message-dialog");
  let endgameDialogText = document.getElementById(
    "endgame-message-dialog__text"
  );

  if (playerScore === exitThreshold) {
    endgameDialog.classList.add("endgame-message-dialog__visible");
    endgameDialogText.textContent = "The player has won!";
  } else if (computerScore === exitThreshold) {
    endgameDialog.classList.add("endgame-message-dialog__visible");
    endgameDialogText.textContent = "The computer has won!";
  }
}

function controlButtonListener(event) {
  // Clean option highlights before each new round
  cleanResult();

  let playerSelection = playerPlay(event.target);
  let computerSelection = computerPlay();
  let outcome = playRound(playerSelection, computerSelection);

  // Set highlights with respect to the selected playerSelection and computerSelection
  outputResult(outcome, playerScore, computerScore);
  exitGameIfEnoughScore(exitThreshold, playerScore, computerScore);
  event.stopPropagation();
}

function playRound(playerSelection, computerSelection) {
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
}

function newGame(exitThreshold) {
  // Initialize player and computer score counters
  playerScore = 0;
  computerScore = 0;

  let controlButtons = document.querySelectorAll(".controls__button");
  controlButtons.forEach((controlButton) => {
    controlButton.addEventListener("click", controlButtonListener, {
      capture: true,
    });
  });
}

newGame(exitThreshold);
