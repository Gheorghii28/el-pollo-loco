class Endboss extends MovableObject {
    width = 348;
    height = 404;
    y = 55;
    speed = 0;
    world;
    offset = {
        top: 80,
        bottom: 10,
        left: 20,
        right: 30
    }
    hadFirstContact = false;
    continueMoving = true;
    animations = {
        isWalking: true,
        isAlert: false,
        isAttacking: false,
        isHurt: false,
        isDead: false,
        isDeadEnd: false
    }
    currentAnimation = null;

    isHurtSound = new Audio("./audio/endBoss-hurt.mp3");

    IMAGES_WALKING = IMAGES.endBoss.IMAGES_WALKING;
    IMAGES_ALERT = IMAGES.endBoss.IMAGES_ALERT;
    IMAGES_ATTACK = IMAGES.endBoss.IMAGES_ATTACK;
    IMAGES_HURT = IMAGES.endBoss.IMAGES_HURT;
    IMAGES_DEAD = IMAGES.endBoss.IMAGES_DEAD;
    IMAGES_IS_DEAD = IMAGES.endBoss.IMAGES_IS_DEAD;

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
        const intervalID_1 = setInterval(() => {
            if (this.world.character.x > 3500 && !this.hadFirstContact) {
                this.hadFirstContact = true;
                this.setAnimationState('isAlert');
            }

            if (this.isDead()) {
                this.setAnimationState(`isDead`);
            }

            if (this.animations.isWalking && this.currentAnimation !== 'isWalking') {
                this.currentAnimation = 'isWalking';
                this.playAnimation(this.IMAGES_WALKING);
                this.currentAnimation = null;
            }

            if (this.animations.isAlert && this.currentAnimation !== 'isAlert') {
                this.currentAnimation = 'isAlert';
                this.playAnimation(this.IMAGES_ALERT);
                this.currentAnimation = null;
                this.startMovingAnimation();
            }

            if (this.animations.isAttacking && this.currentAnimation !== 'isAttacking') {
                this.currentAnimation = 'isAttacking';
                this.playAnimation(this.IMAGES_ATTACK);
                this.currentAnimation = null;
                setTimeout(() => { this.setAnimationState('isAlert'); }, 1000);
                this.continueMoving = true;
            }

            if (this.animations.isHurt && this.currentAnimation !== 'isHurt') {
                this.currentAnimation = 'isHurt';
                this.playAnimation(this.IMAGES_HURT);
                this.isHurtSound.play();
                this.currentAnimation = null;
                this.startMovingAnimation();
            }

            if (this.animations.isDead && this.currentAnimation !== 'isDead') {
                this.currentAnimation = 'isDead';
                this.playAnimation(this.IMAGES_DEAD);
                this.currentAnimation = null;
                this.setAnimationState(`isDeadEnd`);
            }

            if (this.animations.isDeadEnd) {
                this.currentAnimation = 'isDeadEnd';
                this.playAnimation(this.IMAGES_IS_DEAD);
                setTimeout(() => { isPaused = true; endGame = true; }, 100);
                console.log("endBoss is dead")
            }


        }, 200);
        intervalsIds.push(intervalID_1);
    }

    setAnimationState(currentAnimation) {
        Object.keys(this.animations).forEach((key) => {
            this.animations[key] = false;
        });
        this.animations[currentAnimation] = true;
    }

    startMovingAnimation() {
        setTimeout(() => {
            setTimeout(() => {
                this.continueMoving = false;
                this.setAnimationState('isAttacking');
            }, 2000);
            const interval_2 = setInterval(() => {
                if (this.continueMoving) {
                    this.setAnimationState('isWalking');
                    if (!this.animations.isDeadEnd) {
                        this.moveLeft();
                    }
                } else {
                    clearInterval(interval_2);
                }
            }, this.frameDuration);
            intervalsIds.push(interval_2);
        }, 1000);
    }
}