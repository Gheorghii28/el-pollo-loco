class DrawableObject {
    x = 100;
    y = 350;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = `5`;
            ctx.strokeStyle = `blue`;
            if (this instanceof Character) {
                ctx.rect(
                    this.x + 20,
                    this.y + 80,
                    this.width - 50,
                    this.height - 90
                );
            } else if (this instanceof Endboss) {
                ctx.rect(
                    this.x,
                    this.y + 80,
                    this.width,
                    this.height - 90
                );
            } else if (this instanceof Coin) {
                ctx.rect(
                    this.x +25, 
                    this.y +25,
                    this.width -50,
                    this.height -50
                );
            } else if (this instanceof Bottle) {
                ctx.rect(
                    this.x + 20,
                    this.y + 10,
                    this.width - 40,
                    this.height - 20
                );
            } else {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }
}