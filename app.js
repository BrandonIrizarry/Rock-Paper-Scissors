/*
Rock, paper, scissors:

rock = 0
paper = 1
scissors = 2

Numbers are compared in the usual way: a greater number beats a
smaller number. But there is one twist. If the difference between the
two numbers is 2, the smaller of the two numbers wins.
*/

// Game key
const gameKey = ["rock", "paper", "scissors"];
const playerKey = { rock: 0, paper: 1, scissors: 2 };

// Return 'true' if the player wins.
function playerWins (computerChoice, playerChoice) {
    return computerChoice - playerChoice === 2 // computer: scissors; player: rock
	|| computerChoice < playerChoice; // any other play
}

// Return a string indicating the winner.
// Don't interpret top-level user-input yet.
function playRound (playerChoice) {
    const computerChoice = Math.floor(Math.random() * 3);
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
	    alert("bye!");
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
	const playerInteger = playerKey[playerInput];

	console.assert(typeof playerInteger === "number" && 0 <= playerInteger && playerInteger <= 2);

	alert(playRound(playerInteger));
    }
}
