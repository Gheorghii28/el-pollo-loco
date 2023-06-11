let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    
    console.log(`My Character is:`, world[`character`][`world`][`keyboard`]);
    console.log(`My Enemies is`, world[`enemies`]);
    console.log(`My Enemies is`, world);

}

window.addEventListener("keydown", el => {
    if(el.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(el.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(el.keyCode == 38) {
        keyboard.UP = true;
    }
    if(el.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(el.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", el => {
    if(el.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(el.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(el.keyCode == 38) {
        keyboard.UP = false;
    }
    if(el.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(el.keyCode == 32) {
        keyboard.SPACE = false;
    }
});