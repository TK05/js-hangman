'use strict'

import getPuzzle from "./requests"
import config from "./config"
import Hangman from "./hangman"


let scoreEl = document.querySelector('#score-num')
let wordsConfig = document.querySelector('#num-words')
let guessesConfig = document.querySelector('#num-guesses')
let hangmanEl = document.querySelector('#hangman')
let puzzleEl = document.querySelector('#puzzle')
let guessedEl = document.querySelector('#guessed')
let statusEl = document.querySelector('#status')

// Set/show defaults for num words and num guesses on load
wordsConfig.value = config.length
guessesConfig.value = config.guesses

const render = () => {
    puzzleEl.innerHTML = '' // Clear puzzle on each render
    const puzzle = gameData.puzzle

    // Each word is a div so one word isn't split on multiple lines
    let allWordsEl = document.createElement('div')
    allWordsEl.classList.add('words')
    let eachWordEl = document.createElement('div')
    eachWordEl.classList.add('word')

    puzzle.forEach((letter) => {
        let letterEl = document.createElement('div')
        letterEl.classList.add('letter')

        if (letter === ' ') {
            allWordsEl.appendChild(eachWordEl)
            // HACKY SOLUTION: Reinitialize 'eachWordEl'
            eachWordEl = document.createElement('div')
            eachWordEl.classList.add('word')
        } else if (gameData.guessedLetters.includes(letter)) {
            letterEl.textContent = letter
            eachWordEl.appendChild(letterEl)
        } else {
            letterEl.textContent = ''
            eachWordEl.appendChild(letterEl)
        }
    })

    allWordsEl.appendChild(eachWordEl)
    puzzleEl.appendChild(allWordsEl)

    guessedEl.textContent = gameData.guessed
    statusEl.style.color = config.colors[gameData.status]
    statusEl.textContent = gameData.statusMessage
    hangmanEl.style.backgroundPositionY = config.step
    scoreEl.textContent = config.score.toLocaleString('en-US', { minimumFractionDigits: 0 })
}

let gameData

const startGame = async () => {
    const puzzle = await getPuzzle(config.length)
    gameData = new Hangman(puzzle, config.guesses)

    // Set/reset initial hangman animation position
    config.stage = 0
    hangmanEl.style.backgroundPositionY = config.step

    render()
}

startGame()

// Detect 'New Game' div press
document.querySelector('#new-game').addEventListener('click', startGame)

// Detect keyboard inputs
window.addEventListener('keypress', (e) => {
    // New game with carriage return
    if (e.charCode === 13) {
        startGame()
        // Allow only letter keypresses
    } else if ((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122)) {
        const guess = String.fromCharCode(e.charCode)
        gameData.makeGuess(guess)
        render()
    }
})

// Detect change in num words dropdown
wordsConfig.addEventListener('change', (e) => {
    config.length = e.target.value
})

// Detect change in num guesses dropdown
guessesConfig.addEventListener('change', (e) => {
    config.guesses = e.target.value
})
