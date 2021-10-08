    //  LOCAL STORAGE
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
    document.querySelector('.settings__time-of-clock-input--pomodoro').value = localStorage.getItem('pomodoroMinutes')
    document.querySelector('.settings__time-of-clock-input--short').value = localStorage.getItem('shortBreakMinutes')
    document.querySelector('.settings__time-of-clock-input--long').value = localStorage.getItem('longBreakMinutes')
    document.querySelector('.settings__long-interval-input').value = localStorage.getItem('longBreakInterval')
    document.querySelector('.settings__auto-breaks-accept').className =    localStorage.getItem('autoStartBreaks')
    document.querySelector('.settings__auto-pomodoro-accept').className = localStorage.getItem('autoStartPomodoros')
    document.querySelector('.settings__alarm-sound-select').selectedIndex = localStorage.getItem('alarmSoundsSelect')
    document.querySelector('.settings__ticking-sound-select').selectedIndex = localStorage.getItem('tickingSoundsSelect')
    document.querySelector('.settings__alarm-volume-input').value = localStorage.getItem('alarmSoundsVolume')
    document.querySelector('.settings__ticking-volume-input').value = localStorage.getItem('tickingSoundsVolume')
    }
    if(localStorage.length !== 0){
        loadLocalStorageOfSettings();
    }

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
    let buttonActive = false;
   
    let clockMinutesPomodoros = pomodoroMinValue - 1 ;
    let clockMinutesShort = shortMinValue - 1 ;
    let clockMinutesLong = longMinValue - 1;
    let clockSecondsPomodoros = 60;
    let clockSecondsShort = 60;
    let clockSecondsLong = 60;

    let idIntervalPomodoroClock; // ID iNTERWAŁU TIMERA
    let idIntervalShortClock; // ID iNTERWAŁU TIMERA
    let idIntervalLongClock; // ID iNTERWAŁU TIMERA

    let longBreakActivate = 0;
//Sounds
    const ticking = new Audio('ticking.m4a');
    const alarm = new Audio('Alarm.wav');
    const cock = new Audio('Cock.wav');
    const arcade = new Audio('Arcade.wav');
    const whistle = new Audio('Whistle.wav');
    const phone = new Audio('Phone.wav');
    const slowTicking = new Audio('slowTicking.mp3');
    const fastTicking = new Audio('fastTicking.m4a');
    const startPomodoroClick = new Audio('startPomodoroClick.mp3')
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

// FUNKCJA ZMIENIAJĄCA  KOLOR PRZYCISKÓW OPCJI POMODORO, KRÓTKA PRZERRWA, DŁUGA PRZERWA
    const removeColorFromClockButtons = function(){
        pomodoroButton.classList.remove('clock__button--active');
        shortBreakButton.classList.remove('clock__button--active');
        longBreakButton.classList.remove('clock__button--active');
        turningOffSoundFunction();
    }
// FUNKCJA ZATRZYMUJĄCA INTERVAL    
    const clearAllIntervals = ()=>{
        clearInterval(idIntervalPomodoroClock)
        clearInterval(idIntervalLongClock)
        clearInterval(idIntervalShortClock)
    }
// FUNKCJA STARTUJĄCA TIMER
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
// FUNKCJA DODAJĄCA ZERO JEŚLI TIMER BĘDZIE PONIŻEJ 10 
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
//FUNKCJA ZMIENIAJĄCA COLOR startButton 
    const removeColorFromStartButton = ()=>{
        startButton.classList.remove('clock__start--orange');
        startButton.classList.remove('clock__start--blue');
        startButton.classList.remove('clock__start--green');
    }
//FUNKCJA ZMIENIAJĄCA BGC SEKCJI TIMER 
    const removeBgcOfTimer =()=>{
        timer.classList.remove('timer--orange');
        timer.classList.remove('timer--blue');
        timer.classList.remove('timer--green');
    }
// FUNKCJA ZMIENIAJĄCA BGC
    const changeBgcColor = function(){
        document.body.classList.remove('orange');
        document.body.classList.remove('blue');
        document.body.classList.remove('green');
    }
//FUNKCJA ZMIENIAJĄCA KOLOR SEKCJI INFO
    const changeInfoColor = ()=>{
        infoSection.classList.remove('info--orange') ;   
        infoSection.classList.remove('info--green') ;   
        infoSection.classList.remove('info--blue') ;   
    }
