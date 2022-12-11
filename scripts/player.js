export default function Player(n, isPlayer1) {
  function getPlayerName() {
    if(n) return n
    else if(n === null) return 'Computer'
    else return isPlayer1 ? 'Player 1' : 'Player 2'
  }

  function createCross() {
    const cross = document.createElement('img')
    cross.src = './images/cross.svg'
    cross.style.padding = '17%'
    return cross
  }

  function createNought() {
    const nought = document.createElement('img')
    nought.src = './images/nought.svg'
    return nought
  }

  return Object.freeze({
    get playerName() { return getPlayerName() },
    get id() { return isPlayer1 ? 1 : 2 },
    get mark() { return isPlayer1 ? createCross() : createNought() },
    get isPlayerOne() { return isPlayer1 },
    get isComputer() { return n === null ? true : false }
  })
}
