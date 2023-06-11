class Character extends MovableObject {
    x = 0;
    y = 142;
    speed = 10;
    width = 152.5;
    height = 300;
    IMAGES_WALKING = [
        `../img/2_character_pepe/2_walk/W-21.png`,
        `../img/2_character_pepe/2_walk/W-22.png`,
        `../img/2_character_pepe/2_walk/W-23.png`,
        `../img/2_character_pepe/2_walk/W-24.png`,
        `../img/2_character_pepe/2_walk/W-25.png`,
        `../img/2_character_pepe/2_walk/W-26.png`
    ];

    world;

    walkingSound = new Audio(`../audio/walk.mp3`);

    constructor() {
        super().loadImage(`../img/2_character_pepe/2_walk/W-21.png`);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walkingSound.pause();
            this.walkingSound.playbackRate = 3;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkingSound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -719) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walkingSound.play();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);

    }

    jump() {

    }
}