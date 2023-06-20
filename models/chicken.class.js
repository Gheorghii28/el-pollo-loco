class Chicken extends MovableObject {
    width = 62;
    height = 60.75;
    y = 370;
    IMAGES_WALKING = IMAGES.chicken.IMAGES_WALKING;
    IMAGES_DEAD = IMAGES.chicken.IMAGES_DEAD
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage(`../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.x = 300 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.frameSpeed = this.frameSpeed - this.speed * 100;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, this.frameDuration);
        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, this.frameSpeed);
    }

}