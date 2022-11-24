"use strict"
export default (function Gameboard() {

  // GLOBAL STATE
  const board = []
  const players = []
  let currentPlayer

  // FUNCTIONS
  function generate(...bothPlayers) {
    players.push(...bothPlayers)
    currentPlayer = players[0]

    for (let row = 0; row < 3; row++) {
      board.push([])
      for (let col = 0; col < 3; col++) {
        board[row].push(`${row}-${col}`)
        const square = document.createElement('div')
        square.dataset.index = row + "-" + col
        square.addEventListener('click', handleClick)
        document.querySelector('.gameboard').appendChild(square)
      }
    }
  }

  function handleClick(e) {
    const square = e.target
    if(square.textContent) return // square already marked

    // Mark square
    const [row, col] = square.dataset.index.split('-')
    square.textContent = currentPlayer.getMark()
    board[row][col] = currentPlayer.getMark()

    // Check for winner or all squares full(tie)
    if(checkForWinner()) return gameOver(currentPlayer)
    if(board.every(square => players.includes(square))) gameOver()

    // Next round - change to other player
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
  }

  function checkForWinner() {
    function checkRow(array) {
      if(array[0] instanceof Array) { // nested array
        return array.map(row => row.every(el => el === row[0])).includes(true)
      }
      return array.every(el => el === array[0])
    }

    function transpose() {
      return board[0].map((_, colIndex) =>
        board.map(row => row[colIndex])
      )
    }

    function transposeDiagnol(rightToLeft) {
      return board[0].map((_, colIndex) =>
        board[colIndex][rightToLeft ? 2 - colIndex : colIndex]
      )
    }

    return(
      checkRow(board) ||
      checkRow(transpose()) ||
      checkRow(transposeDiagnol()) ||
      checkRow(transposeDiagnol(true))
    )
  }

  function gameOver(winner) {
    if (winner) console.log(`Winner is ${winner.getName()}`)
    else console.log("It's a tie")
  }

  return { generate }
})()
