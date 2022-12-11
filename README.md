# tic-tac-toe

## Live
https://jundran.github.io/tic-tac-toe/

## Description
TOP - Tic Tac Toe project  
Play Noughts and Crosses (AKA Tic Tac Toe) vs another human or a computer algorithm.

## Project Requirements
https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe

## Computer Logic
The computer will do a number of checks to decide which square to play:
### Step 1
Check for a winning square and play it.
### Step 2
Check for the player's winning square and block it.
### Step 3
Find squares with a potential path to victory. Then filter those squares again to prioritze those with two or more potential paths.

For example: If the player plays the top left square, then the top right square would have two paths open (diagonally and straight down). Only the middle square can have three paths so it's not wise to only look for three paths first as the computer's first move would be predictable.

Out of the best squares available, the computer will choose one at random.
### Step 4
If step 3 does not return a winnable path then the computer will pick a random free square because, at this point, the game is now unwinnable for the computer, but it may still draw.

## Images
### Nought
https://freesvg.org/clipart-0123
### Cross
https://freesvg.org/red-cross-not-ok-vector-symbol