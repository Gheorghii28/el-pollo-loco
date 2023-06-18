class ChickenSmall extends Chicken {
    width = 59;
    height = 52.5;
    y = 378.25;
    IMAGES_WALKING = IMAGES.chickenSmall.IMAGES_WALKING;
    IMAGES_DEAD = IMAGES.chickenSmall.IMAGES_DEAD;

    constructor() {
        super().loadImage(`../img/3_enemies_chicken/chicken_small/1_walk/1_w.png`);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }
}