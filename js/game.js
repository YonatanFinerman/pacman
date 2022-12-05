'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '*'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard

function onInit() {
    var elBtn = document.querySelector('button')
    elBtn.style.display = 'none'
    gGhosts = []
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
     var cheries = setInterval(randomNewCherry,15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i===1 && j===1) board[i][j] = POWERFOOD
            if (i===8 && j===1) board[i][j] = POWERFOOD
            if (i===1 && j===8) board[i][j] = POWERFOOD
            if (i===8 && j===8) board[i][j] = POWERFOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    var elBtn = document.querySelector('button')
    elBtn.style.display = 'block'
    clearInterval(cheries)
}

function isFoodLeft() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            // if(gBoard[i][j]===FOOD) return
            if(gBoard[i][j]===FOOD || gBoard[i][j]===POWERFOOD || gBoard[i][j]=== CHERRY) return
        }
    }
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    gameOver()
}
function closeModal(){
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

}