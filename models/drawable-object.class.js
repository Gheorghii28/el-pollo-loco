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

    removeCollectiblesFromLevel(collectiblesArr, collectible) {
        collectiblesArr.forEach((el, index) => {
            if (
                collectible.x === el.x &&
                collectible.y === el.y &&
                collectible.width === el.width &&
                collectible.height === el.height
            ) {
                collectiblesArr.splice(index, 1);
            }
        });
    }
}