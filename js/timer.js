    //TIMER
        const clockMin = document.querySelector('.clock__minutes');
        const clockSec = document.querySelector('.clock__seconds');
        const pomodoroButton = document.querySelector('.clock__one');
        const shortBreakButton = document.querySelector('.clock__two');
        const longBreakButton = document.querySelector('.clock__three');
        const startButton = document.querySelector('.clock__start');
        const taskText = document.querySelector('.task__text');
        const reset = document.querySelector('.reset');
        const timer = document.querySelector('.timer');
        const infoSection =  document.querySelector('.info');
        let pomodoroMinValue = document.querySelector(".settings__time-of-clock-input--pomodoro").value;
        let shortMinValue = document.querySelector(".settings__time-of-clock-input--short").value
        let longMinValue = document.querySelector(".settings__time-of-clock-input--long").value
        let buttonActive = false; // button used for timer

        let clockMinutesPomodoros = pomodoroMinValue - 1 ; // Minutes of Timer = number of minutes saved in settings - 1
        let clockMinutesShort = shortMinValue - 1 ; // Minutes of Timer = number of minutes saved in settings - 1
        let clockMinutesLong = longMinValue - 1; // Minutes of Timer = number of minutes saved in settings - 1
        let clockSecondsPomodoros = 60;
        let clockSecondsShort = 60;
        let clockSecondsLong = 60;

        let idIntervalPomodoroClock; // ID timer interval
        let idIntervalShortClock; // ID timer interval
        let idIntervalLongClock; // ID timer interval
    
        let longBreakActivate = 0;
   
    //  function changing color of buttons(pomodoro, shortbreak, longbreak)
        const removeColorFromClockButtons = function(){
            pomodoroButton.classList.remove('clock__button--active');
            shortBreakButton.classList.remove('clock__button--active');
            longBreakButton.classList.remove('clock__button--active');
            turningOffSoundFunction();
        }
    // FUNCTION STOPING INTERVALS   
        const clearAllIntervals = ()=>{
            clearInterval(idIntervalPomodoroClock)
            clearInterval(idIntervalLongClock)
            clearInterval(idIntervalShortClock)
        }
    // FUNCTION STARTING INTERVALS 
        const startTimerAfterStop = ()=>{
            if(pomodoroButton.classList.contains('clock__button--active')){
                idIntervalPomodoroClock = setInterval(pomodoroTimer, 1000)
            }
            else if(shortBreakButton.classList.contains('clock__button--active')){
                idIntervalShortClock = setInterval(shortTimer, 1000)
            }
            else{
                idIntervalLongClock = setInterval(longTimer, 1000)
            }
        }
    // FUNCTION ADDING ZERO IF TIMER IS BELOW TEN
        const addingZeroToTimerWhileBelowTen = (seconds, minutes ) =>{
            if(seconds <= 9){
                clockSec.textContent = "0" + seconds; 
            }
            else{
                clockSec.textContent = seconds;
            }
            if(minutes <= 9){
                clockMin.textContent = "0" + minutes;
            }
            else{
                clockMin.textContent = minutes;
            }
        } 
    //FUNCTION CHANGING COLOR startButton 
        const removeColorFromStartButton = ()=>{
            startButton.classList.remove('clock__start--orange');
            startButton.classList.remove('clock__start--blue');
            startButton.classList.remove('clock__start--green');
        }
    //FUNCTION CHANGING BGC OF SECTION TIMER 
        const removeBgcOfTimer =()=>{
            timer.classList.remove('timer--orange');
            timer.classList.remove('timer--blue');
            timer.classList.remove('timer--green');
        }
    // FUNCTION CHANGING BGC
        const changeBgcColor = function(){
            document.body.classList.remove('orange');
            document.body.classList.remove('blue');
            document.body.classList.remove('green');
        }
    //FUNCTION CHANGING COLOR OF SECTION INFO
        const changeInfoColor = ()=>{
            infoSection.classList.remove('info--orange') ;   
            infoSection.classList.remove('info--green') ;   
            infoSection.classList.remove('info--blue') ;   
        }
    // FUNCTION POMODORO
        const pomodoroFunction = ()=>{
            let pomodoroMinValue = document.querySelector(".settings__time-of-clock-input--pomodoro").value;
            clockSecondsPomodoros = 60;
            clockMinutesPomodoros = pomodoroMinValue - 1;
            clockSec.textContent = "00";
            clockMin.textContent = (String(pomodoroMinValue)<10 ? "0"+String(pomodoroMinValue): String(pomodoroMinValue))
            clearAllIntervals();
            removeColorFromClockButtons();
            changeBgcColor();
            removeBgcOfTimer();
            removeColorFromStartButton();
            changeInfoColor();
            infoSection.classList.add('info--orange');
            pomodoroButton.classList.add('clock__button--active');
            document.body.classList.add('orange');
            timer.classList.add('timer--orange');
            startButton.classList.add('clock__start--orange');
            startButton.textContent = "Start";
            taskText.textContent = "Time to work !";
            buttonActive = false;
            reset.classList.remove('reset--visible');
        }
        pomodoroFunction(); // Wywołanie na początku funkcji, pozwala na uniknięcie bugu z resetowaniem 
        pomodoroButton.addEventListener('click', pomodoroFunction)
    // FUNCTION  SHORT BREAK
        const shortBreakFunction = ()=>{
            let shortMinValue = document.querySelector(".settings__time-of-clock-input--short").value
            clockSecondsShort = 60;
            clockMinutesShort = shortMinValue - 1;
            clockMin.textContent = (String(shortMinValue)<10 ? "0"+String(shortMinValue): String(shortMinValue))
            clockSec.textContent = "00";
            clearAllIntervals(); 
            removeColorFromClockButtons();
            changeBgcColor();
            removeBgcOfTimer();
            removeColorFromStartButton();
            changeInfoColor();
            infoSection.classList.add('info--blue');
            shortBreakButton.classList.add('clock__button--active');
            document.body.classList.add('blue');
            startButton.classList.add('clock__start--blue');
            timer.classList.add('timer--blue');
            startButton.textContent = "Start"
            taskText.textContent = "Time to rest !";
            buttonActive = false;
            reset.classList.remove('reset--visible');
        }
        shortBreakButton.addEventListener('click', shortBreakFunction )
    // FUNCTION LONG BREAK
        const longBreakFunction =  ()=>{
            let longMinValue = document.querySelector(".settings__time-of-clock-input--long").value
            clockSecondsLong = 60;
            clockMinutesLong = longMinValue - 1;
            clockSec.textContent = "00";
            clockMin.textContent = (String(longMinValue)<10 ? "0" + String(longMinValue) : String(longMinValue))
            clearAllIntervals();
            removeColorFromClockButtons();
            changeBgcColor(); 
            removeBgcOfTimer();
            removeColorFromStartButton();
            changeInfoColor();
            infoSection.classList.add('info--green');
            longBreakButton.classList.add('clock__button--active');
            document.body.classList.add('green');
            startButton.classList.add('clock__start--green');
            timer.classList.add('timer--green');
            startButton.textContent = "Start"
            taskText.textContent = "Time to rest !";
            buttonActive = false;
            reset.classList.remove('reset--visible');
        }
        longBreakButton.addEventListener('click', longBreakFunction) 
    // FUNCTION TIMER POMODORO
        const pomodoroTimer = ()=>{ 
            let longIntervalInput = document.querySelector('.settings__long-interval-input').value;
            clockSecondsPomodoros--;
            if(clockSecondsPomodoros === 0){
                clockMinutesPomodoros--;
                clockSecondsPomodoros = 59;
                if(clockMinutesPomodoros === -1 ){
                    longBreakActivate++;
                    useSoundAfterFinish();
                    //IF HAS AUTOSTART
                    if(autoStartBreaksBtn.classList.contains('settings__auto-breaks-accept--active')){
                        //longBreakActive to zmienna globalna liczona od zera, inkrementuje się kiedy pomodoroTimer się zakończy,
                        // longIntervalInput(long break interval) to wartość inputa w settings
                        if(longBreakActivate%longIntervalInput == 0 ){
                            longBreakFunction();
                            startButtonFunction();
                            clockMinutesPomodoros = longMinValue;
                        }
                        else{
                            shortBreakFunction();
                            startButtonFunction();
                            clockMinutesPomodoros = shortMinValue; 
                        }
                    }
                    //IF DOESNT HAVE AUTO START
                    else{
                        turningOffSoundFunction();
                        alert("Time is gone, it's time to rest");
                        shortBreakFunction();
                        clockMinutesPomodoros = shortMinValue;  
                        if(longBreakActivate%longIntervalInput == 0 ){
                            longBreakFunction();
                            clockMinutesPomodoros = longMinValue;
                        }
                    }
                    clockSecondsPomodoros = 0; 
                    // ADDING AND CALCULATING FINISHED TASKS AND THIER FINISH TIME
                    addingCompletedTasks();
                    calculateFinishedTasks();
                    calculatingEstimatedTimeToFinish();      
                }
            }
            addingZeroToTimerWhileBelowTen(clockSecondsPomodoros, clockMinutesPomodoros );
        };
    // FUNCTION TIMER SHORT BREAK
        const shortTimer = ()=>{ 
            clockSecondsShort--;
            if(clockSecondsShort === 0){
                clockMinutesShort--
                clockSecondsShort = 59;
                if(clockMinutesShort === -1){
                    clockSecondsShort = 0;
                    clockMinutesShort = pomodoroMinValue;
                    //IF HAS AUTOSTART
                    if(autoStartPomodoroBtn.classList.contains('settings__auto-pomodoro-accept--active')){
                        pomodoroFunction();
                        startButtonFunction();
                    }
                    else{
                        alert("Time is gone, it's time to work") 
                        pomodoroFunction();
                    }   
                }
            }
            addingZeroToTimerWhileBelowTen(clockSecondsShort, clockMinutesShort );         
        };
    // FUNCTION TIMER LONG BREAK
        const longTimer = ()=>{ 
            clockSecondsLong--;
            if(clockSecondsLong === 0){
                clockMinutesLong--
                clockSecondsLong = 59;
                if(clockMinutesLong === -1){
                    clockSecondsLong = 0;
                    clockMinutesLong = pomodoroMinValue;
                    //Jeśli ma autostart
                    if(autoStartPomodoroBtn.classList.contains('settings__auto-pomodoro-accept--active')){
                        pomodoroFunction();
                        startButtonFunction();
                    }
                    else{
                        alert("Time is gone, it's time to work") 
                        pomodoroFunction();
                    }     
                }
            }
            addingZeroToTimerWhileBelowTen(clockSecondsLong, clockMinutesLong );            
        };
    // START TIMER FUNCTION
        const startButtonFunction = () =>{
            startPomodoroClick.play();
            startPomodoroClick.volume = 0.1;
            tickingSoundFunction();
            if(!buttonActive){
                buttonActive = true;
                reset.classList.add('reset--visible');
                startButton.textContent = "Stop"
                startTimerAfterStop();
            }
            else{
                turningOffSoundFunction();
                buttonActive = false;
                reset.classList.remove('reset--visible');
                startButton.textContent = "Start"
                clearAllIntervals();
            }
        }
        startButton.addEventListener('click', startButtonFunction)  
    // RESET TIMER FUNCTION
        const resetButton = ()=>{
            clearAllIntervals();
            turningOffSoundFunction();
            if(confirm("Are u sure, you want to finish earlier ? ")){
                buttonActive = false;
                // IF CANCELED DURING TASK, SWITCH TO REST
                if ( pomodoroButton.classList.contains('clock__button--active')){
                    shortBreakFunction();
                    addingCompletedTasks();
                    calculateFinishedTasks(); 
                }
                 //IF CANCELED DURING REST, SWITCH TO TASK
                else{
                    pomodoroFunction();
                }    
            }
            else{
                startTimerAfterStop();
                tickingSoundFunction();
            }
        }
        reset.addEventListener('click', resetButton)