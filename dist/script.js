const FOCUS_TIME = 25*60;
const REST_TIME = 5*60;

const audio_controller = document.querySelector(".audio-controll");

let focusTime = FOCUS_TIME;
let restTime = REST_TIME;
let state = "focus";
let pause = false;

let loadingCount = 1;
let loadingChar = ".";
let loadingLimit = 3;

let bgImageIndex = 0;
const bgImages = [
  "https://storage.googleapis.com/pai-images/d14e2785b40c4661937a7723936a52d8.jpeg",
  "https://storage.googleapis.com/pai-images/5015d0d422e442bea45fa5307f18ab2b.jpeg",
  "https://storage.googleapis.com/pai-images/d3a84ebe51f44db5a9e19d83b83ff9af.jpeg",
  "https://storage.googleapis.com/pai-images/97acd642a35b4af6b4ff786ca6d9dc37.jpeg",
];

const audioLibrary = {
  "fire": "https://mynoise.world/NoisesOnline/Audio/ea.ogg",
  "water": "https://mynoise.world/NoisesOnline/Audio/aa.ogg",
  "bird": "https://mynoise.world/NoisesOnline/Audio/da.ogg",
  "ding-dong": "https://mynoise.world/NoisesOnline/Audio/gb.ogg",
  "meditation": "https://mynoise.world/NoisesOnline/Audio/ga.ogg",
}

function changeSound(event){
  const soundType = this.getAttribute('data-sound-type');
  let target = event.currentTarget;
  if(target.classList.contains("button-active")){
    audio_controller.pause();
    audio_controller.src = "";
    target.classList.remove("button-active");
  }else{
 document.querySelectorAll(".audio-collection span").forEach((item)=>{
      item.classList.remove("button-active");
    })
    
    audio_controller.pause();
    audio_controller.src = audioLibrary[soundType];
    if(!pause){
      audio_controller.play();
    }else{
      audio_controller.pause();
    }
    target.classList.add("button-active");
  }
}

function wrapperFunction(event){
  const soundType = this.getAttribute('data-sound-type');
  changeSound(event, soundType);
}
// document.querySelector("#sound-water").addEventListener("click", changeSound);
// document.querySelector("#sound-fire").addEventListener("click", changeSound);
// document.querySelector("#sound-bird").addEventListener("click", changeSound);
// document.querySelector("#sound-ding-dong").addEventListener("click", changeSound);
// document.querySelector("#sound-meditation").addEventListener("click", changeSound);

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

// document
//   .querySelector(".controller")
//   .addEventListener("click", controlPomodoro);

function loading() {
  document.querySelector(".loading").innerText = loadingChar.repeat(
    loadingCount++
  );
  loadingCount = loadingCount > loadingLimit ? 1 : loadingCount;
}

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

function focusTimer() {
  if (focusTime === 0) {
    state = "rest";
    restTime = REST_TIME;
    document.querySelector(".time-text").innerText = "Resting";
  } else {
    focusTime--;
    secondsToText(focusTime);
  }
}

function restTimer() {
  if (restTime === 0) {
    state = "focus";
    focusTime = FOCUS_TIME;
    document.querySelector(".time-text").innerText = "Focusing";
    dynamicBackground();
  } else {
    restTime--;
    secondsToText(restTime);
  }
}

function timerFunction() {
  if (!pause) {
    if (state == "rest") {
      restTimer();
    } else {
      focusTimer();
    }
    loading();
  }
}

setInterval(timerFunction, 1000);