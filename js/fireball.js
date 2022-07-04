class Fireball {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = 5;
    this.img = new Image();
    this.img.src = "./Images/fireball.png";
  }

  move() {
    this.x += this.vx;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 20, 20);
  }

  collide(FlyingDino) {
    const collideX =
      FlyingDino.x + FlyingDino.w > this.x &&
      FlyingDino.x < this.x + this.img.width;
    const collideY =
      FlyingDino.y < this.y + this.img.height &&
      FlyingDino.y + FlyingDino.h > this.y;

    return collideX && collideY;
  }

  isVisible() {
    return this.x <= this.ctx.canvas.width;
  }
}