// FUNKCJA TIMER POMODORO
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
        taskText.textContent = "Czas na pracę !";
        buttonActive = false;
        reset.classList.remove('reset--visible');
    }
    pomodoroFunction(); // Wywołanie na początku funkcji, pozwala na uniknięcie bugu z resetowaniem 
    pomodoroButton.addEventListener('click', pomodoroFunction)
// FUNKCJA TIMER KRÓTKA PRZERWA
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
        taskText.textContent = "Czas na odpoczynek !";
        buttonActive = false;
        reset.classList.remove('reset--visible');
    }
    shortBreakButton.addEventListener('click', shortBreakFunction )
// FUNKCJA TIMER DŁUGA PRZERWA
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
        taskText.textContent = "Czas na odpoczynek !";
        buttonActive = false;
        reset.classList.remove('reset--visible');
    }
    longBreakButton.addEventListener('click', longBreakFunction) 
// FUNKCJA DOTYCZĄCA SAMEGO LICZNIKA POMODORO
    const pomodoroTimer = ()=>{ 
        let longIntervalInput = document.querySelector('.settings__long-interval-input').value;
        clockSecondsPomodoros--;
        if(clockSecondsPomodoros === 0){
            clockMinutesPomodoros--;
            clockSecondsPomodoros = 59;
            if(clockMinutesPomodoros === -1 ){
                longBreakActivate++;
                useSoundAfterFinish();
                //Jeśli ma autoStart
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
                //Jeśli nie ma autoStartu
                else{
                    turningOffSoundFunction();
                    alert('Czas się skończył, czas trochę odpocząć');

                    shortBreakFunction();
                    clockMinutesPomodoros = shortMinValue;  
                    if(longBreakActivate%longIntervalInput == 0 ){
                        longBreakFunction();
                        clockMinutesPomodoros = longMinValue;
                    }
                }
                clockSecondsPomodoros = 0; 
                //dodawanie i obliczanie skończonych zdań i czasu ukończenia zadań
                addingCompletedTasks();
                calculateFinishedTasks();
                calculatingEstimatedTimeToFinish();
                    
            }
        }
        addingZeroToTimerWhileBelowTen(clockSecondsPomodoros, clockMinutesPomodoros );
    };
// FUNKCJA DOTYCZĄCA SAMEGO LICZNIKA SHORT BREAK
    const shortTimer = ()=>{ 
        clockSecondsShort--;
        if(clockSecondsShort === 0){
            clockMinutesShort--
            clockSecondsShort = 59;
            if(clockMinutesShort === -1){
                clockSecondsShort = 0;
                clockMinutesShort = pomodoroMinValue;
                //Jeśli ma autostart
                if(autoStartPomodoroBtn.classList.contains('settings__auto-pomodoro-accept--active')){
                    pomodoroFunction();
                    startButtonFunction();
                }
                else{
                    alert('Czas się skończył, czas trochę popracować') 
                    pomodoroFunction();
                }   
            }
        }
        addingZeroToTimerWhileBelowTen(clockSecondsShort, clockMinutesShort );         
    };
// FUNKCJA DOTYCZĄCA SAMEGO LICZNIKA LONG BREAK
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
                    alert('Czas się skończył, czas trochę popracować') 
                    pomodoroFunction();
                }     
            }
        }
        addingZeroToTimerWhileBelowTen(clockSecondsLong, clockMinutesLong );            
    };
   
// FUNKCJA STARTUJĄCA TIMER
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

// FUNKCJA RESETUJĄCA TIMER
    const resetButton = ()=>{
        if(confirm("Czy jestes pewny że chcesz zakończyć rundę wcześniej ? ")){
            buttonActive = false;
            clearAllIntervals();
            // JEŚLI ANULOWANE PODCZAS WYKONYWANIA ZADANIA, PRZEŁĄCZ NA ODPOCZYNEK
            if ( taskText.textContent == "Czas na pracę !"){
                shortBreakFunction();
                addingCompletedTasks();
                calculateFinishedTasks(); 
            }
             // JEŚLI ANULOWANE PODCZAS WYKONYWANIA ODPOCZYNKU, PRZEŁĄCZ NA WYKONYWANIE ZADANIA
            else{
                pomodoroFunction();
            }    
        }
        else{
            startTimerAfterStop();
        }
    }
    reset.addEventListener('click', resetButton)

                    // TO DO LISTA
