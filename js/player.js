class Player {
  constructor(ctx, y) {
    this.ctx = ctx;
    this.x = 70;
    this.y = y + 20;
    this.h = 50;
    this.w = 30;
    this.vy = 0;
    this.img = new Image();
    this.img.src = "./Images/Player.png";
    this.img.frames = 6;
    this.isDead = false;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.g = 0.3;
    this.actions = {
      jump: false,
      shoot: false,
    };
    this.setListeners();
    this.mouth = new Mouth(this);
    this.jumpSound = new Audio();
    this.jumpSound.src = './audio/jump.wav'
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.animate();
    this.mouth.draw();
  }

  isFloor() {
    return this.y + this.h >= this.ctx.canvas.height - FLOOR;
  }

  move() {
    this.applyActions();
    this.mouth.move();
    this.vy += this.g;
    this.y += this.vy;
    if (this.isFloor()) {
      this.y = this.ctx.canvas.height - FLOOR - this.h;
      this.vy = 0;
    }
    this.mouth.move();
  }

  animate() {
    this.tick++;

    if (this.tick >= 10 && !this.isDead) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= 4 && !this.isDead) {
      this.img.frameIndex = 0;
    }
  }

  setListeners() {
    document.onkeydown = (e) => this.switchAction(e.keyCode, true);
    document.onkeyup = (e) => this.switchAction(e.keyCode, false);
  }

  applyActions() {
    if (this.actions.jump && !this.isJumping()) {
      this.vy = -7.5;
      this.jumpSound.play()
    }
    if (this.actions.shoot) {
      this.mouth.shoot();
    }
  }

  isJumping() {
    return this.y < Math.round(FLOOR + 190);
  }

  switchAction(key, apply) {
    switch (key) {
      case JUMP:
        this.actions.jump = apply;
        break;
      case SHOOT:
        this.actions.shoot = apply;
        break;
    }
  }
}
