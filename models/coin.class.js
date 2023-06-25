class Coin extends DrawableObject {
    width = 80;
    height = 80;
    offset = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25
    }

    collectSound = new Audio("./audio/coin.mp3");

    constructor(imagePath, y) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * 3000;
        this.y = y;
    }
}