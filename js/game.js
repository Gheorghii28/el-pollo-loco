let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let endGame = false;
let isSoundClicked = false;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    setInterval(() => {
        checkGameOver();
    }, 1000 / 60);

}

function checkGameOver() {
    let gameOverScreen = document.getElementById("game-over-screen");
    if (world.endBoss.currentAnimation == `isDeadEnd` && !endGame) {
        gameOverScreen.classList.add("game-over-animation-open");
        endGame = true;
    }
}

function toggleSound(event) {
    if (isSoundClicked) {
        event.classList.remove("sound-icon-clicked");
        isSoundClicked = false;
    } else {
        event.classList.add("sound-icon-clicked");
        isSoundClicked = true;
    }
}

window.addEventListener("keydown", el => {
    if (el.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (el.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (el.keyCode == 38) {
        keyboard.UP = true;
    }
    if (el.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (el.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (el.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", el => {
    if (el.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (el.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (el.keyCode == 38) {
        keyboard.UP = false;
    }
    if (el.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (el.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (el.keyCode == 68) {
        keyboard.D = false;
    }
});