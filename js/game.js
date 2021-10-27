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
const exitThreshold = 5;

function addOptionListener(optionListener) {
  // The function adds rock, paper, scissors controls listeners that control the game flow
  const controlButtons = document.querySelectorAll(".controls__button");
  controlButtons.forEach((controlButton) => {
    controlButton.addEventListener("click", optionListener, {
      capture: true,
    });
  });
}

function removeOptionListener(optionListener) {
  const controlButtons = document.querySelectorAll(".controls__button");
  controlButtons.forEach((controlButton) =>
    controlButton.removeEventListener("click", optionListener)
  );
}

function playerPlay(target) {
  // Return the object with links to the respective option image, its svg and the option it wins against
  return { rock, paper, scissors }[target.id];
}

function computerPlay() {
  // This function returns the computer's chosen option
  const options = [rock, paper, scissors];
  let optLength = options.length;
  randomOption = Math.floor(optLength * Math.random());
  return options[randomOption];
}

function playRound(gameState) {
  // Returns the outcome of a round.
  const playerSelection = gameState.playerSelection;
  const computerSelection = gameState.computerSelection;

  let playerScore = gameState.playerScore;
  let computerScore = gameState.computerScore;

  let outcome = { draw: false, winner: undefined, playerScore, computerScore };

  if (playerSelection.winsAgainst === computerSelection.name) {
    outcome["winnerElement"] = playerSelection.name;
    outcome["loserElement"] = computerSelection.name;
    outcome["winner"] = "player";
    outcome["playerScore"] = ++gameState.playerScore;
  } else if (computerSelection.winsAgainst === playerSelection.name) {
    outcome["winnerElement"] = computerSelection.name;
    outcome["loserElement"] = playerSelection.name;
    outcome["winner"] = "computer";
    outcome["computerScore"] = ++gameState.computerScore;
  } else outcome["draw"] = computerSelection.name;

  return outcome;
}

function outputResult(result, playerScore, computerScore) {
  /* Apply win- and loss-specific classes to elements
  that were chosen by either player or computer */
  const options = { rock, paper, scissors };

  const highlightWinner = function (result) {
    if (result["loserElement"]) {
      options[result.loserElement].elementSvg.classList.add("loss");
      options[result.winnerElement].elementSvg.classList.add("win");
    } else {
      options[result.draw].elementSvg.classList.add("draw");
    }
  };

  const addScore = function (playerScore, computerScore) {
    scoreCounter = document.getElementById("score");
    scoreCounter.textContent = `Player ${playerScore} : ${computerScore} Computer`;
  };

  const showOutcome = function (result) {
    let roundText = document.getElementById("round-text");
    console.dir(result);
    if (result.winnerElement) {
      roundText.textContent = `${result.winnerElement} beats ${result.loserElement}!`;
    } else {
      roundText.textContent = `It's a draw! Both players chose ${result.draw}`;
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

function newGame(exitThreshold) {
  // Initialize player and computer score counters
  let playerScore = 0;
  let computerScore = 0;

  const optionListener = (event) => {
    // Clean option highlights before each new round
    cleanResult();

    const playerSelection = playerPlay(event.target);
    const computerSelection = computerPlay();

    const gameState = {
      playerSelection,
      playerScore,
      computerSelection,
      computerScore,
    };

    const outcome = playRound(gameState);
    playerScore = outcome.playerScore;
    computerScore = outcome.computerScore;

    // Set highlights with respect to selected playerSelection and computerSelection
    outputResult(outcome, playerScore, computerScore);
    exitGameIfEnoughScore(exitThreshold, playerScore, computerScore);
  };

  addOptionListener(optionListener);
  removeOptionListener(optionListener);

  // nullify the score
  playerScore = 0;
  computerScore = 0;
}

// the game restart function is defined below
const restartButton = document.getElementById("button-continue");
restartButton.addEventListener("click", () => {
  // Set the score to 0:0;
  scoreCounter = document.getElementById("score");
  scoreCounter.textContent = `Player 0 : 0 Computer`;

  // Hide back the endgame dialog
  const endgameDialog = document.getElementById("endgame-message-dialog");
  endgameDialog.classList.remove("endgame-message-dialog__visible");

  // Start a new game
  newGame(5);
});

newGame(exitThreshold);
