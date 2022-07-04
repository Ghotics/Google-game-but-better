class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = CANVAS_HEIGHT - 150;
    this.vx = -3;
    this.img = new Image();
    this.img.src = "./Images/background.png";
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height / 5;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }

  move() {
    this.x += this.vx;
    if (this.x + this.w <= 0) {
      this.x = 0;
    }
  }
}
