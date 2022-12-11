import { checkForWinner, checkForWinningSquare, getSquaresWithWinnablePaths } from "./check.js"

export default function Gameboard(setMessage, setCurrentPlayerInDom, ...bothPlayers) {
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
    endRound(row, col, e.target)
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

    endRound(square.row, square.col, findDomSquare(square.row, square.col))
  }

  const findDomSquare = (row, col) =>
    [...document.querySelectorAll('.gameboard div')].find(s => s.dataset.index === `${row}-${col}`)

  const updateBoard = (row, col) => board[row][col].owner = currentPlayer.id
  const updateDom = domSquare => domSquare.appendChild(currentPlayer.mark)

  function endRound(row, col, domSquare) {
    updateBoard(row, col)
    updateDom(domSquare)

    if(checkForWinner(board)) {
      setGameOver()
      return setMessage(`${currentPlayer.playerName} has won the game!`)
    }

    if(++roundNumber === 10 ) {
      setGameOver()
      return setMessage('The game is a draw.')
    }

    setCurrentPlayer(currentPlayer === players[0] ? players[1] : players[0])
    if(currentPlayer.isComputer) timeout = setTimeout(computerMove, 750)
  }

  function setCurrentPlayer(player) {
    currentPlayer = player
    setCurrentPlayerInDom(player)
  }

  function setGameOver() {
    gameOver = true
    setCurrentPlayerInDom(null)
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
