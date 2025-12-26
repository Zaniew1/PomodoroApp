import { BuilderClass, BuilderInterface, InputBuilderClass, InputBuilderInterface } from './Builder';
import { Settings, SettingsInterface, SubscriberInterface } from './Settings';
import { LocalStorage, StorageClass } from './Storage';
import { Tasks, TasksClassInterface } from './Tasks';
import { Clocks, Timer, Work } from './Timer';


// Facade pattern
export class Facade{
    private wrapper = document.querySelector('.wrapper')
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
        this.timerInstance = new Timer();
        this.tasksInstance = new Tasks(this.storageInstance);

        this.settingsInstance.addSubscriber(this.timerInstance);
        this.settingsInstance.addSubscriber(this.tasksInstance);
        this.settingsInstance.addSubscriber(this.storageInstance);
        this.settingsInstance.notifySubscribers();

        this.builderInstance = new BuilderClass();
        this.inputBuilderInstance = new InputBuilderClass();
        this.buildTimers();
    }
    buildSettings(){}
    buildTimers(){
        //   <section class="timer">
        //     <div class="clock__options">
        //         <button class="clock__button clock__button--active clock__one">Pomodoro</button>
        //         <button class="clock__button clock__two">Short Break</button>
        //         <button class="clock__button clock__three">Long Break</button>
        //     </div>
        //     <div class="clock"><span class="clock__minutes">25</span> : <span class="clock__seconds">00</span></div>
        //     <div class = "button__reset--wrapper">
        //         <button class="clock__start">Start</button>
        //         <div class="reset"><i class="fas fa-step-forward reset__icon"></i></div>
        //     </div>
        // </section>
        const builder = () => new BuilderClass();
        const section = builder().create('section')
            .addClass('timer')
            .append(
                builder().create('div')
                    .addClass('clock__options')
                    .append(builder().create('button').dataset([{key: "work"}]).addClass(['clock__button','clock__button--active', 'clock__one']).content('Pomodoro').addListener('click', (e)=>this.timerInstance?.setTime(e)).end())
                    .append(builder().create('button').dataset([{key: "short"}]).addClass(['clock__button','clock__button--active','clock__one']).content('Short Break').addListener('click', (e)=>this.timerInstance?.setTime(e)).end())
                    .append(builder().create('button').dataset([{key: "long"}]).addClass(['clock__button','clock__button--active', 'clock__one']).content('Long Break').addListener('click', (e)=>this.timerInstance?.setTime(e)).end())
                    .end())
            .append(
                builder().create('div').addClass('clock')
                .append(
                    builder().create('span').addClass('clock__minutes').content(String(this.settingsInstance?.WorkTime)).end()
                )
                .append(
                    builder().create('span').content(':').end()
                )
                .append(
                    builder().create('span').addClass('clock__seconds').content('00').end()
                )
                .end()
            )
            .append(
                builder().create('div').addClass('button__reset--wrapper')
                .append(
                    builder().create('button').addClass('clock__start').content('Start').addListener('click', ()=> this.timerInstance?.startClock()).end()
                )
                .append(
                    builder().create('div').addClass('reset').append(
                        builder().create('i').addClass(['fas', 'fa-step-forward','reset__icon']).end()
                        
                    ).end()
                )
                .end()
            )
            .end();
            this.wrapper?.appendChild(section);
    }
    buildTasks(){}
    buildTasksEstimate(){}
    buildNavigation(){}
}