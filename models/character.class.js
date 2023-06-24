class Character extends MovableObject {
    x = 0;
    y = 199;
    speed = 5;
    width = 122;
    height = 240;
    world;
    walkingSound = new Audio(`../audio/walk.mp3`);
    offset = {
        top: 80,
        bottom: 10,
        left: 20,
        right: 30
    }

    IMAGES_IDLE = IMAGES.character.IMAGES_IDLE;
    IMAGES_LONG_IDLE = IMAGES.character.IMAGES_LONG_IDLE;
    IMAGES_WALKING = IMAGES.character.IMAGES_WALKING;
    IMAGES_JUMPING = IMAGES.character.IMAGES_JUMPING;
    IMAGES_DEAD = IMAGES.character.IMAGES_DEAD
    IMAGES_HURT = IMAGES.character.IMAGES_HURT;

    constructor() {
        super().loadImage(`../img/2_character_pepe/1_idle/idle/I-1.png`);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        const interval_1 = setInterval(() => {
            this.updateGame();
        }, 1000 / 30);
        intervalsIds.push(interval_1);

        const interval_2 = setInterval(() => {
            this.updatePlayerAnimation();
        }, 100);
        intervalsIds.push(interval_2);

        const interval_3 = setInterval(() => {
            this.updateIdleAnimation();
        }, 1000 / 3);
        intervalsIds.push(interval_3);

        const interval_4 = setInterval(() => {
            this.resetY();
        }, 1000 / 60);
        intervalsIds.push(interval_4);
    }

    updateGame() {
        this.walkingSound.pause();
        this.walkingSound.playbackRate = 3;
        if (this.world.keyboard.RIGHT) {
            this.movePlayerRight();
        }
        if (this.world.keyboard.LEFT) {
            this.movePlayerLeft();
        }
        if (this.world.keyboard.SPACE) {
            this.playerJump();
        }
        this.updateCamera();
    }

    updatePlayerAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING)
        } else {
            this.updatePlayerStatus();
        }
    }

    updateIdleAnimation() {
        if (this.statusActions === 'idle' && this.lastStatus <= 100) {
            this.playAnimation(this.IMAGES_IDLE);
            this.statusActions = undefined;
            console.log('test idle');
        } else if (this.statusActions === 'idle' && this.lastStatus > 100) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.statusActions = undefined;
            console.log('test long idle');
        }
    }

    updatePlayerStatus() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.lastStatus = 0;
        } else {
            this.statusActions = `idle`;
            this.lastStatus++;
        }
    }

    movePlayerRight() {
        if (this.x < this.world.level.levelEndX && this.x < this.world.endBoss.x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround()) {
                this.walkingSound.play();
            }
        }
    }

    movePlayerLeft() {
        if (this.x > this.world.level.levelStartX) {
            this.moveLeft();
        }
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            this.walkingSound.play();
        }
    }

    playerJump() {
        if (!this.isAboveGround()) {
            this.lastStatus = 0;
            this.jump();
        }
    }

    updateCamera() {
        if (this.x < 3640 && this.x > -719) {
            this.world.camera_x = -this.x + 50;
        }
    }

    jump() {
        this.speedY = 30;
    }

    collectCoin(coin) {
        this.totalCoin += 10;
        if (this.totalCoin > 100) {
            this.totalCoin = 100;
        }
        this.removeCollectiblesFromLevel(this.world.level.coins, coin)
    }

    collectBottle(bottle) {
        this.totalBottle += 10;
        if (this.totalBottle > 100) {
            this.totalBottle = 100;
        }
        this.removeCollectiblesFromLevel(this.world.level.bottles, bottle);
    }

    resetY() {
        if (this.y > 199) {
            this.y = 199;
        }
    }
}