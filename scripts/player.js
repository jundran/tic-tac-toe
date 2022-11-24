"use strict"
export default function Player(isX) {
  const name = isX ? "Player1" : "Player2"
  const mark = isX ? 'X' : 'O'

const getMark = () => mark
const getName = () => name

  return {
    getMark,
    getName
  }
}
