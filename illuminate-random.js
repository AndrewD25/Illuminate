/*
Andrew Deal
PM Class
CYO Game - Illuminate (Based on Lights Out)
*/

//// Setup and Variables ////
"use strict";

// Create an Array to store the buttons //
let boxes = [];
let states = [];
const mainDiv = document.getElementById("main");
let seed = ""

for (let i = 0; i < 100; i++) {
    let row = document.createElement("div");
    let newButton = document.createElement("button"); //class="lightbutton" id=${i}
    newButton.className = "lightbutton";
    newButton.id = i;
    row.className = "lightbox";
    row.appendChild(newButton);
    mainDiv.appendChild(row);
    boxes.push(document.getElementById(i));
    let bool = -1 === (Math.round(Math.random()) * 2 - 1);
    if (bool) {
        seed += "t";
    } else {
        seed += "f";
    }
    states.push(bool);
}
console.log("seed: " + seed);

//// Functions ////
function colorBoxes() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = states[i] ? "Yellow" : "Black";
    }
}

function checkWin() {
    for (let i = 0; i < 100; i++) {
        if (states[i] === false) {
            return false;
        }
    }
    return true;
}

for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function() {
        var index = boxes.indexOf(this);
        states[index] = !states[index];
        if (index + 1 < 10 || String(index + 1)[0] === String(index)[0]) {
            states[index + 1] = !states[index + 1];
        }
        if (index - 1 < 9 || String(index - 1)[0] === String(index)[0]) {
            states[index - 1] = !states[index - 1];
        }
        if (index + 10 < 100) {
            states[index + 10] = !states[index + 10];
        }
        if (index - 10 >= 0) {
            states[index - 10] = !states[index - 10];
        }
        colorBoxes();
    });
}

function updateScore(lit, unlit) {
    document.getElementById("lit").textContent = lit;
    document.getElementById("unlit").textContent = unlit;
}

function count() {
    let lit = states.filter((x) => x === true).length;
    let unlit = 100 - lit;
    updateScore(lit, unlit);
}

//// Main "Loop" ////
colorBoxes();
setInterval(() => {
    count();
}, 5);

