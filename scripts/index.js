"use strict"
import Gameboard from "./gameboard.js"
import Player from "./player.js"

const player1 = Player(true)
const player2 = Player()
Gameboard.generate(player1, player2)
