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
    statusActions = undefined;
    lastStatus = 0;

    applyGravity() {
        const interval_1 = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        intervalsIds.push(interval_1);
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
        return (this.x + this.width - this.offset.right > obj.x + obj.width ||
            this.x + this.offset.left < obj.x) &&
            this.y + this.height >= obj.y &&
            this.y + this.height < obj.y + obj.height &&
            this.speedY < 0;
    }

    hit() {
        if (this instanceof Character) {
            this.energy -= 0.15;
        } else {
            this.energy -= 1;
        }

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