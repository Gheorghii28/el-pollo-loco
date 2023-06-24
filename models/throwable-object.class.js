class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = IMAGES.bottle.IMAGES_ROTATION;
    // IMAGES_SPLASH = IMAGES.bottle.IMAGES_SPLASH;

    constructor(x, y) {
        super().loadImage(`../img/6_salsa_bottle/salsa_bottle.png`);
        this.loadImages(this.IMAGES_ROTATION);
        // this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        const interval_1 = setInterval(()=> {
            this.x += 10;
        }, 25);
        intervalsIds.push(interval_1);
    }

    animate() {
        const interval_2 = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
        intervalsIds.push(interval_2);
    }
}