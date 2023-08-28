class Character extends MovableObject {
    x = 0;
    y = 199;
    speed = 5;
    width = 122;
    height = 240;
    world;
    walkingSound = new Audio(`./audio/walk.mp3`);
    jumpSound = new Audio("./audio/jump.mp3");
    isHurtSound = new Audio("./audio/character-hurt.mp3");
    isDeadSound = new Audio("./audio/character-dead.mp3");
    offset = {
        top: 80,
        bottom: 10,
        left: 20,
        right: 30
    }
    hasBottles = 0;

    IMAGES_IDLE = IMAGES.character.IMAGES_IDLE;
    IMAGES_LONG_IDLE = IMAGES.character.IMAGES_LONG_IDLE;
    IMAGES_WALKING = IMAGES.character.IMAGES_WALKING;
    IMAGES_JUMPING = IMAGES.character.IMAGES_JUMPING;
    IMAGES_DEAD = IMAGES.character.IMAGES_DEAD
    IMAGES_HURT = IMAGES.character.IMAGES_HURT;

    constructor() {
        super().loadImage(`./img/2_character_pepe/1_idle/idle/I-1.png`);
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
            this.playJumpSound();
        }
        this.updateCamera();
    }

    updatePlayerAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.isDeadSound.play();
            setTimeout(() => { isPaused = true; endGame = true; }, 2000);
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
        } else if (this.statusActions === 'idle' && this.lastStatus > 100) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.statusActions = undefined;
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
            this.playWalkingSound();
        }
    }

    movePlayerLeft() {
        if (this.x > this.world.level.levelStartX) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        }
    }

    playWalkingSound() {
        if (!this.isAboveGround() && !isPaused && !this.isHurt()) {
            this.walkingSound.play();
        }
    }

    playJumpSound() {
        if(!this.isAboveGround() && !isPaused) {
            this.jumpSound.play();
        }
    }

    playerJump() {
        if (!this.isAboveGround() && !isPaused) {
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
        if (!isPaused) {
            this.speedY = 30;
        }
    }

    collectCoin(coin) {
        this.totalCoin += 10;
        if (this.totalCoin > 100) {
            this.totalCoin = 100;
        }
        coin.collectSound.play();
        this.removeCollectiblesFromLevel(this.world.level.coins, coin)
    }

    collectBottle(bottle) {
        if(this.hasBottles < 10) {
            bottle.collectSound.play();
            this.removeCollectiblesFromLevel(this.world.level.bottles, bottle);
        }
        this.hasBottles++;
        this.totalBottle += 10;
        if (this.totalBottle > 100) {
            this.totalBottle = 100;
            this.hasBottles = 10;
        } 
    }

    resetY() {
        if (this.y > 199) {
            this.y = 199;
        }
    }
}