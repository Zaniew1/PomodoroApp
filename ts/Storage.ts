import { TaskInterface } from "./Tasks"
import { SettingsType } from "./Settings"

export interface StorageInterface{
    getSettingsData(): any
    saveSettingsData(settings :SettingsType): void
    getTasksData(): TaskInterface[] | []
    saveTasksData(tasks: TaskInterface[]): void
    getUserData(): any
    saveUserData(): void
}
class StorageClass implements StorageInterface{
    constructor(private storageInstace: StorageInterface){}
    getSettingsData(){
        this.storageInstace.getSettingsData();
    }
    saveSettingsData(settings :SettingsType){
        this.storageInstace.saveSettingsData(settings);
    }
    getTasksData(){
        return this.storageInstace.getTasksData();
    }
    saveTasksData(tasks: TaskInterface[]){
        this.storageInstace.saveTasksData(tasks);
    }
    getUserData(){
        this.storageInstace.getUserData();
    }
    saveUserData(){
        this.storageInstace.saveUserData();
    }
  
}
class LocalStorage implements StorageInterface{
    constructor(){}
    getSettingsData(){
       return { workTime: 25,
                shortBreakTime: 5,
                longBreakTim: 15,
                autoBreak: false,
                autoWork: false,
                longBreakInterval: 4,
                darkMode: false}
    }
    saveSettingsData(settings: SettingsType ){
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    getTasksData(){

        return [
                    {
                        id: 0,
                        text: "123123",
                        finished: false,
                        description: "asdasd",
                        time: 5,
                        order:0,
                        currentWorkTime: 2
                    }
                ]
    }
    saveTasksData(task: TaskInterface[] ){
        localStorage.setItem('task', JSON.stringify(task));

    }
    getUserData(){
    }
    saveUserData(){
    }

}
const localStorageInstance = new LocalStorage();
export const storageInstance = new StorageClass(localStorageInstance)