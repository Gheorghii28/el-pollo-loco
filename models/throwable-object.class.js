class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = IMAGES.bottle.IMAGES_ROTATION;
    IMAGES_SPLASH = IMAGES.bottle.IMAGES_SPLASH;

    constructor(x, y) {
        super().loadImage(`../img/6_salsa_bottle/salsa_bottle.png`);
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(()=> {
            this.x += 10;
        }, 25);
    }
}