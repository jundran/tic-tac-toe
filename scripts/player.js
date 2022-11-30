"use strict"
export default function Player(n, isPlayer1) {
  const name = n || (isPlayer1 ? 'Player 1' : 'Player 2')

  function createCross() {
    const cross = document.createElement('img')
    cross.src = '../images/cross.svg'
    cross.style.padding = '17%'
    return cross
  }

  function createNought() {
    const nought = document.createElement('img')
    nought.src = '../images/nought.svg'
    return nought
  }

  const isPlayerOne = () => isPlayer1
  const getMark = isPlayer1 ? () => createCross() : () => createNought()
  const getName = () => name

  return {
    isPlayerOne,
    getMark,
    getName
  }
}
