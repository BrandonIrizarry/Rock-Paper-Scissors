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
	|| computerChoice > playerChoice; // any other play
}

function playRound (pname) {
    const computerChoice = Math.floor(Math.random() * 3);
    const playerChoice = playerKey[pname];

    const playerWon = playerWins(playerChoice, computerChoice);

    const cname = gameKey[computerChoice];

    if (playerWon) {
	return `You win! ${pname} beats ${cname}`;
    }

    return `You lose: ${cname} beats ${pname}`;
}

function game () {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
	const playerInput = prompt(`Your move for round ${i + 1}`);

	if (!playerInput) {
	    alert("bye!");
	    break;
	}

	alert(playerInput);
    }
}

game();
