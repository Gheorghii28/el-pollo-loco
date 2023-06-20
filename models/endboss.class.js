class Endboss extends MovableObject {
    width = 348;
    height = 404;
    y = 55;
    speed = 0;
    world;
    offset = {
        top: 80,
        bottom: 10,
        left: 0,
        right: 0
    }
    hadFirstContact = false;
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
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                if (this.hadFirstContact) {
                    setInterval(() => {
                        this.moveLeft();
                    }, this.frameDuration);
                }
            }
            i++;
            if (this.world.character.x > 3500 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }

        }, 200);
    }
}