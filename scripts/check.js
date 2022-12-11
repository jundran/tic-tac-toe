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
        row.every(el => el.owner > 0 && el.owner === row[0].owner)
      ).includes(true)
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

export function getSquaresWithWinnablePaths(board) {
  const availableSquares = []
  function checkRow(array) {
    function getFreeSquares(row) {
      if(row.some(cell => cell.owner === 1)) return []
      return row.filter(cell => cell.owner === 0)
    }
    if(array[0] instanceof Array) {
      availableSquares.push(array.map(row => getFreeSquares(row)).flat())
    }
    else {
      availableSquares.push(getFreeSquares(array))
    }
  }
  runChecks(checkRow, board, true)
  const flattend = availableSquares.flat()
  const unique = [...new Set(flattend)]
  // reset numPaths from last computer round
  unique.forEach(square => square.numPaths = 0)
  flattend.forEach(square => unique.find(item => item === square).numPaths++)
  return unique
}

function runChecks (checkRow, board, runAll) {
  const tests = [
    checkRow(board),
    checkRow(transpose(board)),
    checkRow(transposeDiagnol(board)),
    checkRow(transposeDiagnol(board, true))
  ]
  for(const test of tests) {
    const r = test
    if(!runAll && r) return r // return first truthy result
  }
  return false
}
