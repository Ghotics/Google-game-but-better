class dayNight {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = -40;
    this.y = 200;
    this.w = 40;
    this.h = 40;
    this.vy = 10;
    this.tick = 0;
    this.img = new Image();
    this.img.src = "./Images/moon.png";
  }

  move() {
    this.tick++;
    if (this.tick % 30 === 0) {
      this.tick = 0;
      this.x += 20;
      this.y -= this.vy;
      if (this.y <= 20) {
        this.vy = -10;
      } else if (this.y >= 200) {
        this.vy = 10;
      }
    }
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x, 
      this.y, 
      this.w, 
      this.h
    );
    this.dayNightCycle()
  }

  dayNightCycle() {
        if (this.x >= this.ctx.canvas.width && this.img.src.endsWith('Sun.png')) {
            this.x = -40
            this.y = 200
            this.img.src = './Images/moon.png'
        }else if (this.x >= this.ctx.canvas.width && this.img.src.endsWith('moon.png')){
            this.x = -40
            this.y = 200
            this.img.src = './Images/Sun.png'
        }
    }
}
