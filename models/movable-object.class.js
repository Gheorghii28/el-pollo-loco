class MovableObject extends DrawableObject {
    speed = 0.1;
    frameDuration = 1000 / 60;
    frameSpeed = 215;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
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
        if(this instanceof ThrowableObject) {
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
            // Bessere Formel zur Kollisionsberechnung (Genauer)
        // return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
        //     (this.Y + this.offsetY + this.height) >= obj.Y &&
        //     (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
        //     obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
       
        // if(this instanceof Character) {
        //     this.x += 20;
        //     this.y += 80;
        //     this.width -= 50;
        //     this.height -= 90;
        // }
        return this.x + 20 + this.width - 50 > obj.x &&
            this.y + 80 + this.height - 90 > obj.y &&
            this.x + 20 < obj.x &&
            this.y + 80 < obj.y + obj.height;
    }

    hit() {
        this.energy -=2;
        if(this.energy < 0) {
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
}