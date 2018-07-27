// Refactoring idea: use reduce to determine letter matches in the magic word

var stageEl = document.getElementById("stage");
var winsEl = document.getElementById("wins");
var guessCounterEl = document.getElementById("guess-counter");
var attemptsEl = document.getElementById("attempts");

var game = {
    attempts: [],
    wordList: ["Playstation", "Windows 95", "Solo Cups"],
    magicWord: "",
    setNewMagicWord: function() {
        this.magicWord = this.wordList[Math.floor(Math.random() * Math.floor(this.wordList.length))];
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
        if (!match && !(this.attempts.includes(lcGuess))) {
            this.attempts.push(guess);
        } 

        return match;
    },
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
    },
    setProgress: function() {
        for (var i = 0; i < this.magicWord.length; i++) {
            this.progress.push("-");
        }
    },
    render: function(str) {
        stageEl.textContent = this.progress.join("");
        winsEl.textContent = this.wins;
        guessCounterEl.textContent = this.guessCounter;
        attemptsEl.textContent = this.attempts.join(" ");
    }
};

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
    var gameOver = false;

    // Validate user input
    var validInput = /^[a-zA-Z_0-9\s-]$/.test(userGuess);

    if (validInput) {
        
        if (winner) {
            console.log("woohoo!");
            game.findMatch(userGuess);
            game.wins++;
            game.resetGame();
        // check if the user has available guesses remaining 
        // and the magic word has not been revealed
        } else if (game.guessCounter > 1 && progress !== game.magicWord) {
            
            // Check the user's guess against the magic word to
            // see if they got a match
            var match = game.findMatch(userGuess);
    

            // if the user didn't get a match
            if (!match && !(game.attempts.includes(userGuess))) {
                // decrease the number of guesses remaining
                game.guessCounter--;

                // WHY DOES THIS WORK?!?!?!
                if (game.guessCounter === 1) {
                    game.gameOver = true;
                }
            }

    
        } else if (game.gameOver) {
            document.write("Game Over! Try Again?");
            //then unhide reset button
        }
    }

    // Refresh the game screen after every user input
    game.render();
};

