"use strict"
export default function Gameboard(setMessage, setCurrentPlayer, ...bothPlayers) {

  // GLOBAL STATE
  const board = []
  const players = [...bothPlayers]
  let round = 1
  let currentPlayer = players[0]
  let gameOver = false

  // FUNCTIONS
  function handleClick(e) {
    if(gameOver) return
    const square = e.target
    if(square.tagName === 'IMG') return // already marked

    // Mark square
    const [row, col] = square.dataset.index.split('-')
    if (board[row][col] instanceof Object) return // already marked
    square.appendChild(currentPlayer.getMark())
    board[row][col] = currentPlayer

    // Check for winner or all squares full(draw)
    if(checkForWinner()) {
      setGameOver()
      return setMessage(`${currentPlayer.getName()} has won the game!`)
    }

    // Next round - change to other player
    if(++round === 10 ) {
      setGameOver()
      return setMessage('The game is a draw.')
    }
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    setCurrentPlayer(currentPlayer)
  }

  function checkForWinner() {
    function checkRow(array) {
      if(array[0] instanceof Array) { // nested array
        return array.map(row => row.every(el => el === row[0])).includes(true)
      }
      return array.every(el => el === array[0])
    }

    function transpose() {
      return board[0].map((_, colIndex) => board.map(row => row[colIndex]))
    }

    function transposeDiagnol(rightToLeft) {
      return board[0].map((_, colIndex) =>
        board[colIndex][rightToLeft ? 2 - colIndex : colIndex]
    )}

    return(
      checkRow(board) ||
      checkRow(transpose()) ||
      checkRow(transposeDiagnol()) ||
      checkRow(transposeDiagnol(true))
    )
  }

  function setGameOver() {
    gameOver = true
    setCurrentPlayer(null)
  }

  function generateGrid() {
    const gameboard = document.createElement('div')
    gameboard.className = 'gameboard'

    for(let row = 0; row < 3; row++) {
      board.push([])
      for(let col = 0; col < 3; col++) {
        // push row-col to make element unique for comparison in checkForWinner
        board[row].push(`${row}-${col}`)
        const square = document.createElement('div')
        square.dataset.index = row + "-" + col
        square.addEventListener('click', handleClick)
        gameboard.appendChild(square)
      }
    }
    return gameboard
  }

  return generateGrid()
}
