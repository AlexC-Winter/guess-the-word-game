const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letters = document.querySelector(".letter");
//Variable letters is for the text input where a letter is guessed
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
// Variable remaining is where it displays the remaining guessess
const guessesLeft = document.querySelector(".remaining span");
//Variable guessess left is where it displays the remaining guesses
const message = document.querySelector(".message");
//Variable message is where a message will display when a guess is made
const playAgain = document.querySelector(".play-again")
//Variable playAgain is the hidden play again button
const word = "magnolia"
//console.log(guessedLetters, button, letters, wordInProgress, remaining, guessesLeft, message, playAgain, word);

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("")
};

placeholder(word);