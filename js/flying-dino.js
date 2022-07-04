class FlyingDino {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = this.ctx.canvas.width;
    this.y = 200;
    this.h = 25;
    this.w = 40;
    this.vx = -5;
    this.img = new Image();
    this.img.src = "./Images/flying-dino.png";
    this.img.frames = 2;
    this.img.frameIndex = 0;
    this.tick = 0;
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
  }

  move() {
    this.x += this.vx;
  }

  animate() {
    this.tick++;
    if (this.tick >= 10) {
      this.tick = 0;
      this.img.frameIndex++;
      if (this.img.frameIndex > 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  collide(player) {
    const collideX = player.x + player.w > this.x && player.x < this.x + this.w;
    const collideY = player.y < this.y + this.h && player.y + player.h > this.y;

    return collideX && collideY;
  }

  isVisible() {
    return this.x + this.w >= 0;
  }
}
