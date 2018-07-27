// fixme: progress won't clear after winning the game


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
    gameOver: false,
    evaluateGuess: function(guess) {
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
        
        if (!match) this.attempts.push(guess);
        return match;
    },
    setProgress: function(letter) {
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

game.setNewMagicWord();
game.setProgress();
game.render();


// When the user presses a key
document.onkeyup = function(event) {
    var userGuess = event.key;
    var progress = game.progress.join("");
    var winner = progress.replace("-", userGuess) === game.magicWord;

    // Validate user input
    var validInput = /^[a-zA-Z_0-9\s-]$/.test(userGuess);

    if (validInput) {
        // check if the user has available guesses remaining 
        // and the magic word has not been revealed
        
        // If our progress matches up to our magic word,
        // we have a winner!

        if (winner) {
            console.log("woohoo!");
            game.evaluateGuess(userGuess);
            game.wins++;
            game.guessCounter = 5;
            game.progress = [];
        } else if (game.guessCounter > 1 && progress !== game.magicWord) {
            
            // Check the user's guess against the magic word to
            // see if they got a match
            var match = game.evaluateGuess(userGuess);
    

            // if the user didn't get a match
            if (!match) {
                // decrease the number of guesses remaining
                game.guessCounter--;
            }

    
        } else if (game.gameOver) {
            document.write("Game Over! Try Again?");
            //then unhide reset button
        }
    }

    game.render();
};

