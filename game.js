const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let results = {
  wins: 0,
  losses: 0,
  draws: 0
};

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    results.draws += 1;
    return '\x1b[33mIt is a tie!\x1b[0m';  
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'rock')
  ) {
    results.wins += 1;
    return '\x1b[32mYou Won!\x1b[0m';  
  } else {
    results.losses += 1;
    return '\x1b[31mYou Lost!\x1b[0m'; 
  }
}

function displayResults() {
  console.log("\x1b[34mYour Results:\x1b[0m");  
  console.log(`Wins: ${results.wins}`);
  console.log(`Losses: ${results.losses}`);
  console.log(`Draws: ${results.draws}`);
}

function startGame() {
  rl.question("Choose 'rock', 'paper', or 'scissors' or type 'results' to see your game statistics: ", (userChoice) => {
    if (userChoice === 'results') {
      displayResults();
      return playAgain();
    }

    if (!['rock', 'paper', 'scissors'].includes(userChoice)) {
      console.log("Invalid choice. Please choose 'rock', 'paper', or 'scissors'.");
      return startGame();
    }

    const computerChoice = getComputerChoice();
    console.log('You chose:', userChoice);
    console.log('Computer chose:', computerChoice);
    console.log(determineWinner(userChoice, computerChoice));
    playAgain();
  });
}

function playAgain() {
  rl.question("\nDo you want to play again? (yes/no) ", (answer) => {
    if (answer.toLowerCase() === 'yes') {
      startGame();
    } else {
      rl.close();
      console.log("\x1b[36mThanks for playing!\x1b[0m");  
    }
  });
}

startGame();
