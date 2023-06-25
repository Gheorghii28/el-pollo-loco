class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = IMAGES.bottle.IMAGES_ROTATION;

    throwSound = new Audio("./audio/throw.mp3");

    constructor(x, y) {
        super().loadImage(`../img/6_salsa_bottle/salsa_bottle.png`);
        this.loadImages(this.IMAGES_ROTATION);
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
        this.throwSound.play();
    }

    animate() {
        const interval_2 = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
        intervalsIds.push(interval_2);
    }
}