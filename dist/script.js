const focusTime = 25;
const restTime = 5;

let focus = true;
let currentTime = focusTime * 60 + 1;

function hTime(timeSeconds) {
    let minute = Math.floor(timeSeconds / 60);
    let second = timeSeconds % 60;

    let finalTime = "";
    if (minute < 10) {
        finalTime += "0" + minute.toString();
    } else {
        finalTime += minute.toString();
    }

    // finalTime += ':';

    if (second < 10) {
        finalTime += "0" + second.toString();
    } else {
        finalTime += second.toString();
    }
    return finalTime;
}

function getMinute(timeSeconds) {
    let minute = Math.floor(timeSeconds / 60);
    if(minute < 10) {
      return '0'+minute.toString();
    }else{
      return minute.toString();
    }
}

function getSecond(timeSeconds) {
    let second = timeSeconds % 60;
    if(second<10){
      return '0'+second.toString();
    }else{
      return second.toString();
    }
}

function setTime() {
    if (currentTime == 0) {
        focus = !focus;
        if (focus) {
            currentTime = focusTime * 60 + 1;
        } else {
            currentTime = restTime * 60 + 1;
        }
    }

    currentTime--;
}

function setupMinute(tick) {
    Tick.helper.interval(function () {
        let time = getMinute(currentTime);
        tick.value = time;
    }, 1000);
}

function setupSecond(tick) {
  Tick.helper.interval(function () {
    setTime();
      let time = getSecond(currentTime);
      tick.value = time;
  }, 1000);
}
