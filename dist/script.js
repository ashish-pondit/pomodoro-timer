const focusTime = 25;
const restTime = 5;

let focus = true;
let currentTime = focusTime*60+1;

function hTime(timeSeconds){
  let minute = Math.floor(timeSeconds/60);
  let second = timeSeconds%60;

  let finalTime = '';
  if(minute <10){
    finalTime += '0'+minute.toString();
  } else{
    finalTime += minute.toString();
  }

  // finalTime += ':';

  if(second <10){
    finalTime += '0'+second.toString();
  } else{
    finalTime += second.toString();
  }
  return finalTime;
}

function setupFlip(tick) {

 Tick.helper.interval(function() {
  if(currentTime == 0){
    focus = !focus;
    if(focus){
      currentTime = focusTime*60+1;
    }else{
      currentTime = restTime*60+1;
    }
  }

  currentTime--;
  let time = hTime(currentTime);
  tick.value = time;

  // const node = document.querySelector('.tick-flip:nth-child(3)')
  
 }, 1000);

}