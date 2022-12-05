'use strict'

const PACMAN = '😷'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]


    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (!gPacman.isSuper) {
        if (nextCell === GHOST) {
            gameOver()
            return
        }
    }
    if (gPacman.isSuper) {
        if (nextCell === GHOST) {
            console.log(nextCell)
            KillGhost(nextLocation)
        }
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === POWERFOOD) {
        if(gPacman.isSuper) return
        gPacman.isSuper = true
        // var elGhosts = document.querySelectorAll('.cell span')
        // elGhosts.style.color = 'blue'
        // console.log(gPacman.isSuper)
        setTimeout(turnNormal, 5000)
        // setTimeout(console.log(gPacman.isSuper),5000)
    }
    function turnNormal(){
        // console.log(gPacman.isSuper)
        gPacman.isSuper = false
        // console.log(gPacman.isSuper)
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
    isFoodLeft()
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}