// PONIŻEJ MOŻE WYSTĘPOWAĆ WIELOKROTNA DEKLARACJA liList, JEST TO POWIĄZANE ŻE W POSZCZEGÓLNYCH
// FUNKCJACh LISTA TA MUSI BYĆ NA ŚWIEŻO POBIERANA ABY ZAWSZE SIĘ ZGADZAŁA LICZBA TYCH ELEMENTÓW
    const liList = [...document.querySelectorAll('.all__item')];
    const ulList = document.querySelector('.all__list');
    const addButton = document.querySelector('.button__wrapper');
    const addSurvey = document.querySelector('.add__wrapper');
    const addArrowUp = document.querySelector('.add__arrow-up');
    const addWhatText = document.querySelector('.add__what');
    const addArrowDown = document.querySelector('.add__arrow-down');
    const addInputTasks = document.querySelector(".add__number-of-pomodoros");
    const noteInput = document.querySelector(".add__note");
    const infoComplete = document.querySelector('.info__complete');
    const infoTime = document.querySelector('.info__time');
    const infoEstimate = document.querySelector('.info__estimate');
    const currentTask = document.querySelector('.current__task');
    const clearFinishedTasks = document.querySelector('.clear__finished-tasks');
    const tasksOptionsWrapper = document.querySelector('.tasks__options-wrapper');
    const taskOptions = document.querySelector('.tasks__options');
    const addTaskAndSave = document.querySelector('.add__save');
    const clearAllTasksButton = document.querySelector('.clear__all-tasks');
    const clearCompletedTasksButton = document.querySelector('.clear__act-pomodoros');
    const cancelAddingTaskButton = document.querySelector('.add__cancel');
    const allTasks = [];
    const allEstimatedPomodoros = [];
    let numberOfTasks = 1;
    let completedTasksInTotal = 0;
    
  

    const saveLocalStorageOfToDoList = ()=>{
        localStorage.setItem('estimatedPomodoros', allEstimatedPomodoros);
    }
    const loadLocalStorageOfToDoList = ()=>{
  
    }
    loadLocalStorageOfToDoList();

// DODAJ ZADANIE PO NACIŚNIĘCIU DODAJ ZADANIE
addButton.addEventListener('click', ()=>{
    addButton.classList.add('button__wrapper--none');
    addSurvey.classList.remove('add__wrapper--none'); })
    
// ANULUJ DODAWANIE ZADANIA 
    cancelAddingTaskButton.addEventListener('click', ()=>{
        addButton.classList.remove('button__wrapper--none');
        addSurvey.classList.add('add__wrapper--none');
        addWhatText.value = "";
        addInputTasks.value = 1;
        noteInput.value = "";
    })
// DODAWANIE I ODEJMOWANIE LICZBY (ILE ZAJMIE ZADANIE )
    addInputTasks.value= numberOfTasks;
    addArrowUp.addEventListener('mousedown', ()=>{
        addArrowUp.classList.add('add__arrow--none'); })
    addArrowUp.addEventListener('mouseup', ()=>{
        addArrowUp.classList.remove('add__arrow--none');
        if(numberOfTasks >= 30) return
        numberOfTasks++;
        addInputTasks.value= numberOfTasks; })
    addArrowDown.addEventListener('mousedown', ()=>{
        addArrowDown.classList.add('add__arrow--none'); })
    addArrowDown.addEventListener('mouseup', ()=>{
        addArrowDown.classList.remove('add__arrow--none');
        if(numberOfTasks === 0) return
        numberOfTasks--;
        addInputTasks.value= numberOfTasks; }) 
// FUNCTION SHOWING SECTION INFO
    const showSectionInfo = ()=>{
        if(ulList.innerHTML != ""){
            document.querySelector('.info').classList.remove('info--active');

        }
        else{
            document.querySelector('.info').classList.add('info--active')
        }
    }
// USUNIĘCIE WSZYSTKICH ZADAN
    const removeAllTasks = ()=> {
        allTasks.splice(0, allTasks.length)
        allEstimatedPomodoros.splice(0, allEstimatedPomodoros.length)
        ulList.innerHTML = "";
        infoComplete.textContent = 0;
        infoEstimate.textContent = 0;
        currentTask.textContent = "";
        renderLiList();
        calculatingEstimatedTimeToFinish();
    }
    clearAllTasksButton.addEventListener('click', removeAllTasks)
