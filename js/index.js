const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const game = new Game(ctx)
const startBtn = document.getElementById('start-btn')
const pauseBtn = document.getElementById('pause-btn')
const restartBtn = document.getElementById('restart-btn')

//window.onload = () => game.start()

startBtn.addEventListener('click', () => {
    console.log(game.intervalID);
    if (game.intervalId !== null) {  
      game.start()
    }
    /*console.log(game.pause());
    game.pause()*/
  })


pauseBtn.addEventListener('click', () => {
    game.pause()
})

restartBtn.addEventListener('click', () => {
    clearInterval(game.intervalID)
    game.clear()
    setTimeout(() => {
        game.start()
    }, 20)
})