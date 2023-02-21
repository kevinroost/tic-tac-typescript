"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let player;
let name1;
let name2;
let rendered;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const resetBtn = document.querySelector('#reset-btn');
const nameInput = document.querySelector('#name');
const nameBtn = document.querySelector('#submit-name');
console.log(squareEls);
console.log(messageEl);
/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick);
resetBtn.addEventListener('click', init);
nameBtn.addEventListener('click', getName);
/*-------------------------------- Functions --------------------------------*/
function init() {
    nameInput.style.display = 'block';
    nameInput.value = '';
    nameBtn.style.display = 'block';
    name1 = '';
    name2 = '';
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    turn = -1;
    winner = false;
    tie = false;
    messageEl.textContent = `Player 1: What's your name?`;
    updateBoard();
}
function render() {
    updateBoard();
    updateMessage();
    rendered = true;
}
function getName() {
    if (!nameInput.value) {
        messageEl.textContent = messageEl.textContent + "?";
        return;
    }
    else if (!name1) {
        name1 = nameInput.value;
        nameInput.value = '';
        messageEl.textContent = `Player 2: What's your name?`;
    }
    else {
        name2 = nameInput.value;
        nameInput.style.display = 'none';
        nameBtn.style.display = 'none';
        boardEl.classList.add('goTime');
        updateMessage();
    }
}
function updateMessage() {
    player = turn === -1 ? name1 : name2;
    messageEl.textContent = winner === false && tie === false ? `It's ${player}'s turn!`
        : winner === false && tie === true ? `It's a tie!`
            : `Congratulations! ${player} wins!`;
}
function updateBoard() {
    for (let i = 0; i <= 8; i++) {
        if (board[i] === -1) {
            console.log(squareEls[i]);
            squareEls[i].textContent = 'X';
        }
        else if (board[i] === 1) {
            squareEls[i].textContent = 'O';
        }
        else
            squareEls[i].textContent = null;
    }
}
function placePiece(idx) {
    board[idx] = turn;
    console.log(board);
}
function checkForTie() {
    const hasNull = board.some(function (idx) {
        return idx === 0;
    });
    if (hasNull) {
        tie = false;
    }
    else
        tie = true;
}
function checkForWinner() {
    winner = winningCombos.some(function (combo) {
        let total = 0;
        combo.forEach(i => {
            total += board[i];
        });
        let absTotal = Math.abs(total);
        return absTotal === 3;
    });
}
function handleClick(evt) {
    if (!name1 || !name2) {
        messageEl.textContent = messageEl.textContent + "?";
        return;
    }
    // if (!evt.target || !('sqr' in evt.target)) return
    if (!(evt.target instanceof HTMLElement))
        return;
    console.log('event', evt.target);
    const sqIdx = parseInt(evt.target.id.slice(-1));
    if (board[sqIdx] || winner === true)
        return;
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function switchPlayerTurn() {
    turn = (winner) ? turn : (turn * -1);
}
init();
