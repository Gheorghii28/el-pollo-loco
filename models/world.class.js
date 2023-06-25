class World {
    character = new Character();
    endBoss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 100;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndBoss = new StatusBarEndBoss();
    iconEndBoss = new IconEndBoss();
    throwableObject = [];
    splashObject = [];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    requestId;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext(`2d`);
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endBoss.world = this;
    }

    run() {
        const interval_1 = setInterval(() => {
            this.checkCollision();
        }, 1000 / 60);
        intervalsIds.push(interval_1);
        const interval_2 = setInterval(() => {
            this.checkThrowObjects();
        }, 1000 / 5);
        intervalsIds.push(interval_2);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.hasBottles > 0) {
            this.character.lastStatus = 0;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.hasBottles--;
            this.character.totalBottle -= 10;
            this.statusBarBottle.setPercentage(this.character.totalBottle);
        }
    }

    checkCollision() {
        if (this.character.isColliding(this.endBoss)) {
            this.handleCollision(this.endBoss);
        }
        this.handleEnemyCollision();
        this.handleCoinCollision();
        this.handleBottleCollision();
        this.handleThrowableCollision();
    }

    handleEnemyCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.handleCollision(enemy);
            }
        });
    }

    handleCoinCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin(coin);
                this.statusBarCoin.setPercentage(this.character.totalCoin);
            }
        });
    }

    handleBottleCollision() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle(bottle);
                this.statusBarBottle.setPercentage(this.character.totalBottle);
            }
        });
    }

    handleThrowableCollision() {
        this.throwableObject.forEach(obj => {
            if (this.endBoss.isColliding(obj)) {
                this.createSplashObject(obj);
                this.endBoss.hit();
                this.endBoss.setAnimationState('isHurt');
                this.statusBarEndBoss.setPercentage(this.endBoss.energy);
            }
        });
    }

    createSplashObject(obj) {
        setTimeout(() => {
            let splash = new SplashObject(obj.x, obj.y);
            this.endBoss.removeCollectiblesFromLevel(this.throwableObject, obj);
            this.splashObject.push(splash);
            setTimeout(() => {
                this.endBoss.removeCollectiblesFromLevel(this.splashObject, splash);
            }, 50);
        }, 100);
    }

    handleCollision(enemy) {
        if (this.character.isCollisionFromAbove(enemy)) {
            this.handleChickenCollision(enemy);
        } else {
            this.handleCollisionWithEnemy(enemy);
        }
    }

    handleChickenCollision(enemy) {
        if (enemy instanceof Chicken) {
            this.character.speedY = 20;
            enemy.dead();
            setTimeout(() => {
                this.character.removeCollectiblesFromLevel(this.level.enemies, enemy);
            }, 500);
        }
    }

    handleCollisionWithEnemy(enemy) {
        if (!enemy.isDead()) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    draw() {
        if (!isPaused) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.addLevelObjectsToMap();
            this.ctx.translate(-this.camera_x, 0);
            this.addToMapFixedElements();
            this.ctx.translate(this.camera_x, 0);
            this.addGameElementsToMap();
            this.ctx.translate(-this.camera_x, 0);
        }
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addLevelObjectsToMap() {
        this.addObjectsToMap(this.level.air);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }

    addToMapFixedElements() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndBoss);
        this.addToMap(this.iconEndBoss);
    }

    addGameElementsToMap() {
        this.addToMap(this.character);
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.splashObject);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}