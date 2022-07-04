class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    this.player = new Player(ctx, this.background.y);
    this.obstacles = [];
    this.tickObstacle = 0;
    this.tickOpacity = 0;
    this.bgAlpha = 0.5;
    this.dayOrNight = false
    this.intervalVariable = 60
    this.dayNight = new dayNight(ctx);
    this.clouds = [];
    this.flyingDinos = [];
    this.currentScore = 0
    this.currentScoreReset = 0
    this.intervalID = null;
    this.deathSound = new Audio();
    this.deathSound.src = './audio/die.wav'
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.score();
      this.checkCollision();
      this.move();
      this.tickObstacle++;
      this.tickOpacity++;
      this.color = "";

      if (this.tickOpacity % 30 === 0) {
        if(!this.dayOrNight) {
          this.bgAlpha += 0.0285;
        }else if(this.dayOrNight){
          this.bgAlpha -= 0.0285;
        }
        
        if(this.bgAlpha >=1){
          this.dayOrNight = true
        }
        if(this.bgAlpha <= 0.001){
          this.dayOrNight = false
        }
        if(this.bgAlpha >= 0.5){
          this.color = "white"
        }else {
          this.color = "black"
        }
        this.ctx.canvas.style.background = `rgba(0,0,0, ${this.bgAlpha})`;
      }
      this.obstacles.forEach((obs) => {
        if (
          this.player.x === obs.x ||
          this.player.x === obs.x - 1 ||
          this.player.x === obs.x - 2
        ) {
          this.currentScore++;
          this.currentScoreReset++
          if (this.currentScore % 2 === 0) {
            this.flyingDinos.push(new FlyingDino(this.ctx));
          }
        }
      });
      if (this.tickObstacle % 100 === 0) {
        let possibility = Math.floor(Math.random() * 100);
        this.tickObstacle = 0;
        this.obstacles = this.obstacles.filter((obs) => obs.isVisible());
        if (possibility >= 20) {
          this.addObstacle();
        }
      }
      if (this.tickObstacle % 150 === 0) {
        this.addCloud();
      }

      if (this.currentScoreReset % 3 === 0 && this.currentScoreReset !== 0) {
        this.currentScoreReset = 0
        clearInterval(this.intervalId)
        this.intervalVariable += 4
        this.start()
      }
      this.flyingDinos = this.flyingDinos.filter((fDino) => fDino.isVisible());
    }, 1000 / this.intervalVariable);
  }
  score() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.currentScore, 10, 50);
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.player.mouth.clearFireballs();
  }

  draw() {
    this.background.draw();
    this.clouds.forEach((cld) => cld.draw());
    this.obstacles.forEach((obs) => obs.draw());
    this.dayNight.draw();
    this.flyingDinos.forEach((fDino) => fDino.draw());
    this.player.draw();
  }

  move() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach((obs) => obs.move());
    this.dayNight.move();
    this.clouds.forEach((cld) => cld.move());
    this.flyingDinos.forEach((fDino) => fDino.move());
  }

  addObstacle() {
    this.obstacles.push(new Obstacle(this.ctx));
  }

  addCloud() {
    this.clouds.push(new Cloud(this.ctx));
  }

  checkCollision() {
    let PvO = this.obstacles.find((obs) => obs.collide(this.player));
    let PvD = this.flyingDinos.find((fDino) => fDino.collide(this.player));
    let FvD = this.flyingDinos.find((fDino) =>
      this.player.mouth.fireballs.some((fireball) => fireball.collide(fDino))
    );
    if (FvD) {
      this.flyingDinos.shift();
    }
    if (PvD || this.player.y + this.player.h >= this.ctx.canvas.height) {
      this.player.img.frameIndex = 4;
      this.gameOver();
    }
    if (PvO || this.player.y + this.player.h >= this.ctx.canvas.height) {
      this.player.isDead = true;
      this.player.img.frameIndex = 4;
      this.gameOver();
    }
  }
  
  pause() {
    clearInterval(this.intervalID)
  }

  gameOver() {
    this.deathSound.play();
    this.player.img.frameIndex = 4;
    setTimeout(() => {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.ctx.font = "30px Arial";
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 100
    );
    this.ctx.fillText(
      "Your score was",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 60
    );
    this.ctx.fillText(
      `~ ${this.currentScore} ~`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 20
    );
    this.ctx.fillText(
      "Press SPACE to start again!",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 + 10
    );
    }, 15);
  }
}