// FUNKCJA WYŚWIETLAJĄCA ILOŚĆ UKOŃCZONYCH ZADAN
// TWORZONY JEST TU NOWY DATASET KTÓRY NA STARCIE ZAWSZE JEST 0, WRAZ Z UKOŃCZENIEM ZADANIA, ZWIĘKSZA SIĘ 
    const addingCompletedTasks = ()=>{
        const liList = [...document.querySelectorAll('.all__item')];
        const checkedItem = liList.findIndex(task => {
            const checkedTask = task.classList.contains('all__item--active')
            if(task.classList.contains('all__item--active')){
            task.dataset.completedTask = Number(task.dataset.completedTask) + 1 
               task.querySelector('.all__number-of-tasks-done').textContent =  task.dataset.completedTask;
            }   
        })
    }
// FUNKCJA ZERUJĄCA NUMER WYŚWIETLANY JAKO ILOŚĆ UKOŃCZONYCH ZADAN
    const resetingCompletedTasks = ()=>{
        const liList = [...document.querySelectorAll('.all__item')];
        liList.forEach(task=>{
            task.dataset.completedTask = 0;
            task.querySelector('.all__number-of-tasks-done').textContent = "0";   
        })
        infoComplete.textContent = "0";
    }
    clearCompletedTasksButton.addEventListener('click', resetingCompletedTasks)
// FUNKCJA POKAZUJĄCA ILE ZADAŃ (i ICH długość (KAŻDE ZADANIE MA INNĄ)) ZOSTAŁO DO KOŃCA
    const setEstimateTime = ()=>{
        let sum = 0;
        for(let i = 0; i < allEstimatedPomodoros.length; i++){sum = sum + allEstimatedPomodoros[i]}
        infoEstimate.textContent = String(sum);  
    }
// FUNKCJA WYŚWIETLAJĄCA ILOŚĆ UKOŃCZONYCH ZADAŃ
    const calculateFinishedTasks = ()=>{
        let sum = 0;
        const tasksDone = [...document.querySelectorAll('.all__number-of-tasks-done')];
        tasksDone.forEach(task => sum = sum +  Number(task.textContent))
        infoComplete.textContent = String(sum);  
    }
// ODŚWIEŻENIE LISTY UL
    const renderLiList = ()=>{
        ulList.innerHTML = "";
        allTasks.forEach((allItem, key)=> {
            allItem.dataset.key = key;
            allItem.dataset.completedTask = 0;
            ulList.appendChild(allItem)
        })
        calculateFinishedTasks();
        setEstimateTime();
        calculatingEstimatedTimeToFinish();
        showSectionInfo();
    }
// USUWANIE POJEDYNCZEGO ZADANIA 
    const deleteSingleTask = (e)=>{
        const index = e.target.closest(".all__item").dataset.key;
        allTasks.splice(index, 1);
        allEstimatedPomodoros.splice(index, 1);
        renderLiList();  
    }
// TWORZENIE NOWEGO LI PO NACIŚNIĘCIU 'DODAJ ZADANIE'
    const createNewLi = (e)=>{
        const liText = addWhatText.value;
        if(liText ==="")return;
        const liItem = document.createElement('li');
        liItem.className = "all__item";
        liItem.innerHTML = `
            <div class="all__wrapper-one">
                <i class="fas fa-check-circle all__icon"></i>
                <p class="all__text">${liText}</p>
            </div> 
            <div class="all__wrapper-two">
                <div class="all__number-of-tasks">
                    <span class="all__number-of-tasks-done">0</span> /
                    <span class="all__number-of-tasks-to-do">${addInputTasks.value}</span>
                </div>
                <div class="all__options">
                    <div class="all__edit"><i class="far fa-edit"></i> </div>
                    <div class="all__delete"><i class="fas fa-trash"></i></div>
                </div>
            </div>
            <div class="all__wrapper-three ">
            <p class="all__note">
                ${noteInput.value}
            </p>
        </div>`;
        allTasks.push(liItem);
        allEstimatedPomodoros.push(Number(addInputTasks.value))
        addWhatText.value ="";
        noteInput.value = "";
        renderLiList();
        liItem.querySelector(".all__delete").addEventListener('click', deleteSingleTask);
        liItem.querySelector(".all__edit").addEventListener('click', editSingleTask);
    } 
