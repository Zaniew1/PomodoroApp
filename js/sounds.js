 //Sounds
 const ticking = new Audio('sounds/ticking.m4a');
 const alarm = new Audio('sounds/Alarm.wav');
 const cock = new Audio('sounds/Cock.wav');
 const arcade = new Audio('sounds/Arcade.wav');
 const whistle = new Audio('sounds/Whistle.wav');
 const phone = new Audio('sounds/Phone.wav');
 const slowTicking = new Audio('sounds/slowTicking.mp3');
 const fastTicking = new Audio('sounds/fastTicking.m4a');
 const startPomodoroClick = new Audio('sounds/startPomodoroClick.mp3')
 const alarmSoundsSelect = document.querySelector('.settings__alarm-sound-select')
 const tickingSoundsSelect = document.querySelector('.settings__ticking-sound-select')
// Short sound after finishing task or break
 const useSoundAfterFinish = ()=>{
     let audioVolume = document.querySelector('.settings__alarm-volume-input').value
     alarm.volume = (Number(audioVolume))/100;
     arcade.volume = (Number(audioVolume))/100;
     cock.volume = (Number(audioVolume))/100;
     phone.volume = (Number(audioVolume))/100;
     whistle.volume = (Number(audioVolume))/100;
     if(alarmSoundsSelect.selectedIndex === 0)
     {
         alarm.play();
     }
     else if(alarmSoundsSelect.selectedIndex === 1){
         arcade.play();
     }
     else if(alarmSoundsSelect.selectedIndex === 2){
         cock.play();
     }
     else if(alarmSoundsSelect.selectedIndex === 3){
         phone.play();
     }
     else{
         whistle.play();
     }
 }
// Optional Ticking sound during task
 const tickingSoundFunction = ()=>{
     let tickingVolume = document.querySelector('.settings__ticking-volume-input').value
     slowTicking.volume = (Number(tickingVolume))/100;
     fastTicking.volume = (Number(tickingVolume))/100;
     slowTicking.loop = true;
     fastTicking.loop = true;
     if(pomodoroButton.classList.contains('clock__button--active')){
         if(tickingSoundsSelect.selectedIndex === 1){
             slowTicking.play();
         }
         else if(tickingSoundsSelect.selectedIndex === 2){
             fastTicking.play();
         }
     }
 }
// turning off the ticking sound
 const turningOffSoundFunction = ()=>{
     slowTicking.pause();
     fastTicking.pause();
 }