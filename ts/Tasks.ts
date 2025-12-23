import { StorageInterface, storageInstance } from './Storage';
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
    render(): void
    addTask(properties: AddTaskInterface) : void
    editTask(id: number, properties: EditTaskInterface) : void
    removeTask(id: number) : void
    getNewId() : number
    clearAllTasks() : void
    clearFinishedTasks() : void
    resetAllTasks() : void
    refresh() : void
    highlightTask(id: number) : void
}

class Tasks implements TasksClassInterface{
    protected tasks: TaskInterface[] = [];
    constructor(private storage: StorageInterface ){
        
    }
    render(){

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
        this.storage.saveTasksData(this.tasks)
    }
    editTask(id: number, properties: EditTaskInterface){

    }
    getNewId(){
        let highestId = 0;
        if(this.tasks.length === 0) return highestId;
        this.tasks.forEach(el=> el.id > highestId ? highestId = el.id : "");
        return highestId +1;
    }
    removeTask(id: number){
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
}

export const liTaskInstance = new Tasks(storageInstance)