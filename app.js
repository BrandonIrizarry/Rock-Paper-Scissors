/*
Rock, paper, scissors:

rock = 0
paper = 1
scissors = 2

Numbers are compared in the usual way: a greater number beats a
smaller number. But there is one twist. If the difference between the
two numbers is 2, the smaller of the two numbers wins.
*/


// Return 'true' if the player wins.
function playerWins(computerChoice, playerChoice) {
    return computerChoice - playerChoice === 2 // computer: scissors; player: rock
	|| computerChoice > playerChoice; // any other play
}


function getComputerChoice () {
    return Math.floor(Math.random() * 3);
}
