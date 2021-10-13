    //  LOCAL STORAGE OF TIMER
    const saveLocalStorageOfSettings = ()=> {
        localStorage.setItem('pomodoroMinutes', document.querySelector('.settings__time-of-clock-input--pomodoro').value)
        localStorage.setItem('shortBreakMinutes', document.querySelector('.settings__time-of-clock-input--short').value)
        localStorage.setItem('longBreakMinutes', document.querySelector('.settings__time-of-clock-input--long').value)
        localStorage.setItem('longBreakInterval', document.querySelector('.settings__long-interval-input').value)
        localStorage.setItem('autoStartBreaks', document.querySelector('.settings__auto-breaks-accept').className )
        localStorage.setItem('autoStartPomodoros', document.querySelector('.settings__auto-pomodoro-accept').className)
        localStorage.setItem('alarmSoundsSelect', document.querySelector('.settings__alarm-sound-select').selectedIndex)
        localStorage.setItem('tickingSoundsSelect', document.querySelector('.settings__ticking-sound-select').selectedIndex)
        localStorage.setItem('alarmSoundsVolume', document.querySelector('.settings__alarm-volume-input').value)
        localStorage.setItem('tickingSoundsVolume', document.querySelector('.settings__ticking-volume-input').value)
    }
    const loadLocalStorageOfSettings = ()=> {
        if(localStorage.length !== 0){
            document.querySelector('.settings__time-of-clock-input--pomodoro').value = localStorage.getItem('pomodoroMinutes')
            document.querySelector('.settings__time-of-clock-input--short').value = localStorage.getItem('shortBreakMinutes')
            document.querySelector('.settings__time-of-clock-input--long').value = localStorage.getItem('longBreakMinutes')
            document.querySelector('.settings__long-interval-input').value = localStorage.getItem('longBreakInterval')
            document.querySelector('.settings__auto-breaks-accept').className =    localStorage.getItem('autoStartBreaks')
            document.querySelector('.settings__auto-pomodoro-accept').className = localStorage.getItem('autoStartPomodoros')
            document.querySelector('.settings__alarm-sound-select').selectedIndex = localStorage.getItem('alarmSoundsSelect')
            document.querySelector('.settings__ticking-sound-select').selectedIndex = localStorage.getItem('tickingSoundsSelect')
            document.querySelector('.settings__alarm-volume-input').value = localStorage.getItem('alarmSoundsVolume')
            document.querySelector('.settings__ticking-volume-input').value = localStorage.getItem('tickingSoundsVolume');
        
        }
        if(document.querySelector('.settings__alarm-volume-input').value == "" || document.querySelector('.settings__auto-breaks-accept').className == ""){
            localStorage.clear();
        }
    }
    loadLocalStorageOfSettings();







    // LOCAL STORAGE OF TODO LIST

    const saveLocalStorageOfToDoList = ()=>{
        localStorage.setItem('estimatedPomodoros', JSON.stringify(allTasks));
    }
    const loadLocalStorageOfToDoList = ()=>{
        allTasks = JSON.parse( localStorage.getItem('allTasks') || '[]');
    }
