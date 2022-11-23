const CHOICES = ["paper", "rock", "scissors"];

function getComputerChoice () {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

// Helper function to identify the state of the current round.
// We'll handle the message generation in a separate function.
function round(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    switch(playerSelection) {
    case "paper":
	switch (computerSelection) {
	case "paper": return "tie";
	case "rock" : return "computer";
	case "scissors": return "player";
	default: throw new Error(`Unknown computer selection: ${computerSelection}`);
	}
	break;
    case "rock":
	switch (computerSelection) {
	case "paper": return "computer";
	case "rock": return "tie";
	case "scissors": return "player";
	default: throw new Error(`Unknown computer selection: ${computerSelection}`);
	}
	break;
    case "scissors":
	switch (computerSelection) {
	case "paper": return "player";
	case "rock": return "computer";
	case "scissors": return "tie";
	default: throw new Error(`Unknown computer selection: ${computerSelection}`);
	}
	break;
    default:
	throw new Error(`Unknown player selection: ${playerSelection}`);
    }
}

function playRound (playerSelection, computerSelection) {
    const gameState = round(playerSelection, computerSelection);

    switch (gameState) {
    case "player":
	return {gameState, message: `You win! Your ${playerSelection} beats computer's ${computerSelection}.`};
    case "computer":
	return {gameState, message: `You lose! Your ${playerSelection} loses to computer's ${computerSelection}.`};
    case "tie":
	console.assert(playerSelection === computerSelection);
	return {gameState, message: `It was tie. Both you and the computer made the same play: ${playerSelection}.`};
    default:
	throw new Error(`Unknown game state: ${gameState}`);
    }
}


function game () {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
	let playerSelection = null;

	while (true) {
	    playerSelection = prompt(`Round ${i + 1}\nEnter your play for this round`);

	    // Expand abbreviations like "r" for "rock"
	    for (let choice of CHOICES) {
		if (choice.startsWith(playerSelection)) {
		    playerSelection = choice;
		    break;
		}
	    }

	    // 'null' is to detect the user clicking "Cancel"
	    if (["q", "quit", "exit", "", null].includes(playerSelection)) {
		alert("Thanks for playing. Bye.");
		return {status: "quit", playerScore, computerScore};
	    }

	    if (!(CHOICES.includes(playerSelection))) {
		alert("Invalid choice for this round; try again.");
		continue;
	    }

	    break;
	}

	const computerSelection = getComputerChoice();
	const {gameState, message} = playRound(playerSelection, computerSelection);

	// Update the score
	switch (gameState) {
	case "player":
	    playerScore++;
	    break;
	case "computer":
	    computerScore++;
	    break;
	case "tie":
	    break;
	default:
	    throw new Error(`Unknown game state: ${gameState}`);
	}

	// Report the results of the round
	alert(message);
    }

    return {status: "normal", playerScore, computerScore};
}

const gameData = game();

if (gameData.status === "normal") {
    const {playerScore, computerScore} = gameData;
    const winnerMessage = reportWinner(playerScore, computerScore);

    alert(`Your score: ${playerScore}\nComputer's score: ${computerScore}\n${winnerMessage}`);
}

function reportWinner(playerScore, computerScore) {
    if (playerScore > computerScore) return "You win!";
    if (playerScore < computerScore) return "You lose!";
    if (playerScore === computerScore) return "It's a tie!";

    throw new Error("Something went horribly wrong!");
}
