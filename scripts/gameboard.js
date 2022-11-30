"use strict"
import { checkForWinner, checkForWinningSquare } from "./check.js"

export default function(setMessage, setCurrentPlayer, ...bothPlayers) {
  // GLOBAL STATE
  const board = []
  const players = [...bothPlayers]
  let round = 1
  let currentPlayer = players[0]
  let gameOver = false
  let timeout

  // FUNCTIONS
  function handleClick(e) {
    if(timeout || gameOver) return
    const domSquare = e.target
    if(domSquare.tagName === 'IMG') return // already marked

    // Mark square
    const [row, col] = domSquare.dataset.index.split('-')
    if (board[row][col].owner !== 0) return // already marked

    endRound(domSquare, row, col)
  }

  function computerMove() {
    timeout = null
    let freeSquare = checkForWinningSquare(board, currentPlayer) ||
      checkForWinningSquare(board, players[0])
    console.log(freeSquare)

    // Find a random free square
    if(!freeSquare) {
      const freeSquares = board.map(row => row.filter(square => square.owner === 0)).flat()
      freeSquare = freeSquares[Math.floor(Math.random() * freeSquares.length)]
    }

    // Find matching square in document
    const domSquares = [...document.querySelectorAll('.gameboard div')]
    const domSquare = domSquares.find(s => s.dataset.index === `${freeSquare.row}-${freeSquare.col}`)

    endRound(domSquare, freeSquare.row, freeSquare.col)
  }

  function endRound(domSquare, row, col) {
    // Draw mark and update square ownership in board array
    domSquare.appendChild(currentPlayer.getMark())
    board[row][col].owner = currentPlayer.getId()

    // Check for winner
    if(checkForWinner(board)) {
      setGameOver()
      return setMessage(`${currentPlayer.getName()} has won the game!`)
    }

    // All squares are full
    if(++round === 10 ) {
      setGameOver()
      return setMessage('The game is a draw.')
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    setCurrentPlayer(currentPlayer)
    if(currentPlayer.isComputer()) timeout = setTimeout(computerMove, 750)
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
        board[row].push({ row, col, owner: 0 })
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