// FUNKCJA POKAZUJĄCA NOTATKĘ (OPCJONALNĄ)
    const showNoteOnTask = ()=>{
        const liList = [...document.querySelectorAll('.all__item')];
        liList.forEach((task, index)=>{
            if(task.querySelector('.all__note').textContent == false){
                task.querySelector('.all__wrapper-three').classList.add('all__wrapper-three--active');
            } 
        })
    }
// MOZLIWOŚĆ ZAZNACZANIA CHECKMARKA W KAZDYM ZADANIU  
    const checkCheckMark = ()=>{
        let flag = false;
        const checkIcon = [...document.querySelectorAll('.all__icon')];
        const liTasks = [...document.querySelectorAll('.all__item')];
        const allText = [...document.querySelectorAll('.all__text')];
        checkIcon.forEach((icon,index)=>{
            icon.addEventListener('click', ()=>{
                if(!flag){
                    flag = !flag;
                    allText[index].classList.add('all__text--active')
                    icon.classList.add('all__icon--active');
                    liTasks[index].classList.add('all__item--checked')
                }
                else{
                    flag = !flag;
                    allText[index].classList.remove('all__text--active')
                    icon.classList.remove('all__icon--active');
                    liTasks[index].classList.remove('all__item--checked')
                } 
            })
        })
    }
// FUNKCJA USUWAJĄCA BORDER Z ZADANIA, BĘDZIE WYORZYSTANA W FUNKCJI givingBorderToFirstTask
    const removeBorderLiItem = ()=>{
        [...document.querySelectorAll('.all__item')].forEach(liItem =>{
            liItem.classList.remove('all__item--active');
        })
    }
//FUNKCJA DAJĄCA BORDER PIERWSZEMU TASKOWI, ORAZ NADAJE NAZWĘ TASKA DO BIEŻĄCEGO TASKA(CURRENT__TASK)
    const givingBorderToFirstTask = ()=>{
        const liFirstItem = document.querySelector('.all__item');
        if(ulList.innerHTML !== ""){
        // Nadanie Pierwszemu li borderu, drugiemu już nie nadaje borderu
            liFirstItem.classList.add('all__item--active'); 
        // Nazwanie current__task nazwą pierwszego li
            currentTask.textContent =  liFirstItem.querySelector('.all__text').textContent;
        }
        
        let liListFlag = false;
        [...document.querySelectorAll('.all__item')].forEach(liItem =>{
            liItem.addEventListener('click', ()=>{
                removeBorderLiItem();
                liItem.classList.add('all__item--active');
                currentTask.textContent = liItem.querySelector('.all__text').textContent;
            })
        })
    }
// USUWANIE LI TYLKO Z ZAZNACZONYM CHECKMARKIEM POPRZEZ OPCJĘ USUN ZAznaczone 
    const deletingCheckedTasks = ()=>{
        [...document.querySelectorAll('.all__item')].forEach((task, index) => {
                if( task.classList.contains('all__item--checked') == true){
                    const index = task.dataset.key;
                    allTasks.splice(index, 1);
                    allEstimatedPomodoros.splice(index, 1);
                    renderLiList();
                    if(ulList.innerHTML == ""){
                        currentTask.textContent = "";
                    }
                }
               givingBorderToFirstTask(); 
        })}
        clearFinishedTasks.addEventListener('click', deletingCheckedTasks)
//FUNKCJA ROZWIJAJĄCA MENU DOTYCZĄCA WSZYSTKICH ZADAŃ
    let taskMenuFlag = false; 
    const allOptionsWithTasks = ()=>{
            if(!taskMenuFlag){
                taskMenuFlag = !taskMenuFlag
                tasksOptionsWrapper.classList.remove("tasks__options-wrapper--none");
            }
            else{
                taskMenuFlag = !taskMenuFlag
                tasksOptionsWrapper.classList.add("tasks__options-wrapper--none");
            } 
    }
    taskOptions.addEventListener('click', allOptionsWithTasks)
