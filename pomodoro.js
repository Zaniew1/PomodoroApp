    const clockMin = document.querySelector('.clock__minutes');
    const clockSec = document.querySelector('.clock__seconds');
    const pomodoroButton = document.querySelector('.clock__one');
    const shortBreakButton = document.querySelector('.clock__two');
    const longBreakButton = document.querySelector('.clock__three');
    const startButton = document.querySelector('.clock__start');
    const taskText = document.querySelector('.task__text');
    const reset = document.querySelector('.reset');
    const timer = document.querySelector('.timer');
    let buttonActive = false;
    let timeOfPomodoroClock = 15;
    let timeOfShortBreakClock = 5;
    let timeOfLongBreakClock = 15;
    let clockSecondsPomodoros = 5;
    let clockMinutesPomodoros = 0;
    let clockMinutesShort = 0;
    let clockSecondsShort = 5;
    let clockMinutesLong = 0;
    let clockSecondsLong = 5;
    
    let idIntervalPomodoroClock; // ID iNTERWAŁU TIMERA
    let idIntervalShortClock; // ID iNTERWAŁU TIMERA
    let idIntervalLongClock; // ID iNTERWAŁU TIMERA

// FUNKCJA ZMIENIAJĄCA  KOLOR PRZYCISKÓW OPCJI POMODORO, KRÓTKA PRZERRWA, DŁUGA PRZERWA
    const removeColorFromClockButtons = function(){
        pomodoroButton.classList.remove('clock__button--active');
        shortBreakButton.classList.remove('clock__button--active');
        longBreakButton.classList.remove('clock__button--active');
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
// FUNKCJA TIMER POMODORO
    const pomodoroFunction = ()=>{
        clockSecondsPomodoros = 5;
        clockMinutesPomodoros = 0;
        clockSec.textContent = "00";
        clockMin.textContent = "25"
        clearAllIntervals();
        removeColorFromClockButtons();
        changeBgcColor();
        removeBgcOfTimer();
        removeColorFromStartButton();
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
        clockSecondsShort = 5;
        clockMinutesShort = 0;
        clockMin.textContent = "05"
        clockSec.textContent = "00";
        clearAllIntervals(); 
        removeColorFromClockButtons();
        changeBgcColor();
        removeBgcOfTimer();
        removeColorFromStartButton();
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
        clockSecondsLong = 5;
        clockMinutesLong = 0;
        clockSec.textContent = "00";
        clockMin.textContent = "15"
        clearAllIntervals();
        removeColorFromClockButtons();
        changeBgcColor(); 
        removeBgcOfTimer();
        removeColorFromStartButton();
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
        clockSecondsPomodoros--;
        if(clockSecondsPomodoros === 0){
            clockMinutesPomodoros--;
            clockSecondsPomodoros = 59;
            if(clockMinutesPomodoros === -1 ){
                alert('Czas się skończył, czas trochę odpocząć');  
                addingCompletedTasks();
                shortBreakFunction();
                calculateFinishedTasks();
                calculatingEstimatedTimeToFinish();
                clockMinutesPomodoros = 5;
                clockSecondsPomodoros = 0;
                     
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
                clockMinutesShort = 25;
                alert('Czas się skończył, czas trochę popracować')
                pomodoroFunction();
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
                clockMinutesLong = 25;
                alert('Czas się skończył, czas trochę popracować')
                pomodoroFunction();   
            }
        }
        addingZeroToTimerWhileBelowTen(clockSecondsLong, clockMinutesLong );            
    };
// FUNKCJA STARTUJĄCA TIMER
    const startButtonFunction = () =>{
        if(!buttonActive){
            buttonActive = true;
            reset.classList.add('reset--visible');
            startButton.textContent = "Stop"
            startTimerAfterStop();
        }
        else{
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
        let tasksLeft = infoEstimate.textContent - infoComplete.textContent;
        let timeOfWork = tasksLeft * timeOfPomodoroClock;
        let timeOfBreak = tasksLeft * timeOfShortBreakClock;
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

  //  LOCAL STORAGE
  const saveLocalStorage = ()=> {
    const numberOfTasksDone = infoComplete.textContent;
    localStorage.setItem('numberOfTasksDone', numberOfTasksDone)
    
  }
  

    const loadLocalStorage = ()=> {
        infoComplete.textContent = localStorage.getItem('numberOfTasksDone')
    }


        

    const addTaskToList = (e)=>{
        e.preventDefault();
        createNewLi(e);
        givingBorderToFirstTask();
        checkCheckMark();
        setEstimateTime();
        showNoteOnTask();
        calculateFinishedTasks();
        saveLocalStorage();
        loadLocalStorage();
    }
    addTaskAndSave.addEventListener('click', addTaskToList);
 