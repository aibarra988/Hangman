var wins = 0;
var guessesRemaining = 5;
var wordList = ["Playstation", "Windows 95", "Solo Cups"];
var magicWord = "";

var stageEl = document.getElementById("stage");

var game = {
    progress: "",

    evaluateGuess: function(guess) {
        if (guess) {

        }
    },
    render: function(str) {

    }
};

document.onkeyup = function(event) {
    if (guessesRemaining > 0 && game.progress !== magicWord) {

    }
};