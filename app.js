/*
Rock, paper, scissors:

rock = 0
paper = 1
scissors = 2

Numbers are compared in the usual way: a greater number beats a
smaller number, and equal numbers result in a tie. But there is one
twist. If the difference between the two numbers is 2, the smaller of
the two numbers wins.
*/

const imageSources = [
    "assets/alpine-landscape-rock-rubble-01a-al1.svg",
    "assets/Legal-Paper.svg",
    "assets/edit-cut.svg"
];

const genericIconSource = "assets/rock-paper-scissors.svg";

// Game keys
const gameKey = ["rock", "paper", "scissors"];
const playerKey = { rock: 0, paper: 1, scissors: 2 };

// Return 'true' if the player wins.
function playerWins (computerChoice, playerChoice) {
    const condition = !(playerChoice - computerChoice === 2) &&
	  (computerChoice - playerChoice === 2 || computerChoice < playerChoice);

    return condition;
}

// 'computerChoice' and 'playerChoice' are integers (0,1,2) correspoding to a player choice.
// Return a string indicating the winner.
function playRound (computerChoice, playerChoice) {
    if (computerChoice === playerChoice) {
	return "Round resulted in a tie";
    }

    const playerWon = playerWins(computerChoice, playerChoice);

    const cname = gameKey[computerChoice];
    const pname = gameKey[playerChoice];

    if (playerWon) {
	return `You win! ${pname} beats ${cname}`;
    }

    return `You lose: ${cname} beats ${pname}`;
}

// UI

const gameSelectionButtons = [...document.querySelectorAll(".game-selection")];
const buttonDock = document.querySelector(".button-dock");

const computerWinnerMessageArea = document.querySelector("#computer .winner-message");
const playerWinnerMessageArea = document.querySelector("#player .winner-message");
const computerScoreArea = document.querySelector("#computer .score");
const playerScoreArea = document.querySelector("#player .score");
const computerPlayInfo = document.querySelector("#computer .play");
const playerPlayInfo = document.querySelector("#player .play");
const resetButton = document.createElement("button");
resetButton.classList.add("button", "reset-button");

const genericIcon = document.createElement("img");
genericIcon.src = genericIconSource;
resetButton.appendChild(genericIcon);
const playAgainMessage = document.createElement("p");
playAgainMessage.textContent = "Play Again?";
resetButton.appendChild(playAgainMessage);


let computerScore = 0;
let playerScore = 0;
const MAX_SCORE = 5;

// Endow buttons with their respective play action (rock, paper, or scissors)
gameSelectionButtons.forEach(button => button.addEventListener("click", game));

// For when the reset button appears
resetButton.addEventListener("click", reset);

// Remove the changed background color to give the effect of a quick visual animation
playerScoreArea.addEventListener("transitionend", e => e.target.classList.remove("increased", "tied"));
computerScoreArea.addEventListener("transitionend", e => e.target.classList.remove("increased", "tied"));

// Create 'useFancyNumber' using a factory, to avoid creating and
// defining 'fancy' with each invocation.
const useFancyNumber = (() => {
    const base = 0x2460; // ???

    const fancy = Array.from({length: 20}, (_, i) => i)
	  .map(index => {
	      return String.fromCodePoint(base + index);
	  });

    // Add zero as a special case
    fancy.unshift("???");

    return n => fancy[n];
})();

function game () {
    // Clicking on either the button or the embedded image should
    // trigger the event. Use 'this' (instead of 'e.target') to enable
    // propagation upwards towards the button element.
    const playName = this.dataset.name;
    const playerChoice = playerKey[playName];

    const computerChoice = Math.floor(Math.random() * 3);
    const message = playRound(computerChoice, playerChoice);

    // Increment scores accordingly
    // If round is a tie, don't increment any scores
    if (message.match("win")) {
	playerScore++;
	playerScoreArea.classList.add("increased");
    } else if (message.match("lose")) {
	computerScore++;
	computerScoreArea.classList.add("increased");
    } else { // a  tie
	playerScoreArea.classList.add("tied");
	computerScoreArea.classList.add("tied");
    }

    // Update the UI
    computerPlayInfo.querySelector("img").src = imageSources[computerChoice];
    playerPlayInfo.querySelector("img").src = imageSources[playerChoice];

    computerScoreArea.textContent = useFancyNumber(computerScore);
    playerScoreArea.textContent = useFancyNumber(playerScore);

    if (computerScore === MAX_SCORE || playerScore === MAX_SCORE) {
	gameSelectionButtons.forEach(button => button.remove());
	buttonDock.appendChild(resetButton);

	if (computerScore === MAX_SCORE) {
	    computerWinnerMessageArea.textContent = "Sorry, computer won!";
	} else {
	    playerWinnerMessageArea.textContent = "Congratulations, you won!";
	}

    }
}

// What should happen when game resets
function reset () {
    resetButton.remove();
    gameSelectionButtons.forEach(button => buttonDock.appendChild(button));
    document.body.appendChild(buttonDock);
    playerScore = 0;
    computerScore = 0;

    computerPlayInfo.querySelector("img").src = genericIconSource;
    playerPlayInfo.querySelector("img").src = genericIconSource;
    computerScoreArea.textContent = "???";
    playerScoreArea.textContent = "???";

    computerWinnerMessageArea.textContent = "";
    playerWinnerMessageArea.textContent = "";
}
