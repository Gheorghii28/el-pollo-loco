let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let endGame = false;
let isSoundClicked = true;
let elPolloLocoSound = new Audio("../audio/el-pollo-loco.mp3");
let firstStartGame = false;
let intervalsIds = [];
let isPaused = false;
let checkGameOverInterval;

function stopGame() {
    intervalsIds.forEach(clearInterval);
    intervalsIds = [];
    isPaused = true;
}

function startGame() {
    clearInterval(checkGameOverInterval);
    isPaused = false;
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    checkGameOverInterval = setInterval(() => {
        checkGameOver();
    }, 1000 / 60);
}

function init() {
}

function checkGameOver() {
    if ((world.endBoss.currentAnimation == `isDeadEnd` || world.character.isDead()) && endGame) {
        showGameOverScreen();
        showControlsWithDelay();
        stopGame();
        endGame = false;
    }
}

function startGameAndHideStartScreen() {
    showGameElements();
    startGame();
}

function pauseGameAndShowControls() {
    showPauseScreen();
    isPaused = true;
}

function resumeGameAndHideControls() {
    hidePauseScreen();
    isPaused = false;
}

function showGameOverScreen() {
    document.getElementById("game-over-screen").classList.add("game-over-animation-open");
    hideGameControls();
}

function showControlsWithDelay() {
    setTimeout(() => {
        showBackwardIconAndNavigationBar();
    }, 2000);
}

function showGameElements() {
    hideNavigationBarAndShowPauseButton();
    hideStartScreenAndShowGameElements();
}

function showPauseScreen() {
    showNavBarRightAndUtilityContainer();
    showBackwardIconAndNavigationBar();
}

function hidePauseScreen() {
    hideNavigationBarAndShowPauseButton();
    hidePlayButtonAndRemoveTranslucentBg();
}

function showStartScreen() {
    showStartScreenAndNavBarRight();
    showNavigationBarAndHidePauseButton();
    hidePlayButtonAndRemoveTranslucentBg();
    hideGameControls();
}

function hideGameControls() {
    document.getElementById("movement-container").classList.add("d-none");
    document.getElementById("actions-container").classList.add("d-none");
}

function showNavigationBarAndHidePauseButton() {
    document.getElementById("nav-bar-left").classList.remove("d-none");
    document.getElementById("pause-button").classList.add("d-none");
}

function showBackwardIconAndNavigationBar() {
    document.getElementById("nav-bar-left").classList.remove("gap-0");
    document.getElementById("backward-icon").classList.remove("d-none");
    showNavigationBarAndHidePauseButton();
}

function hideNavigationBarAndShowPauseButton() {
    document.getElementById("nav-bar-right").classList.add("d-none");
    document.getElementById("nav-bar-left").classList.add("d-none");
    document.getElementById("pause-button").classList.remove("d-none");
}

function hidePlayButtonAndRemoveTranslucentBg() {
    document.getElementById("play-button-small").classList.add("d-none");
    document.getElementById("utility-container").classList.remove("translucent-bg");
}

function showStartScreenAndNavBarRight() {
    document.getElementById("start-screen").classList.remove("d-none");
    document.getElementById("play-button").classList.remove("d-none");
    document.getElementById("nav-bar-left").classList.add("gap-0");
    document.getElementById("backward-icon").classList.add("d-none");
    console.log("backward-icon")
    document.getElementById("nav-bar-right").classList.remove("d-none");
}

function showNavBarRightAndUtilityContainer() {
    document.getElementById("nav-bar-right").classList.remove("d-none");
    document.getElementById("utility-container").classList.add("translucent-bg");
    document.getElementById("play-button-small").classList.remove("d-none");
}

function hideStartScreenAndShowGameElements() {
    document.getElementById("start-screen").classList.add("d-none");
    document.getElementById("play-button").classList.add("d-none");
    document.getElementById("movement-container").classList.remove("d-none");
    document.getElementById("actions-container").classList.remove("d-none");
    document.getElementById("game-over-screen").classList.remove("game-over-animation-open");
}

function toggleSizeScreen(method_X, method_Y) {
    document.getElementById("headline").classList[method_X]("d-none");
    document.getElementById("maximize-icon").classList[method_X]("d-none");
    document.getElementById("minimize-icon").classList[method_Y]("d-none");
    document.getElementById("main").classList[method_X]("width-100");
    document.getElementById("main").classList[method_X]("height-100");
    document.getElementById("canvas").classList[method_X]("border-radius-0");
    document.getElementById("utility-container").classList[method_X]("border-radius-0");
    document.getElementById("start-screen").classList[method_X]("border-radius-0");
    document.getElementById("game-over-screen").classList[method_X]("border-radius-0");
}

function replayAudio() {
    elPolloLocoSound.currentTime = 0;
    playAudioWithFadeIn(elPolloLocoSound);
}

function toggleSound(event) {
    if (isSoundClicked) {
        event.classList.remove("sound-icon-clicked");
        isSoundClicked = false;
        playAudioWithFadeIn(elPolloLocoSound);
    } else {
        event.classList.add("sound-icon-clicked");
        isSoundClicked = true;
        pauseAudioWithFadeOut(elPolloLocoSound);
    }
}

function playAudioWithFadeIn(audio) {
    audio.volume = 0;
    audio.play();
    let volume = 0;
    const fadeStep = 0.1;
    const fadeInterval = setInterval(() => {
        if (volume >= 1) {
            clearInterval(fadeInterval);
        } else {
            volume = Math.min(1, volume + fadeStep);
            audio.volume = volume;
        }
    }, 100);
}

function pauseAudioWithFadeOut(audio) {
    const fadeStep = 0.1;
    let volume = audio.volume;
    const fadeInterval = setInterval(() => {
        if (volume <= fadeStep) {
            clearInterval(fadeInterval);
            audio.pause();
        } else {
            volume = Math.max(0, volume - fadeStep);
            audio.volume = volume;
        }
    }, 100);
}

elPolloLocoSound.addEventListener("ended", replayAudio);
