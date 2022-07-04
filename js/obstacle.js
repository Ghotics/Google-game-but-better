class Obstacle {
  constructor(ctx) {
    (this.ctx = ctx), (this.w = 20);
    this.h = 45;
    this.y = this.ctx.canvas.height - (FLOOR + this.h);
    this.x = this.ctx.canvas.width;
    this.vx = -3;
    this.random = Math.floor(Math.random() * 100);
    this.randomPosition = Math.floor(Math.random() * 45);
    if (this.random <= 40) {
      this.x = this.ctx.canvas.width + this.randomPosition;
    }

    this.img = new Image();
    this.img.src = "./Images/Obstacle.png";
    this.img.frames = 4;
    this.img.frameIndex = Math.floor(Math.random() * this.img.frames);
  }

  move() {
    this.x += this.vx;
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
