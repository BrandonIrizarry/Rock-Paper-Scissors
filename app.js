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

function getInput (roundNumber) {
    while (true) {
	const playerInput = prompt(`Your move for round ${roundNumber}`);

	if (!playerInput) {
	    return false; // forward to the caller
	}

	if (gameKey.includes(playerInput.toLowerCase())) {
	    return playerInput;
	}

	alert("Invalid choice: try again");
    }
}

function game () {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
	const playerInput = getInput(i + 1);

	if (!playerInput) {
	    alert("Bye!");
	    return; // Don't worry about displaying score information if user quits.
	}

	const playerInteger = playerKey[playerInput];

	// Main event: play the round
	const message = playRound(playerInteger);

	alert(message);

	// Simple way to determine winner of round
	if (message.match("win")) {
	    playerScore++;
	} else if (message.match("lose")) {
	    computerScore++;
	}

	// else, round was a tie: don't increment any scores.

    }

    alert(`player: ${playerScore}; computer: ${computerScore}`);
}
