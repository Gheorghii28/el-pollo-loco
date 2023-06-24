class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindBtsPressEvents();
        this.bindKeyPressEvents();
    }

    bindBtsPressEvents() {
        document.getElementById("left-button").addEventListener("touchstart", e => {
            e.preventDefault();
            keyboard.LEFT = true;
        });
        document.getElementById("left-button").addEventListener("touchend", e => {
            e.preventDefault();
            keyboard.LEFT = false;
        });

        document.getElementById("right-button").addEventListener("touchstart", e => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });
        document.getElementById("right-button").addEventListener("touchend", e => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });

        document.getElementById("jump-button").addEventListener("touchstart", e => {
            e.preventDefault();
            keyboard.SPACE = true;
        });
        document.getElementById("jump-button").addEventListener("touchend", e => {
            e.preventDefault();
            keyboard.SPACE = false;
        });

        document.getElementById("bottle-button").addEventListener("touchstart", e => {
            e.preventDefault();
            keyboard.D = true;
        });
        document.getElementById("bottle-button").addEventListener("touchend", e => {
            e.preventDefault();
            keyboard.D = false;
        });
    }

    bindKeyPressEvents() {
        window.addEventListener("keydown", el => {
            if (el.keyCode == 39) {
                this.RIGHT = true;
            }
            if (el.keyCode == 37) {
                this.LEFT = true;
            }
            if (el.keyCode == 38) {
                this.UP = true;
            }
            if (el.keyCode == 40) {
                this.DOWN = true;
            }
            if (el.keyCode == 32) {
                this.SPACE = true;
            }
            if (el.keyCode == 68) {
                this.D = true;
            }
        });
        
        window.addEventListener("keyup", el => {
            if (el.keyCode == 39) {
                this.RIGHT = false;
            }
            if (el.keyCode == 37) {
                this.LEFT = false;
            }
            if (el.keyCode == 38) {
                this.UP = false;
            }
            if (el.keyCode == 40) {
                this.DOWN = false;
            }
            if (el.keyCode == 32) {
                this.SPACE = false;
            }
            if (el.keyCode == 68) {
                this.D = false;
            }
        });
    }
}