//FUNKCJA OBLICZAJĄCA KIEDY ZAKOŃCZYMY WSZYSTKIE ZADANIA
    const calculatingEstimatedTimeToFinish = ()=>{  
        let pomodoroMinValue = document.querySelector(".settings__time-of-clock-input--pomodoro").value;
        let shortMinValue = document.querySelector(".settings__time-of-clock-input--short").value
        let tasksLeft = infoEstimate.textContent - infoComplete.textContent;
        let timeOfWork = tasksLeft * pomodoroMinValue;
        let timeOfBreak = tasksLeft * shortMinValue;
        let timeOfEnding = (timeOfWork + timeOfBreak) * 60 * 1000;
        let oldDate = new Date().getTime();
        let newDateInMilisec = oldDate + timeOfEnding;
        let hours = Math.floor(newDateInMilisec / (1000 * 60 * 60) +2) % 24 ;
        let minutes = Math.floor(newDateInMilisec / (1000 * 60) ) % 60;
        infoTime.textContent = ` ${hours > 10 ? hours : "0" + hours } : ${minutes > 10 ? minutes : "0" + minutes } `;
    }
//FUNKCJA EDYTUJĄCA POJEDYNCZE ZADANIE
    const editSingleTask = (e)=>{
        const liList = [...document.querySelectorAll('.all__item')];
        const liEdit = [...document.querySelectorAll('.all__edit')];
        addSurvey.classList.remove('add__wrapper--none')
        deleteSingleTask(e);
        liEdit.forEach((edit, index) => {
            addWhatText.value = liList[index].querySelector('.all__text').textContent;
            addInputTasks.value = liList[index].querySelector('.all__number-of-tasks-to-do').textContent;
            noteInput.value = liList[index].querySelector('.all__note').textContent.trim();
        })
    }
 
    const addTaskToList = (e)=>{
        e.preventDefault();
        createNewLi(e);
        givingBorderToFirstTask();
        checkCheckMark();
        setEstimateTime();
        showNoteOnTask();
        calculateFinishedTasks();
        saveLocalStorageOfToDoList();
    }
    addTaskAndSave.addEventListener('click', addTaskToList);
// SETTINGS
// FUNCKJA OTIWERAJĄCA MENU USTAWIEŃ
    const settings = document.querySelector('.settings');
    const navIconSettings = document.querySelector('.nav__item-settings');
    const closeSettings = document.querySelector('.settings__escape-image')
    const okSettingsButton = document.querySelector('.settings__accept-button')
    navIconSettings.addEventListener('click', ()=>{
        settings.classList.add('settings--active');
    })
    closeSettings.addEventListener('click', ()=>{
        settings.classList.remove('settings--active');
    })
//FUNKCJA ZATWIERDZAJĄCA ZMIANY W SETTINGS
    const newSettingsFunction = ()=> {
        settings.classList.remove('settings--active');
        longBreakActivate = 0;
        pomodoroFunction();
        saveLocalStorageOfSettings();
        loadLocalStorageOfSettings();
    }
    okSettingsButton.addEventListener('click', newSettingsFunction)
// FUNKCJA ZAZNACZĄJĄCA BUTON I ZMIENIAJĄCA JEGO KOLOR PRZY AUTOMATYCZNYM ZACZYNANIU PRZERW I POMODORO
    const autoStartBreaksBtn = document.querySelector('.settings__auto-breaks-accept');
    const autoStartPomodoroBtn = document.querySelector('.settings__auto-pomodoro-accept');
    let flagOfChangeColorAutoStartBreak = false;
    autoStartBreaksBtn.addEventListener('click', ()=>{
        if(!flagOfChangeColorAutoStartBreak){
            autoStartBreaksBtn.classList.add('settings__auto-breaks-accept--active');
            flagOfChangeColorAutoStartBreak = !flagOfChangeColorAutoStartBreak;
        }
        else{
            autoStartBreaksBtn.classList.remove('settings__auto-breaks-accept--active');
            flagOfChangeColorAutoStartBreak = !flagOfChangeColorAutoStartBreak;
        }
    })
    let flagOfChangeColorAutoStartPomodoro = false;
    autoStartPomodoroBtn.addEventListener('click', ()=>{
        if(!flagOfChangeColorAutoStartPomodoro){
            autoStartPomodoroBtn.classList.add('settings__auto-pomodoro-accept--active');
            flagOfChangeColorAutoStartPomodoro = !flagOfChangeColorAutoStartPomodoro;
        }
        else{
            autoStartPomodoroBtn.classList.remove('settings__auto-pomodoro-accept--active');
            flagOfChangeColorAutoStartPomodoro = !flagOfChangeColorAutoStartPomodoro;
        }
    })

    

