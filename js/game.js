let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let endGame = false;
let isSoundClicked = true;
let elPolloLocoSound = new Audio("./audio/el-pollo-loco.mp3");
let gameOverSound = new Audio("./audio/game-over.mp3");
let endBossSound = new Audio("./audio/suspenseful-music.mp3");
let firstStartGame = false;
let intervalsIds = [];
let isPaused = false;
let checkGameOverInterval;
let checkSoundInterval;
let isInfoClose = true;
let changeCondition;
const fullScreen = document.getElementById("main");
const pauseText = document.getElementById("paused-text");

function init() {
    showGameElements();
    startGame();
}

function stopGame() {
    intervalsIds.forEach(clearInterval);
    clearInterval(checkSoundInterval);
    intervalsIds = [];
    isPaused = true;
}

function startGame() {
    clearInterval(checkGameOverInterval);
    isPaused = false;
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    checkGameOverInterval = setInterval(() => { checkGameOver(); }, 1000 / 60);
    checkSoundInterval = setInterval(() => { checkCurrentSound() }, 1000 / 60);
}

function checkGameOver() {
    if ((world.endBoss.currentAnimation == `isDeadEnd` || world.character.isDead()) && endGame) {
        setTimeout(() => { gameOverSound.play(); }, 1000);
        showGameOverScreen();
        showControlsWithDelay();
        stopGame();
        endGame = false;
    }
}

function pauseGameAndShowControls() {
    showPauseScreen();
    document.getElementById("paused-text").classList.remove("d-none");
    isPaused = true;
}

function resumeGameAndHideControls() {
    document.getElementById("paused-text").classList.add("d-none");
    hidePauseScreen();
    isPaused = false;
}

function showGameOverScreen() {
    document.getElementById("game-over-screen").classList.add("openScreen-animation");
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
    handleElPolloLocoSound();
    document.getElementById("paused-text").classList.add("d-none");
    stopGame();
    endGame = false;
}

function toggleInfoContainerVisibility() {
    const parentInfoContainer = document.getElementById("parent-info-container");
    const infoContainer = document.getElementById("info-container");
    const infoIcon = document.getElementById("info-icon");
    if (isInfoClose) {
        openInfo(parentInfoContainer, infoIcon, infoContainer);
    } else {
        closeInfo(parentInfoContainer, infoIcon, infoContainer);
    }
    isInfoClose = !isInfoClose;
}

function openInfo(parentInfoContainer, infoIcon, infoContainer) {
    parentInfoContainer.classList.remove("d-none");
    infoIcon.classList.add("info-icon-clicked");
    infoContainer.classList.add("openInfoScreen-animation");
    infoContainer.classList.remove("closeInfoScreen-animation");
}

function closeInfo(parentInfoContainer, infoIcon, infoContainer) {
    setTimeout(() => { parentInfoContainer.classList.add("d-none"); }, 1000);
    infoIcon.classList.remove("info-icon-clicked");
    infoContainer.classList.remove("openInfoScreen-animation");
    infoContainer.classList.add("closeInfoScreen-animation");
}

function hideGameControls() {
    document.getElementById("movement-container").classList.add("d-none");
    document.getElementById("actions-container").classList.add("d-none");
}

function showNavigationBarAndHidePauseButton() {
    document.getElementById("nav-bar-left").classList.remove("d-none");
    document.getElementById("pause-button").classList.add("d-none");
    document.getElementById("sound-icon-2").classList.add("d-none");
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
    document.getElementById("sound-icon-2").classList.remove("d-none");
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
    document.getElementById("game-over-screen").classList.remove("openScreen-animation");
}

function toggleSizeScreen(method_X, method_Y, action) {
    document.getElementById("maximize-icon").classList[method_X]("d-none");
    document.getElementById("minimize-icon").classList[method_Y]("d-none");
    document.getElementById("canvas").classList[method_X]("border-radius-0");
    document.getElementById("utility-container").classList[method_X]("border-radius-0");
    document.getElementById("start-screen").classList[method_X]("border-radius-0");
    document.getElementById("game-over-screen").classList[method_X]("border-radius-0");
    if (action == "open") {
        openFullscreen(fullScreen);
    } else if (action == "close") {
        closeFullscreen();
    }
}

document.addEventListener('fullscreenchange', function (e) {
    if (!document.fullscreenElement) {
        document.getElementById("maximize-icon").classList.remove("d-none");
        document.getElementById("minimize-icon").classList.add("d-none");
        document.getElementById("canvas").classList.remove("border-radius-0");
        document.getElementById("utility-container").classList.remove("border-radius-0");
        document.getElementById("start-screen").classList.remove("border-radius-0");
        document.getElementById("game-over-screen").classList.remove("border-radius-0");
    }
});

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    window.focus();
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function changeSoundCondition() {
    return world.character.x > 3500 && !world.endBoss.hadFirstContact;
}

function isSoundPlaying(audio) {
    return !audio.paused;
}

function handleElPolloLocoSound() {
    if (isSoundPlaying(elPolloLocoSound)) {
        pauseAudioWithFadeOut(elPolloLocoSound);
        elPolloLocoSound = new Audio("./audio/el-pollo-loco.mp3");
        playAudioWithFadeIn(elPolloLocoSound);
    } else {
        elPolloLocoSound = new Audio("./audio/el-pollo-loco.mp3");
    }
}

function checkCurrentSound() {
    changeCondition = changeSoundCondition();
    if (changeCondition) {
        const isCurrentSoundPlaying = isSoundPlaying(elPolloLocoSound);
        if (isCurrentSoundPlaying) {
            pauseAudioWithFadeOut(elPolloLocoSound);
        }
        elPolloLocoSound = new Audio("./audio/suspenseful-music.mp3");
        if (isCurrentSoundPlaying) {
            playAudioWithFadeIn(elPolloLocoSound);
        }
    }
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
        if (volume >= 0.5) {
            clearInterval(fadeInterval);
        } else {
            volume = Math.min(0.5, volume + fadeStep);
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

function replayAudio() {
    elPolloLocoSound.currentTime = 0;
    playAudioWithFadeIn(elPolloLocoSound);
}

elPolloLocoSound.addEventListener("ended", replayAudio);