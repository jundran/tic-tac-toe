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
      return array.map(row =>
        row.every(el => el.owner > 0 && el.owner === row[0].owner)).includes(true)
    }
    return array.every(el => el.owner > 0 && el.owner === array[0].owner)
  }
  return runChecks(checkRow, board)
}

export function checkForWinningSquare(board, playerToCheck) {
  function checkRow(array) {
    if(array[0] instanceof Array) {
      const a = array.filter(row => {
        const r = row.filter(cell => cell.owner === playerToCheck.id)
        if(r.length === 2) return r
      })
      return a.flat().filter(cell => cell.owner === 0)[0] || false
    }
    const a = array.filter(cell => cell.owner === playerToCheck.id)
    return a.length === 2 ? array.filter(cell => cell.owner === 0)[0] : false
  }
  return runChecks(checkRow, board)
}

const runChecks = (checkRow, board) =>
  checkRow(board) ||
  checkRow(transpose(board)) ||
  checkRow(transposeDiagnol(board)) ||
  checkRow(transposeDiagnol(board, true))
