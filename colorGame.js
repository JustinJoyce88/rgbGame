var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
    setModeButtons();
    setSquares();
    reset();
}

function setModeButtons() {
    // loops through all buttons of class ".mode", on click adds selects class.
    // picks the numbers of squares for difficulty and runs reset function.
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function setSquares() {
    //loops through squares, on click sets color to background color if wrong color.
    //if right color, change all squares to correct color ask to play again.
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            var clicked = this.style.backgroundColor;

            if (clicked === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clicked);
                h1.style.backgroundColor = clicked;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    //generates colors
    colors = generateColors(numSquares);
    //picks one of them from array
    pickedColor = pickColor();
    //change color picked to display in h1 
    colorDisplay.textContent = pickedColor;
    //reset color of h1 to default for new game
    h1.style.backgroundColor = "steelblue";
    //remove correct or try again text
    messageDisplay.textContent = "";
    //reset button to say new colors
    resetButton.textContent = "New Colors";
    //fills each square with one of the randomly generated colors.
    //if no color for square, hide square
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateColors(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}