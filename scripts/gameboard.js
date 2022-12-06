"use strict"
import { checkForWinner, checkForWinningSquare, getSquaresWithWinnablePaths } from "./check.js"

export default function Gameboard(setMessage, setCurrentPlayer, ...bothPlayers) {
  // GLOBAL STATE
  const board = []
  const players = [...bothPlayers]
  let roundNumber = 1
  let currentPlayer = players[0]
  let gameOver = false
  let timeout

  // FUNCTIONS
  function handleClick(e) {
    if(timeout || gameOver) return
    if(e.target.tagName === 'IMG') return // already marked
    const [row, col] = e.target.dataset.index.split('-')
    if (board[row][col].owner !== 0) return // already marked
    endRound(e.target, row, col)
  }

  function computerMove() {
    timeout = null
    let square = checkForWinningSquare(board, currentPlayer) ||
      checkForWinningSquare(board, players[0])

    // Get array of free squares that have a winnable path
    if(!square) {
      const winnable = getSquaresWithWinnablePaths(board)
      const veryWinnable = winnable.filter(s => s.numPaths > 1)
      const bestSquaresToPlay = veryWinnable.length ? veryWinnable : winnable
      square = bestSquaresToPlay[Math.floor(Math.random() * bestSquaresToPlay.length)]
    }

    // Computer cannot win now so just find a random free square
    if(!square) {
      const squares = board.map(row => row.filter(square => square.owner === 0)).flat()
      square = squares[Math.floor(Math.random() * squares.length)]
    }

    // Find matching square in document
    const domSquares = [...document.querySelectorAll('.gameboard div')]
    const domSquare = domSquares.find(s => s.dataset.index === `${square.row}-${square.col}`)

    endRound(domSquare, square.row, square.col)
  }

  function endRound(domSquare, row, col) {
    // Draw mark and update square ownership in board array
    domSquare.appendChild(currentPlayer.mark)
    board[row][col].owner = currentPlayer.id

    if(checkForWinner(board)) {
      setGameOver()
      return setMessage(`${currentPlayer.playerName} has won the game!`)
    }

    if(++roundNumber === 10 ) {
      setGameOver()
      return setMessage('The game is a draw.')
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    setCurrentPlayer(currentPlayer)
    if(currentPlayer.isComputer) timeout = setTimeout(computerMove, 750)
  }

  function setGameOver() {
    gameOver = true
    setCurrentPlayer(null)
  }

  // ENTRY POINT - Create and return gameboard
  const gameboard = document.createElement('div')
  gameboard.className = 'gameboard'

  for(let row = 0; row < 3; row++) {
    board.push([])
    for(let col = 0; col < 3; col++) {
      board[row].push({ row, col, owner: 0 })
      const square = document.createElement('div')
      square.dataset.index = row + "-" + col
      square.addEventListener('click', handleClick)
      gameboard.appendChild(square)
    }
  }
  return gameboard
}
