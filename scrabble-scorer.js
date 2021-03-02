// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n")
  word = input.question("Enter a word to score: ");
  
  return word;
};

let simpleScore = function(word) {
  let score = 0;
  word = word.toUpperCase();

  for (let i = 0; i < word.length; i++) {
    score++;
  }
  return score;
}

let vowelBonusScore = function(word) {
  word = word.toUpperCase();
	let score = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	if (word[i] == 'A' || word[i] == 'E' || word[i] == 'I' || word[i] == 'O' || word[i] == 'U' ) {
      score += 3;
    } else {
      score ++;
    }
	}
	return score;
}

let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
}

const scoringAlgorithms = [({
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScore
}),
({name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScore
  }),
({name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScore
  })];

function scorerPrompt() {
  let scoreType = input.question(`Which scoring algorithm would you like to use? \nEnter 0, 1, or 2: `);
  while (scoreType < 0 || scoreType > 2 || isNaN(scoreType)) {
    scoreType = input.question(`Which scoring algorithm would you like to use? \nEnter 0, 1, or 2: `);
  }
  if (Number(scoreType) === 0) {
    console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
  } else if (Number(scoreType) === 1) {
    console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
  } else if (Number(scoreType) === 2) {
    console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
  }
}

function transform(obj) {
  let scoreStructure = {};
  let letter = '';
  for (key in obj) {
    for (let i = 0; i < obj[key].length; i++) {
      let letter = obj[key][i];
      letter = letter.toLowerCase();
      scoreStructure[letter] = Number(key);
    }
  }
    
  return scoreStructure;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
   initialPrompt();
   scorerPrompt();

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

