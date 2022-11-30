"use strict"
export default function Player(n, isPlayer1) {
  let playAgainstComputer = false
  let name = n
  if(!name) {
    if(name === null) {
      name = 'Computer'
      playAgainstComputer = true
    }
    else {
      name = isPlayer1 ? 'Player 1' : 'Player 2'
    }
  }

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

  const getId = () => isPlayer1 ? 1 : 2
  const isPlayerOne = () => isPlayer1
  const isComputer = () => playAgainstComputer
  const getMark = isPlayer1 ? () => createCross() : () => createNought()
  const getName = () => name

  return {
    getId,
    isComputer,
    isPlayerOne,
    getMark,
    getName
  }
}
