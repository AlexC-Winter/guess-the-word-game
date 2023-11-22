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
let word = "magnolia"
const letterGuesses = []
let remainingGuesses = 8
//console.log(guessedLetters, button, letters, wordInProgress, remaining, guessesLeft, message, playAgain, word);

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };
  
  // Start the game
  getWord();

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("")
};

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
        updateGuessesRemaining(guess)
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

const updateGuessesRemaining = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
      message.innerText = `Sorry, the word has no ${guess}.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
  
    if (remainingGuesses === 0) {
      message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
      guessesLeft.innerText = `${remainingGuesses} guess`;
    } else {
      guessesLeft.innerText = `${remainingGuesses} guesses`;
    }
}

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };

  const startOver = function () {
    button.classList.add("hide");
    remaining.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgain.classList.remove("hide");
  };
  
  playAgain.addEventListener("click", function () {
    // reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    guessesLeft.innerText = `${remainingGuesses} guesses`;
    guessedLetters.innerHTML = "";
    message.innerText = "";
    // Grab a new word
    getWord();
  
    // show the right UI elements
    button.classList.remove("hide");
    playAgain.classList.add("hide");
    remaining.classList.remove("hide");
    guessedLetters.classList.remove("hide");
  });