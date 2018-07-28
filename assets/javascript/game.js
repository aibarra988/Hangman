// Refactoring idea: use reduce to determine letter matches in the magic word

var hintEl = document.getElementById("hint");
var stageEl = document.getElementById("stage");
var winsEl = document.getElementById("wins");
var guessCounterEl = document.getElementById("guess-counter");
var attemptsEl = document.getElementById("attempts");
var loseMessageEl = document.getElementById("lose-message");
var winSound = new Audio("assets/audio/my_mac.mp3");
var loseSound = new Audio("assets/audio/windows-95-error-sound-effect.mp3");

var game = {
    attempts: [],
    wordList: [{
        word: "A E S T H E T I C",
        hint: "The driving aspect of vaporwave"
    }, {
        word: "Playstation",
        hint: "Sony's big console debut"
    }, {
        word: "Windows 95", 
        hint: "Microsoft's big hit after 3.1"
    }, {
        word: "Solo Cups",
        hint: "disposable cup with the sweet pattern"
    }, {
        word: "Capitalism",
        hint: "The inescapable machine that governs us all"
    }, {
        word: "Michaelangelo",
        hint: "Greek statue a e s t h e t i c icon"
    }, {
        word: "Crystal Pepsi",
        hint: "Iconic clear soda of the 1990s"
    }],
    magicWord: "",
    setNewMagicWord: function() {
        var randomPick = Math.floor(Math.random() * Math.floor(this.wordList.length));
        this.magicWord = this.wordList[randomPick].word;
        this.hint = this.wordList[randomPick].hint;
    },
    progress: [],
    wins: 0,
    guessCounter: 5,
    findMatch: function(guess) {
        // Check the user's guess against the word
        var lcGuess = guess.toLowerCase();
        var lcMagicWord = this.magicWord.toLowerCase().split("");
        var match = false;
        
        for (var i = 0; i < lcMagicWord.length; i++) {
            // if we get a match, uncover the instances of 
            // the that letter in the magic word
            if (lcMagicWord[i] === lcGuess) {
                match = true;
                this.progress[i] = this.magicWord[i];
            }
        }
        

        // If the failed guess isn't already in our attempts list,
        // add guess to attempts and decrease number of guesses remaining
        if (!(match) && !(this.attempts.includes(lcGuess))) {
            this.attempts.push(guess);
        } 

        return match;
    },
    gameOver: false,
    resetAttempts: function() {
        var self = this;
        this.attempts.forEach(function(letter, index) {
            delete self.attempts[index];
        });
    },
    resetGame: function() {
        this.magicWord = "";
        this.setNewMagicWord();
        this.progress = [];
        this.setProgress();
        this.resetAttempts();
        this.guessCounter = 5;
        loseMessageEl.classList.remove("unhide");
    },
    setProgress: function() {
        for (var i = 0; i < this.magicWord.length; i++) {
            this.progress.push("-");
        }
    },
    render: function() {
        hintEl.textContent = this.hint;
        stageEl.textContent = this.progress.join("");
        winsEl.textContent = this.wins;
        guessCounterEl.textContent = this.guessCounter;
        attemptsEl.textContent = this.attempts.join(" ");
    }
};

// reset button's onclick handler
function resetGame() {
    game.resetGame();
    game.render();
}

// Render a new game when page loads
game.setNewMagicWord();
game.setProgress();
game.render();


// When the user presses a key
document.onkeyup = function(event) {
    var userGuess = event.key;
    var progress = game.progress.join("");
    
    // If our progress matches up to our magic word, we have a winner!
    var winner = progress.replace("-", userGuess) === game.magicWord;

    // Validate user input
    var validInput = /^[a-zA-Z_0-9\s-]$/.test(userGuess);

    if (validInput) {
        
        if (winner) {
            // play a sound
            winSound.play();
            //show that you're a winner!
            game.findMatch(userGuess);
            game.wins++;
            alert("Congratulations! The word is: " + game.magicWord);
            game.resetGame();
        // check if the user has available guesses remaining 
        // and the magic word has not been revealed
        } else if (game.guessCounter > 1 && progress !== game.magicWord) {
            
            // Check the user's guess against the magic word to
            // see if they got a match
            var match = game.findMatch(userGuess);
    

            // if the user didn't get a match
            if (!match) {
                // decrease the number of guesses remaining
                game.guessCounter--;
                
                // WHY DOES THIS WORK?!?!?!
                if (!match) {
                    game.gameOver = true;
                }
            }

    
        } else if (game.gameOver) {
            loseSound.play();
            //then unhide reset button
            loseMessageEl.classList.add("unhide");
        }
    }

    // Refresh the game screen after every user input
    game.render();
};

