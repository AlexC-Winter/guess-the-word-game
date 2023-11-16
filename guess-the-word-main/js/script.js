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
const letterGuesses = []
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

button.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letters.value;
    console.log(guess)
    letters.value = ""
    message.innerText = ""
    const letterInput = validateLetter(guess)
    if (letterInput) {
        makeGuess(guess)
    }
});

const validateLetter = function(input){
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0){
        message.innerText = "Guess a letter from A-Z!"
    } else if (input.length > 1){
        message.innerText = "Please guess one letter at a time!"
    } else if ( !input.match(acceptedLetter)){
        message.innerText = "Please guess a letter from A-Z"
    } else {
        return input
    }
}

const makeGuess = function(guess){
    guess = guess.toUpperCase()
    if (letterGuesses.includes(guess)){
        message.innerText = "You've already guessed that one!"
    } else {
        letterGuesses.push(guess)
        console.log(letterGuesses)
        showGuessedLetter()
        wordProgress(letterGuesses)
    }
}

const showGuessedLetter = function() {
    guessedLetters.innerHTML = ""
    for (const letter of letterGuesses) {
        const li = document.createElement("li")
        li.innerText = letter;
        guessedLetters.append(li)
    }
}

const wordProgress = function(letterGuesses){
    const wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
    const revealWord = [];
    for (const letter of wordArray) {
        if (letterGuesses.includes(letter)) {
            revealWord.push(letter.toUpperCase())
        } else {
            revealWord.push("●")
        }
    }
    wordInProgress.innerText = revealWord.join("")
    checkIfWin()
}

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };