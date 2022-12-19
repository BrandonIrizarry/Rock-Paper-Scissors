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

// Game keys
const gameKey = ["rock", "paper", "scissors"];
const playerKey = { rock: 0, paper: 1, scissors: 2 };

// Return 'true' if the player wins.
function playerWins (computerChoice, playerChoice) {
    const condition = !(playerChoice - computerChoice === 2) &&
	  (computerChoice - playerChoice === 2 || computerChoice < playerChoice);

    return condition;
}

// 'playerChoice' is an integer (0,1,2) correspoding to a player choice.
// Return a string indicating the winner.
function playRound (playerChoice) {
    const computerChoice = Math.floor(Math.random() * 3);

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

const messageArea = document.querySelector("#message");
const computerScoreArea = document.querySelector("#computer > .score");
const playerScoreArea = document.querySelector("#player > .score");
let computerScore = 0;
let playerScore = 0;

gameSelectionButtons.forEach(button => {
    button.addEventListener("click", e => {
	const playName = e.target.dataset.name;

	const message = playRound(playerKey[playName]);

	// If round is a tie, don't increment any scores
	if (message.match("win")) {
	    playerScore++;
	} else if (message.match("lose")) {
	    computerScore++;
	}

	// Update the UI
	messageArea.textContent = message;
	computerScoreArea.textContent = computerScore;
	playerScoreArea.textContent = playerScore;
    });
});
