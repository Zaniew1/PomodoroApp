import { TaskInterface } from "./Tasks"
import { SettingsType, SubscriberInterface } from "./Settings"

export interface StorageInterface{
    getSettingsData(): SettingsType
    saveSettingsData(settings :SettingsType): void
    getTasksData(): TaskInterface[] | []
    saveTasksData(tasks: TaskInterface[]): void
    getUserData(): any
    saveUserData(): void
}
export class StorageClass implements StorageInterface, SubscriberInterface{
    private settings: SettingsType | null = null;
    constructor(protected storageInstace: StorageInterface){
        this.settings = this.getSettingsData()
    }
    update(settings: SettingsType){
        this.settings = settings;
    }
    getSettingsData(){
        return this.storageInstace.getSettingsData();
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
        return this.storageInstace.getUserData();
    }
    saveUserData(){
        this.storageInstace.saveUserData();
    }
  
}
export class LocalStorage implements StorageInterface{
    constructor(){}
    getSettingsData(){
       return { workTime: 25,
                shortBreakTime: 5,
                longBreakTime: 15,
                autoBreak: false,
                autoWork: false,
                longBreakInterval: 4,
                darkMode: false,
                alarmSound: "Alarm.wav",
                alarmVolume: 25,
                tickingSound: "slowTicking.mp3",
                tickingVolume: 25
             }
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
        localStorage.setItem('tasks', JSON.stringify(task));

    }
    getUserData(){
    }
    saveUserData(){
    }

}
