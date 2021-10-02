function computerPlay() {
  options = ["Rock", "Paper", "Scissors"];
  optLength = options.length;
  randomOption = Math.floor(optLength * Math.random());

  return options[randomOption];
}

function playRound(playerSelection, computerSelection) {
  lossText = `You lose. ${computerSelection} beats ${playerSelection}.`;
  victoryText = `You win. ${playerSelection} beats ${computerSelection}.`;
  drawText = `It's a draw! Both players chose ${playerSelection}`

  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === "rock") {
    switch (computerSelection) {
      case "paper":
        result = lossText;
        break;
      case "scissors":
        result = victoryText;
        break;
      case 'rock':
        result = drawText;
        break;
    }
  }

  if (playerSelection === "paper") {
    switch (computerSelection) {
      case "scissors":
        result = lossText;
        break;
      case "rock":
        result = victoryText;
        break;
      case 'paper':
        result = drawText;
        break;
    }
  }

  if (playerSelection === "scissors") {
    switch (computerSelection) {
      case "rock":
        result = lossText;
        break;
      case "paper":
        result = victoryText;
        break;
      case 'scissors':
        result = drawText;
        break;
    }
  }
  return result;
}

function game() {
  for (let i = 0; i < 5; i++) {
    computerSelection = computerPlay();
    playerSelection = userInput();

    result = playRound(playerSelection, computerSelection);
    outputResult(result);
  }
}

function userInput() {
  input = window.prompt('Please choose between Rock, Paper and Scissors')
  return input;
}

function outputResult(result) {
  h1 = document.querySelector('h1');
  h1.text = result;
}

game();
