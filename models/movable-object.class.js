class MovableObject {
    x = 100;
    y = 350;
    img;
    height = 100;
    width = 100;
    currentImage = 0;
    speed = 0.1;
    frameDuration = 1000 / 60;
    otherDirection = false;
    imageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log("Moving right");
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, this.frameDuration);
    }
}