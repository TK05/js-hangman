'use strict'

import config from "./config"

class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toUpperCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
        this.score = 1000
    }

    get puzzle() {
        let formattedPuzzle = []
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                formattedPuzzle.push(letter)
            } else {
                formattedPuzzle.push('')
            }
        })
        return formattedPuzzle
    }

    checkStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
            config.score += this.score
        }
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}". Press "Enter" to play again.`
        } else {
            return `Great work! You guessed the word. +${this.score} points. Press "Enter" to play again.`
        }
    }

    get guessed() {
        if (this.guessedLetters.length === 0) {
            return 'Use your keyboard to make a guess.'
        } else {
            return `Guessed: ${this.guessedLetters.join(', ')}`
        }
    }

    makeGuess(guess) {
        guess = guess.toUpperCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (this.status !== 'playing') {
            return
        }

        if (isUnique) {
            this.guessedLetters.push(guess)
        }

        if (isUnique && isBadGuess) {
            this.remainingGuesses--
            config.stage++
            this.score -= 100
        }

        this.checkStatus()
    }
}

export { Hangman as default }