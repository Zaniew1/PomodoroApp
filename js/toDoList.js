
                    // TO DO LIST
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
const removeCurrentTaskName = ()=>{
    if(document.querySelector('.all__list').innerHTML === ""){
        document.querySelector('.current__task').textContent = "";
    }
}
// ADD TASK FUNCTION
addButton.addEventListener('click', ()=>{
addButton.classList.add('button__wrapper--none');
addSurvey.classList.remove('add__wrapper--none');
addWhatText.focus();
 })
// CANCEL ADDING TASK FUNCTION
cancelAddingTaskButton.addEventListener('click', ()=>{
    addButton.classList.remove('button__wrapper--none');
    addSurvey.classList.add('add__wrapper--none');
    addWhatText.value = "";
    addInputTasks.value = 1;
    noteInput.value = "";
})
//  ADDING OR SUBTRACTING NUMBER (HOW LONG TASK WILL TAKE)
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
// REMOVE ALL TASK FUNCTION
const removeAllTasks = ()=> {
    allTasks.splice(0, allTasks.length)
    allEstimatedPomodoros.splice(0, allEstimatedPomodoros.length)
    ulList.innerHTML = "";
    infoComplete.textContent = 0;
    infoEstimate.textContent = 0;
    renderLiList();
    calculatingEstimatedTimeToFinish();
    removeCurrentTaskName();
}
clearAllTasksButton.addEventListener('click', removeAllTasks)
// SHOW NUMBER OF FINISHED TASKS FUNCTION
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
//  RESET NUMBER OF FINISHED TASKS 
const resetingCompletedTasks = ()=>{
    const liList = [...document.querySelectorAll('.all__item')];
    liList.forEach(task=>{
        task.dataset.completedTask = 0;
        task.querySelector('.all__number-of-tasks-done').textContent = "0";   
    })
    infoComplete.textContent = "0";
}
clearCompletedTasksButton.addEventListener('click', resetingCompletedTasks)
//  CALULATE ESTIMATED TIME TILL FINISH
const setEstimateTime = ()=>{
    let sum = 0;
    for(let i = 0; i < allEstimatedPomodoros.length; i++){sum = sum + allEstimatedPomodoros[i]}
    infoEstimate.textContent = String(sum);  
}
// SHOW HOW MANY FINISHED TASKS
const calculateFinishedTasks = ()=>{
    let sum = 0;
    const tasksDone = [...document.querySelectorAll('.all__number-of-tasks-done')];
    tasksDone.forEach(task => sum = sum +  Number(task.textContent))
    infoComplete.textContent = String(sum);  
}
// RENDER UL LIST
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
// DELETE SINGLE TASK
const deleteSingleTask = (e)=>{
    const index = e.target.closest(".all__item").dataset.key;
    allTasks.splice(index, 1);
    allEstimatedPomodoros.splice(index, 1);
    renderLiList();
}
// CREATE NEW LI AFTER PRESSING ADD TASK
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
// SHOW NOTE (OPTIONAL)
const showNoteOnTask = ()=>{
    const liList = [...document.querySelectorAll('.all__item')];
    liList.forEach((task, index)=>{
        if(task.querySelector('.all__note').textContent == false){
            task.querySelector('.all__wrapper-three').classList.add('all__wrapper-three--active');
        } 
    })
}
// POSIBILITY OF CHECKING CHECKMARK FUCNTION
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
// REMOVE BORDER FROM LI ITEM
const removeBorderLiItem = ()=>{
    [...document.querySelectorAll('.all__item')].forEach(liItem =>{
        liItem.classList.remove('all__item--active');
    })
}
//GIVE BORDER FOR FIRST LI ITEM, AND GIVE NAME TO CURRENT__TASK
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
    })
}
    clearFinishedTasks.addEventListener('click', deletingCheckedTasks)
//FUNKCJA ROZWIJAJĄCA MENU DOTYCZĄCA WSZYSTKICH ZADAŃ
const allOptionsWithTasks = (e)=>{
    e.stopPropagation();
    tasksOptionsWrapper.classList.toggle("tasks__options-wrapper--none");
}
taskOptions.addEventListener('click', allOptionsWithTasks)
window.onclick = function (){
    tasksOptionsWrapper.classList.add("tasks__options-wrapper--none");
}
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
    addWhatText.focus();
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
    document.querySelector('.blur').classList.add('blur--active')
})
closeSettings.addEventListener('click', ()=>{
    settings.classList.remove('settings--active');
    document.querySelector('.blur').classList.remove('blur--active')
})
//FUNKCJA ZATWIERDZAJĄCA ZMIANY W SETTINGS
const newSettingsFunction = ()=> {
    settings.classList.remove('settings--active');
    document.querySelector('.blur').classList.remove('blur--active')
    longBreakActivate = 0;
    pomodoroFunction();
    saveLocalStorageOfSettings();
    loadLocalStorageOfSettings();
}
okSettingsButton.addEventListener('click', newSettingsFunction)
// FUNKCJA ZAZNACZĄJĄCA BUTON I ZMIENIAJĄCA JEGO KOLOR PRZY AUTOMATYCZNYM ZACZYNANIU PRZERW I POMODORO
const autoStartBreaksBtn = document.querySelector('.settings__auto-breaks-accept');
const autoStartPomodoroBtn = document.querySelector('.settings__auto-pomodoro-accept');
autoStartBreaksBtn.addEventListener('click', ()=>{
    autoStartBreaksBtn.classList.toggle('settings__auto-breaks-accept--active');
})
autoStartPomodoroBtn.addEventListener('click', ()=>{
    autoStartPomodoroBtn.classList.toggle('settings__auto-pomodoro-accept--active');
})



