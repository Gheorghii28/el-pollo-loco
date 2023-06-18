class Endboss extends MovableObject {
    width = 348;
    height = 404;
    y = 55;
    speed = 0;
    IMAGES_WALKING = IMAGES.endBoss.IMAGES_WALKING;
    IMAGES_ALERT = IMAGES.endBoss.IMAGES_ALERT;
    IMAGES_ATTACK = IMAGES.endBoss.IMAGES_ATTACK;
    IMAGES_HURT = IMAGES.endBoss.IMAGES_HURT;
    IMAGES_DEAD = IMAGES.endBoss.IMAGES_DEAD;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 3950;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        // setInterval(() => {
        //     this.moveLeft();
        // }, this.frameDuration);
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }
}