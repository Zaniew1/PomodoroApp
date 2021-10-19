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
// if local storage is cleared, save LocalStorage, prevents bug with empty inputs
    if(localStorage.length == 0){
        saveLocalStorageOfSettings();
    }
    
    const loadLocalStorageOfSettings = ()=> {
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
    loadLocalStorageOfSettings();
    const liStore = [];    // array containing all li elements in local storage
    const liStoreCompletedTasks = []; // array containing all numbers of completed tasks of li  
// LOCAL STORAGE OF TODO LIST
    const saveLocalStorageOfToDoList = ()=>{
        localStorage.setItem('liElements', JSON.stringify(liStore));
        localStorage.setItem('completedTaskData', JSON.stringify(liStoreCompletedTasks))
    }
// saveLocalStorageOfToDoList()
    const loadLocalStorageOfToDoList = ()=>{
        if(localStorage.liElements != undefined){
            //create number of li as is in array liStore
            for(let i = 0; i < JSON.parse(localStorage.getItem('liElements')).length; i++){
                // rendering all li but with localStorage data
                const liItem = document.createElement('li');
                liItem.className = "all__item";
                liItem.innerHTML = `
                    <div class="all__wrapper-one">
                        <i class="fas fa-check-circle all__icon"></i>
                        <p class="all__text">${JSON.parse(localStorage.getItem('liElements'))[i].text}</p>
                    </div> 
                    <div class="all__wrapper-two">
                        <div class="all__number-of-tasks">
                            <span class="all__number-of-tasks-done"> ${JSON.parse(localStorage.getItem('completedTaskData'))[i] === undefined ? 0 : JSON.parse(localStorage.getItem('completedTaskData'))[i] }</span> /
                            <span class="all__number-of-tasks-to-do">${JSON.parse(localStorage.getItem('liElements'))[i].tasksNumber}</span>
                        </div>
                        <div class="all__options">
                            <div class="all__edit"><i class="far fa-edit"></i> </div>
                            <div class="all__delete"><i class="fas fa-trash"></i></div>
                        </div>
                    </div>
                    <div class="all__wrapper-three ">
                    <p class="all__note">
                        ${JSON.parse(localStorage.getItem('liElements'))[i].noteText}
                    </p>
                </div>`;
                allTasks.push(liItem);
                allEstimatedPomodoros.push(Number(JSON.parse(localStorage.getItem('liElements'))[i].tasksNumber))
                //pushing data again to liStore so new li wont overwrite li's in localStorage
                liStore.push({text: JSON.parse(localStorage.getItem('liElements'))[i].text, tasksNumber: JSON.parse(localStorage.getItem('liElements'))[i].tasksNumber, noteText: JSON.parse(localStorage.getItem('liElements'))[i].noteText})
                renderLiList();
                givingBorderToFirstTask();
                checkCheckMark();
                setEstimateTime();
                showNoteOnTask();
                calculateFinishedTasks();
                liItem.querySelector(".all__delete").addEventListener('click', deleteSingleTask);
                liItem.querySelector(".all__edit").addEventListener('click', editSingleTask); 
            }
        }
    }



