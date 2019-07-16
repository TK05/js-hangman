// Config variables for puzzle progress
let config = {
    score: 0,
    guesses: 4,
    length: 3,
    stage: 0,
    steps:
    {
        6: ['340px', '680px', '1020px', '1360px', '1700px', '2040px', '2380px'],
        5: ['340px', '680px', '1360px', '1700px', '2040px', '2380px'],
        4: ['340px', '680px', '1020px', '1700px', '2380px'],
        3: ['340px', '1020px', '1700px', '2380px'],
        2: ['340px', '1020px', '2380px'],
        1: ['340px', '2380px'],
    },
    get step() {
        return this.steps[this.guesses][this.stage]
    },
    colors:
    {
        'playing': 'rgba(166, 255, 172, 0.65)',   // Green
        'finished': 'rgba(175, 218, 255, 0.65)',  // Blue
        'failed': 'rgba(255, 160, 160, 0.65)',    // Red
    }
}

export { config as default }