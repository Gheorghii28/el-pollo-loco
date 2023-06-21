class MovableObject extends DrawableObject {
    speed = 0.1;
    frameDuration = 1000 / 60;
    frameSpeed = 215;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    totalCoin = 0;
    totalBottle = 0;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 199;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom;
    }

    isCollisionFromAbove(obj) {
        return this.y + this.height >= obj.y &&
        this.y + this.height <  obj.y + obj.height;

    }

    checkCollisionFromAbove() {
        if (this.y + this.height >= obj.y) {
            console.log("Chicken dead");
        }
    }

    hit() {
        this.energy -= 1;
        // this.energy -= 0.15;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    isDead() {
        return this.energy == 0;
    }

    dead() {
        this.energy = 0;
    }
}