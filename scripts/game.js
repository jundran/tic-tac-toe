"use strict"
import Gameboard from "./gameboard.js"
import Player from "./player.js"

document.querySelector('#reset-button').addEventListener('click', handleReset)

const params = new URLSearchParams(window.location.search)
const computer = params.get('playAgainstComputer') == 'on' ? true : false
const player1 = Player(params.get('player1'), true)
const player2 = computer ? Player(null) : Player(params.get('player2'))
document.querySelector('#player1').textContent = player1.getName()
document.querySelector('#player2').textContent = player2.getName()
newGame()

function newGame() {
  document.querySelector('.gameboard')
    .replaceWith(Gameboard(setMessage, setCurrentPlayer, player1, player2))
}

function handleReset() {
  setCurrentPlayer(player1)
  setMessage('')
  newGame()
}

function setMessage(message) {
  const gameMessage = document.querySelector('.game-message')
  message ? gameMessage.classList.add('active') : gameMessage.classList.remove('active')
  gameMessage.textContent = message
}

function setCurrentPlayer(player) {
  document.querySelectorAll('.player').forEach(el => el.classList.remove('active'))
  if(!player) return

  if(player.isPlayerOne()) {
    document.querySelector('#player1').classList.add('active')
  }
  else {
    document.querySelector('#player2').classList.add('active')
  }
}
