class SplashObject extends MovableObject {

    IMAGES_SPLASH = IMAGES.bottle.IMAGES_SPLASH;
    stopPlay = false;

    constructor(x, y) {
        super().loadImage(`../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png`);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 131;
        this.height = 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    }
}