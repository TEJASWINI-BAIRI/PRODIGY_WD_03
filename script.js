console.log("Welcome to Tic Tac Toe");
let music = new Audio("bgm.mp3"); // Initialize background music
let turn = "X";
let isgameover = false;
let isMusicPlaying = false; // Track if the music is already playing
let turnCount = 0; // Track the number of turns

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "300px"; // Increase size of GIF
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";

            // Display congratulations message and reset the game
            setTimeout(() => {
                alert("Congratulations! " + boxtext[e[0]].innerText + " has won! Click OK to reset the game.");
                resetGame(); // Reset the game when the user clicks OK
            }, 500); // Delay added to allow the winning line to appear before the alert
        }
    });

    // Check for draw
    if (turnCount === 9 && !isgameover) {
        alert("It's a draw! Click OK to reset the game.");
        resetGame(); // Reset the game when the user clicks OK
    }
}

// Function to reset the game
const resetGame = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    turnCount = 0; // Reset turn count
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0"; // Hide the GIF again
    isMusicPlaying = false; // Allow the music to start again after a reset
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (!isMusicPlaying) { // Play music on the first click
            music.play();
            isMusicPlaying = true;
        }
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turnCount++; // Increment the turn count
            turn = changeTurn();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', resetGame);
