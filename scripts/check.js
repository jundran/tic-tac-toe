"use strict"
function transpose(board) {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]))
}

function transposeDiagnol(board, rightToLeft) {
  return board[0].map((_, colIndex) =>
    board[colIndex][rightToLeft ? 2 - colIndex : colIndex]
)}

export function checkForWinner(board) {
  function checkRow(array) {
    if(array[0] instanceof Array) {
      return array.map(row => row.every(el => el.owner > 0 && el.owner === row[0].owner)).includes(true)
    }
    else {
      return array.every(el => el.owner > 0 && el.owner === array[0].owner)
    }
  }

  return(
    checkRow(board) ||
    checkRow(transpose(board)) ||
    checkRow(transposeDiagnol(board)) ||
    checkRow(transposeDiagnol(board, true))
  )
}

export function checkForWinningSquare(board, currentPlayer) {
  function checkRow(array) {
    if(array[0] instanceof Array) {
      const a = array.filter(row => {
        const r = row.filter(cell => cell.owner === currentPlayer.getId())
        if(r.length === 2) return r
      })

      if(a.length) {
        const winningSquare = a.flat().filter(cell => cell.owner === 0)
        // False if square is marked by opponent, else it's empty (owner: 0)
        return winningSquare[0] || false
      }
    }
    else {
      const a = array.filter(cell => cell.owner === currentPlayer.getId())
      if(a.length === 2) {
        const winningSquare = array.filter(cell => cell.owner === 0)
        return winningSquare[0] || false
      }
    }
    return false
  }

  return(
    checkRow(board) ||
    checkRow(transpose(board)) ||
    checkRow(transposeDiagnol(board)) ||
    checkRow(transposeDiagnol(board, true))
  )
}
