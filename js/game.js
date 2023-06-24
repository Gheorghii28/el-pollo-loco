let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let endGame = false;
let isSoundClicked = true;
let elPolloLocoSound = new Audio("../audio/el-pollo-loco.mp3");
let firstStartGame = false;
let intervalsIds = [];

function stopGame() {
    intervalsIds.forEach(clearInterval);
    intervalsIds = [];
}

function testInterval() {
    console.log("world start")
}

function startGame() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    
    const interval_1 = setInterval(() => {
        checkGameOver();
    }, 1000 / 60);
    intervalsIds.push(interval_1);
}

function resetGame() {
    if(!firstStartGame) {
        startGame();
        firstStartGame = true;
    } else {
        stopGame();
        startGame();
    }
}

function init() {
    resetGame();
    console.log("init")
}

function checkGameOver() {
    let gameOverScreen = document.getElementById("game-over-screen");
    if (world.endBoss.currentAnimation == `isDeadEnd` && !endGame) {
        gameOverScreen.classList.add("game-over-animation-open");
        setTimeout(() => {
            document.getElementById("nav-bar-left").classList.remove("d-none");
            document.getElementById("backward-icon").classList.remove("d-none");
            document.getElementById("pause-button").classList.add("d-none");
            document.getElementById("nav-bar-left").classList.remove("gap-0");
        }, 2000);
        endGame = true;
    }
}

function replayAudio() {
    elPolloLocoSound.currentTime = 0;
    elPolloLocoSound.play();
}

function toggleSound(event) {
    if (isSoundClicked) {
        event.classList.remove("sound-icon-clicked");
        isSoundClicked = false;
        elPolloLocoSound.play();
        console.log("true")
    } else {
        event.classList.add("sound-icon-clicked");
        isSoundClicked = true;
        elPolloLocoSound.pause();
        console.log("false")
    }
}

function hideStartScreen() {
    document.getElementById("nav-bar-right").classList.add("d-none");
    document.getElementById("nav-bar-left").classList.add("d-none");
    document.getElementById("start-screen").classList.add("d-none");
    document.getElementById("play-button").classList.add("d-none");
    document.getElementById("pause-button").classList.remove("d-none");

    document.getElementById("movement-container").classList.remove("d-none");
    document.getElementById("actions-container").classList.remove("d-none");
    
    init();
}

function showControls() {
    document.getElementById("nav-bar-right").classList.remove("d-none");
    document.getElementById("nav-bar-left").classList.remove("d-none");
    document.getElementById("play-button-small").classList.remove("d-none");
    document.getElementById("pause-button").classList.add("d-none");
    document.getElementById("utility-container").classList.add("translucent-bg");
    document.getElementById("nav-bar-left").classList.remove("gap-0");
    document.getElementById("backward-icon").classList.remove("d-none");
}

function hideControls() {
    document.getElementById("nav-bar-right").classList.add("d-none");
    document.getElementById("nav-bar-left").classList.add("d-none");
    document.getElementById("play-button-small").classList.add("d-none");
    document.getElementById("pause-button").classList.remove("d-none");
    document.getElementById("utility-container").classList.remove("translucent-bg");
}

function showStartScreen() {
    document.getElementById("nav-bar-right").classList.remove("d-none");
    document.getElementById("nav-bar-left").classList.remove("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
    document.getElementById("play-button").classList.remove("d-none");
    document.getElementById("pause-button").classList.add("d-none");
    document.getElementById("play-button-small").classList.add("d-none");
    document.getElementById("utility-container").classList.remove("translucent-bg");
    document.getElementById("nav-bar-left").classList.add("gap-0");
    document.getElementById("backward-icon").classList.add("d-none");

    document.getElementById("movement-container").classList.add("d-none");
    document.getElementById("actions-container").classList.add("d-none");
}

function maximizeScreen() {
    document.getElementById("headline").classList.add("d-none");
    document.getElementById("maximize-icon").classList.add("d-none");
    document.getElementById("minimize-icon").classList.remove("d-none");
    document.getElementById("main").classList.add("width-100");
    document.getElementById("main").classList.add("height-100");

    document.getElementById("canvas").classList.add("border-radius-0");
    document.getElementById("utility-container").classList.add("border-radius-0");
    document.getElementById("start-screen").classList.add("border-radius-0");
    document.getElementById("game-over-screen").classList.add("border-radius-0");
}

function minimizeScreen() {
    document.getElementById("headline").classList.remove("d-none");
    document.getElementById("maximize-icon").classList.remove("d-none");
    document.getElementById("minimize-icon").classList.add("d-none");
    document.getElementById("main").classList.remove("width-100");
    document.getElementById("main").classList.remove("height-100");

    document.getElementById("canvas").classList.remove("border-radius-0");
    document.getElementById("utility-container").classList.remove("border-radius-0");
    document.getElementById("start-screen").classList.remove("border-radius-0");
    document.getElementById("game-over-screen").classList.remove("border-radius-0");
}

elPolloLocoSound.addEventListener("ended", replayAudio);