import { SettingsType, SubscriberInterface } from './Settings';
import { StorageInterface } from './Storage';
type TasksIdInterface = {
    id: number
}
type AddTaskInterface = {
    text: string,
    finished: boolean,
    description?: string,
    time: number,
    order:number,
    currentWorkTime: number
}
export type TaskInterface = TasksIdInterface & AddTaskInterface;
type EditTaskInterface = {
    id?:number,
    text?: string,
    finished?: boolean,
    description?: string,
    time?: number,
    order?:number,
    currentWorkTime?: number
}
interface TasksClassInterface {
    renderTask(): void
    addTask(properties: AddTaskInterface) : void
    editTask(id: number, properties: EditTaskInterface) : void
    deleteTask(id: number) : void
    getNewId() : number
    clearAllTasks() : void
    clearFinishedTasks() : void
    resetAllTasks() : void
    refresh() : void
    highlightTask(id: number) : void
    highlightTasksName(id: number) : void
    dragTask(target: EventTarget) : void
    calculateTasksEstimatedTime() : Date
    showTasksEstimatedTime() : void
    showNumberOfTasksToDoInTotal(): number
    showNumberOfTasksCompletedInTotal() : number
}

export class Tasks implements TasksClassInterface, SubscriberInterface{
    private ESTIMATED_TASK_TIME = 30;
    protected tasks: TaskInterface[] = [];
    private settings: SettingsType | null = null;
    constructor(private storage: StorageInterface,){
        
    }
    update(settings: SettingsType){
        this.settings = settings;
    }
    renderTask(){

    }
    addTask(properties: AddTaskInterface ){
        const newId = this.getNewId()
        this.tasks.push({id:newId, ...properties})
        this.tasks.push({id: 0, order: 0, text: "asd", finished: false, description:"",time:3, currentWorkTime: 1})
        this.refresh();
    }
    refresh(){
        this.saveToDatabase();
    }
    saveToDatabase(){
        this.storage.saveTasksData(this.tasks);
    }
    editTask(id: number, properties: EditTaskInterface){

    }
    getNewId(){
        let highestId = 0;
        if(this.tasks.length === 0) return highestId;
        this.tasks.forEach(el=> el.id > highestId ? highestId = el.id : "");
        return highestId +1;
    }
    deleteTask(id: number){
        const indexToDelete = this.tasks.findIndex(el=> el.id === id);
        this.tasks.splice(indexToDelete, 1 );
        this.refresh();
    }
    clearAllTasks(){
        this.tasks = [];
        this.refresh();
    }
    clearFinishedTasks(){
        this.tasks.filter(el=> el.finished === false);
        this.refresh();
    }
    resetAllTasks(){
        this.tasks.forEach(el=> el.currentWorkTime = 0);
        this.refresh();
    }
    highlightTask(id:number){
        
    }
    highlightTasksName(id:number){

    }
    dragTask(target: EventTarget){

    }
    calculateTasksEstimatedTime(){
        const newDate = new Date();
        const sumedTime = this.tasks.map(task => {
            return task.time - task.currentWorkTime
        }).reduce((acc, curr)=> acc+curr, 0);
        if(sumedTime === 0){return newDate;}
        const estimatedTimeInMinutes = sumedTime * this.ESTIMATED_TASK_TIME;
        newDate.setMinutes(newDate.getMinutes() + estimatedTimeInMinutes);
        return newDate;
       
    }
    showTasksEstimatedTime(){

    }
    showNumberOfTasksToDoInTotal(){
        return this.tasks.map(task => {
            return task.time
        }).reduce((acc, curr)=> acc+curr, 0);
    }
     showNumberOfTasksCompletedInTotal(){
        return this.tasks.map(task => {
            return task.currentWorkTime
        }).reduce((acc, curr)=> acc+curr, 0);
    }
    showTasksEditor(){}
    cancelTasksEditor(){}
    disableTasksEditorSaveButton(){}
    enableTasksEditorSaveButton(){}
    finishOneEstimatedTask(id: number){}
}