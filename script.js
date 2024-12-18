const gameInfo = document.querySelector('#gameInfo')
const boxes = document.querySelectorAll('.box')
const newGameBtn = document.querySelector('#btn')

// initial Variables
let currentPlayer       //either 'X' or 'O'
let gameGrid
const winningPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
/*
Winning Cases:
horizontal win: 0 1 2 or 3 4 5 or 6 7 8
vertical win: 0 3 6 or 1 4 7 or 2 5 8
diagonal win: 0 4 8 or 2 4 6
*/

// Fxn to initialize Game
function initGame() {
    currentPlayer = 'X'
    gameGrid = ['', '', '', '', '', '', '', '', '']
    newGameBtn.classList.remove('active')
    gameInfo.innerText = `Current Player - ${currentPlayer}`

    // the above code make changes in Our JS Code, but we need to make changes in UI as well, so we need to make changes so that when user clicks on 'new game' everything will be reset
    boxes.forEach((box, index) =>{
        box.innerText = ''
        boxes[index].style.pointerEvents = 'all'
        box.classList = `box box${index+1}`
    })
}

initGame()

// To handle boxes (to handle boxes particularly we use evenListner and provide index of that single box) 
boxes.forEach((box, index) => {
    box.addEventListener('click', ()=>{
        handleClick(index)
    })
});

// Fxn to handle each box or changes after each turn
function handleClick(index) {
    if(gameGrid[index] === ''){
        boxes[index].innerText = currentPlayer  //will handle UI
        gameGrid[index] = currentPlayer  //will handle our JS code gameGrid
        boxes[index].computedStyleMap.pointerEvents = 'none'    //if a box is already ticked it can't be ticked again
        swapTurn()  //every time change the turn of player
        checkGameOver()     //check whether anyone wins or not 
    }
}

function swapTurn() {
    if(currentPlayer === 'X')
        currentPlayer = 'O'
    else
        currentPlayer = 'X'

    gameInfo.innerText = `Current Player - ${currentPlayer}`  //UI Update
}

function checkGameOver() {
    let result = ''

    winningPositions.forEach((position) =>{
        // winning condition: ek to sabhi boxes non-empty honee chahiye aur dusra sabhi boxes mee same hii value(X or O) honii chahiye 
        if((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '') && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            // check whether X is the winner or O is winner
            if(gameGrid[position[0]] === 'X')
                result = 'X'
            else
                result = 'O'

            boxes[position[0]].classList.add('win')
            boxes[position[1]].classList.add('win')
            boxes[position[2]].classList.add('win')

            // once we found the winner, we stop the game
            boxes.forEach((box) =>{
                box.style.pointerEvents = 'none'
            })
        }
    })

    // we need display winner on UI and activate new game button
    if(result !== ''){
        gameInfo.innerText = `Winner Player - ${result}`
        newGameBtn.classList.add('active')
        return
    }

    // check whether there is a tied (in case above 'if' consition failed)
    let fillCount = 0
    gameGrid.forEach((box)=>{
        if(box !== '')
            fillCount++
    })

    if(fillCount == 9){
        gameInfo.innerText = 'Game Tied!'
        newGameBtn.classList.add('active')
    }
}

newGameBtn.addEventListener('click', initGame)