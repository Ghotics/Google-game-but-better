class Cloud {
  constructor(ctx) {
    this.ctx = ctx;
    this.variable = Number((Math.random() * 2.5).toFixed(2));
    this.w = 75 * this.variable;
    this.h = 45 * this.variable;
    this.x = this.ctx.canvas.width;
    this.y = Math.floor(Math.random() * 300 - 50);
    this.vx = -2;
    this.img = new Image();
    this.img.src = "./Images/Cloud.png";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.vx;
  }

  isVisible() {
    return this.x + this.w >= 0;
  }
}
