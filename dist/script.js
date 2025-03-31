const FOCUS_TIME = 25;
const REST_TIME = 10;

const audio_controller = document.querySelector(".audio-controll");

let timer = JSON.parse(localStorage.getItem("timer")) || FOCUS_TIME;
let state = localStorage.getItem("state") || "focus";
let pause = JSON.parse(localStorage.getItem("pause")) || false;
let audioPaused = JSON.parse(localStorage.getItem("audioPaused")) || true;
let audioSrc = localStorage.getItem("audioSrc") || "";

let bgImageIndex = 0;
const bgImages = [
  "./static/bg-1.jpg",
  "./static/bg-2.jpg",
  "./static/bg-3.jpg",
  "./static/bg-4.jpg",
  "./static/bg-5.jpg",
];

const audioLibrary = {
  fire: "https://mynoise.world/NoisesOnline/Audio/ea.ogg",
  water: "https://mynoise.world/NoisesOnline/Audio/aa.ogg",
  bird: "https://mynoise.world/NoisesOnline/Audio/da.ogg",
  "ding-dong": "https://mynoise.world/NoisesOnline/Audio/gb.ogg",
  meditation: "https://mynoise.world/NoisesOnline/Audio/ga.ogg",
};

function changeSound(event) {
  const soundType = this.getAttribute("data-sound-type");
  let target = event.currentTarget;
  if (target.classList.contains("button-active")) {
    audio_controller.pause();
    audio_controller.src = "";
    target.classList.remove("button-active");
  } else {
    document.querySelectorAll(".audio-collection span").forEach((item) => {
      item.classList.remove("button-active");
    });

    audio_controller.pause();
    audio_controller.src = audioLibrary[soundType];
    if (!pause) {
      audio_controller.play();
    } else {
      audio_controller.pause();
    }
    target.classList.add("button-active");
  }
}

function wrapperFunction(event) {
  const soundType = this.getAttribute("data-sound-type");
  changeSound(event, soundType);
}

document.querySelector("#sound-water").addEventListener("click", changeSound);
document.querySelector("#sound-fire").addEventListener("click", changeSound);
document.querySelector("#sound-bird").addEventListener("click", changeSound);
document
  .querySelector("#sound-ding-dong")
  .addEventListener("click", changeSound);
document
  .querySelector("#sound-meditation")
  .addEventListener("click", changeSound);

function dynamicBackground() {
  if (bgImages.length > 0) {
    document.querySelector("body").style.backgroundImage = `url("${
      bgImages[bgImageIndex++]
    }")`;
    if (bgImageIndex >= bgImages.length - 1) {
      bgImageIndex = 0;
    }
  }
}

function controlPomodoro() {
  if (pause) {
    document.querySelector(".controller .pause").style.display = "block";
    document.querySelector(".controller .play").style.display = "none";
    pause = !pause;
    audio_controller.play();
  } else {
    document.querySelector(".controller .pause").style.display = "none";
    document.querySelector(".controller .play").style.display = "block";
    pause = !pause;
    audio_controller.pause();
  }
}

function setPomodoroControl() {
  document
    .querySelector(".controller")
    .addEventListener("click", controlPomodoro);

  if (!pause) {
    document.querySelector(".controller .pause").style.display = "block";
    document.querySelector(".controller .play").style.display = "none";
  } else {
    document.querySelector(".controller .pause").style.display = "none";
    document.querySelector(".controller .play").style.display = "block";
  }
}
setPomodoroControl();

function setTimeText(timeString) {
  document.querySelector("time").innerText = timeString;
}

function zeroPad(number) {
  if (number < 10) {
    return "0" + number.toString();
  } else {
    return number.toString();
  }
}

function secondsToText(totalSeconds) {
  let minute = zeroPad(Math.floor(totalSeconds / 60));
  let seconds = zeroPad(totalSeconds % 60);
  let timeString = `${minute}:${seconds}`;
  setTimeText(timeString);
}

function playCountDown() {
  audioPaused = audio_controller.paused;
  audioSrc = audio_controller.src;

  audio_controller.src = "./assets/countdown.wav";
  if (!audioPaused) {
    audio_controller.play();
  }
}

function resumeAudio() {
  audio_controller.src = audioSrc;
  if (!audioPaused) {
    audio_controller.play();
  }
}

function timerFunction() {
  if (!pause) {
    if (timer === 0 && state === "focus") {
      state = "rest";
      timer = REST_TIME;
      document.querySelector(".time-text").innerText = "Resting";
      resumeAudio();
    } else if (timer === 0 && state === "rest") {
      state = "focus";
      timer = FOCUS_TIME;
      document.querySelector(".time-text").innerText = "Focusing";
      dynamicBackground();
      resumeAudio();
    }

    if (timer === 4) {
      playCountDown();
    }

    timer--;
    secondsToText(timer);
  }
}

function saveState() {
  localStorage.setItem("timer", timer);
  localStorage.setItem("state", state);
  localStorage.setItem("pause", pause);
  localStorage.setItem("audioPaused", audioPaused);
  localStorage.setItem("audioSrc", audioSrc);
}

setInterval(timerFunction, 1000);
setInterval(saveState, 5000);
