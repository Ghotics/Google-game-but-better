class Mouth{
    constructor(shooter){
        this.ctx = shooter.ctx
        this.shooter = shooter
        this.fireballs = [];
    }

    shoot() {
        if(!this.isReloading){
            this.fireballs.push(new Fireball(this.ctx, this.shooter.x + this.shooter.w / 2, this.shooter.y + this.shooter.h / 12))

            this.isReloading = true

            setTimeout(() => {
                this.isReloading = false
            }, 500)
        }
    }

    clearFireballs() {
        this.fireballs = this.fireballs.filter(fireball => {
          return fireball.isVisible()
        })
    }

    draw() {
        this.fireballs.forEach(fireball => fireball.draw())
    }

    move() {
        this.fireballs.forEach(fireball => fireball.move())
    }
}