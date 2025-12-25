import { BuilderClass, BuilderInterface, InputBuilderClass, InputBuilderInterface } from './Builder';
import { Settings, SettingsInterface, SubscriberInterface } from './Settings';
import { LocalStorage, StorageClass } from './Storage';
import { Tasks, TasksClassInterface } from './Tasks';
import { Clocks, Timer, Work } from './Timer';


// Facade pattern
export class Facade{
    private storageInstance : StorageClass | null = null
    private settingsInstance : SettingsInterface | null = null
    private workInstance : Clocks&SubscriberInterface | null = null
    private timerInstance : Clocks&SubscriberInterface | null = null
    private tasksInstance : TasksClassInterface&SubscriberInterface | null = null
    private builderInstance : BuilderInterface | null = null
    private inputBuilderInstance : InputBuilderInterface | null = null
    constructor(){

    }
    init(){
        const localStorageInstance = new LocalStorage();
        this.storageInstance = new StorageClass(localStorageInstance);
        this.settingsInstance = new Settings(this.storageInstance);
        this.workInstance = new Work();
        this.timerInstance = new Timer(this.workInstance);
        this.tasksInstance = new Tasks(this.storageInstance);

        this.settingsInstance.addSubscriber(this.timerInstance);
        this.settingsInstance.addSubscriber(this.tasksInstance);
        this.settingsInstance.addSubscriber(this.storageInstance);
        this.settingsInstance.notifySubscribers();

        this.builderInstance = new BuilderClass();
        this.inputBuilderInstance = new InputBuilderClass();
    
    }
    buildSettings(){}
    buildTimers(){}
    buildTasks(){}
    buildTasksEstimate(){}
    buildNavigation(){}
}