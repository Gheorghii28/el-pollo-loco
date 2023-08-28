class Air extends MovableObject {
    y = 0;
    width = 720;
    height = 480;

    constructor(x) {
        super().loadImage(`./img/5_background/layers/air.png`, x);
        this.x = x;
    }
}