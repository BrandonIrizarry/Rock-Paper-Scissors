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

const sources = [
    "assets/alpine-landscape-rock-rubble-01a-al1.svg",
    "assets/Legal-Paper.svg",
    "assets/edit-cut.svg"
];

// Game keys
const gameKey = ["rock", "paper", "scissors"];
const playerKey = { rock: 0, paper: 1, scissors: 2 };
const playerImages = gameKey.map((_, i) => {
    const img = document.createElement("img");
    img.src = sources[i];
    return img;
});

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

const messageArea = document.querySelector("#message");
const computerScoreArea = document.querySelector("#computer .score");
const playerScoreArea = document.querySelector("#player .score");
const computerPlayInfo = document.querySelector("#computer .play");
const playerPlayInfo = document.querySelector("#player .play");

let computerScore = 0;
let playerScore = 0;
const MAX_SCORE = 5;

gameSelectionButtons.forEach(button => button.addEventListener("click", game));

// 'playInfo' is the DOM Node where player info is supposed to
// appear. This info should be graphical in natural, in the form of an
// image associated with the given side's current play.
function updatePlayInfo (playInfo, choice) {
    let currentImage = playInfo.querySelector("img");
    if (currentImage) currentImage.remove();
    playInfo.appendChild(playerImages[choice].cloneNode());
}

// Create 'useFancyNumber' using a factory, to avoid creating and
// defining 'fancy' with each invocation.
const useFancyNumber = (() => {
    const base = 0x2460; // ①

    const fancy = Array.from({length: 20}, (_, i) => i)
	  .map(index => {
	      return String.fromCodePoint(base + index);
	  });

    // Add zero as a special case
    fancy.unshift("⓪");

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
    } else if (message.match("lose")) {
	computerScore++;
    }

    // Update the UI
    messageArea.textContent = message;

    updatePlayInfo(computerPlayInfo, computerChoice);
    updatePlayInfo(playerPlayInfo, playerChoice);

    computerScoreArea.textContent = useFancyNumber(computerScore);
    playerScoreArea.textContent = useFancyNumber(playerScore);

    // If one of the scores has reached 5, announce a winner
    maybeCleanup(computerScore, playerScore);
}

function maybeCleanup (computerScore, playerScore) {
    if (computerScore < MAX_SCORE && playerScore < MAX_SCORE) return;

    if (computerScore === 5) {
	messageArea.textContent = "Computer won, sorry.";
    } else if (playerScore === 5) {
	messageArea.textContent = "You win, congratulations!";
    }

    gameSelectionButtons.forEach(button => button.removeEventListener("click", game));
}
