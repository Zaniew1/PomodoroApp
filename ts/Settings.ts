import { StorageInterface } from "./Storage"
export type TimerSettingsType = {
    workTime: number,
    shortBreakTime: number,
    longBreakTime: number,
    autoBreak: boolean,
    autoWork: boolean,
    longBreakInterval: number,
    darkMode: boolean,
}
export type  SoundsSettingsType = {
     alarmSound: string,
    alarmVolume: number,
    tickingSound: string,
    tickingVolume: number
}
export type SettingsType = TimerSettingsType & SoundsSettingsType

export interface PublisherInterface{
    addSubscriber(classInstance: SubscriberInterface): void
    removeSubscriber(classInstance: SubscriberInterface): void
    notifySubscribers(): void

}
export interface SubscriberInterface{
    update(settings: SettingsType):void
}
export interface TimerSettingsInterface{
    set WorkTime(workTime: number )
    get WorkTime() : number
    set ShortBreakTime(shortBreak: number )
    get ShortBreakTime() : number
    set LongBreakTime(longBreak: number )
    get LongBreakTime() : number
    set AutoBreak(autoBreak: boolean )
    get AutoBreak() : boolean
    set AutoWork(autoWork: boolean)
    get AutoWork() : boolean
    set LongBreakInterval( interval: number)
    get LongBreakInterval() : number
    set DarkMode(darkMode: boolean)
    get DarkMode() : boolean
}
interface SoundsSettingsInterface{
    set AlarmSound(alarmSound: string )
    get AlarmSound() : string
    set AlarmVolume(alarmVolume: number)
    get AlarmVolume() : number
    set TickingSound( tickingSound: string)
    get TickingSound() : string
    set TickingVolume(tickingVolume: number)
    get TickingVolume() : number
}
// Observer pattern
export class Settings implements TimerSettingsInterface,SoundsSettingsInterface,PublisherInterface{
    private settings: SettingsType = {
        workTime : 25,
        shortBreakTime : 5,
        longBreakTime : 10,
        autoBreak : false,
        autoWork : false,
        longBreakInterval : 4,
        darkMode : false,
        alarmSound: "Alarm.wav",
        alarmVolume: 25,
        tickingSound: "slowTicking.mp3",
        tickingVolume: 25
    }
    private Subscribers: SubscriberInterface[] = [];

    constructor(private storage: StorageInterface){
        this.settings = this.storage.getSettingsData();
    }
    addSubscriber(classInstance: SubscriberInterface){
        this.Subscribers.push(classInstance);
    }
    removeSubscriber(classInstance: SubscriberInterface){
        const indexToDelete = this.Subscribers.findIndex(el=> el === classInstance);
        this.Subscribers.splice(indexToDelete, 1 );
    }
    notifySubscribers(){
        if(this.Subscribers.length > 0){
            this.Subscribers.forEach(instance=>{
                instance.update(this.settings);
            })
        }
    }
    set WorkTime(workTime: number ) {
        if(workTime > 100 || workTime < 10) throw new Error("Czas trwania pracy powinien mieć min 10 i max 100 min")
        this.settings.workTime = workTime;
    }
    get WorkTime(){
        return this.settings.workTime;
    }
    set ShortBreakTime(shortBreakTime: number ) {
        if(shortBreakTime > 30 || shortBreakTime < 0) throw new Error("Krótka przerwa powinna mieć min 1 i max 30 min")
        this.settings.shortBreakTime = shortBreakTime;
        this.notifySubscribers();
    }
    get ShortBreakTime(){
        return this.settings.shortBreakTime;
    }
    set LongBreakTime(longBreakTime: number ) {
        if(longBreakTime > 60 || longBreakTime < 10) throw new Error("Długa przerwa powinna mieć min 10 i max 60 min")
        this.settings.longBreakTime = longBreakTime;
        this.notifySubscribers();
    }
    get LongBreakTime(){
        return this.settings.longBreakTime;
    }
    set AutoBreak(autoBreak: boolean ) {
        this.settings.autoBreak = autoBreak;
        this.notifySubscribers();
    }
    get AutoBreak(){
        return this.settings.autoBreak;
    }
    set AutoWork(autoWork: boolean) {
        this.settings.autoWork = autoWork;
        this.notifySubscribers();
    }
    get AutoWork(){
        return  this.settings.autoWork;
    }
    set LongBreakInterval(interval: number) {
        if(interval > 20 || interval < 0) throw new Error("Długa przerwa powinna występować co kilka krótkich przerw (min 1, max 20)")
        this.settings.longBreakInterval = interval;
        this.notifySubscribers();
    }
    get LongBreakInterval(){
        return this.settings.longBreakInterval;
    }
    set DarkMode(darkMode: boolean) {
        this.settings.darkMode = darkMode;
        this.notifySubscribers();
    }
    get DarkMode(){return this.settings.darkMode;}
        set AlarmSound(alarmSound: string ){
        this.settings.alarmSound = alarmSound
    }
    get AlarmSound(){
        return this.settings.alarmSound;
    }
    set AlarmVolume(alarmVolume: number){
        if(alarmVolume > 100 || alarmVolume < 0) throw new Error("Głośność alarmu zakończenia powinna mieć od 0 do 100%");
        this.settings.alarmVolume = alarmVolume;
        this.notifySubscribers();
    }
    get AlarmVolume(){
        return this.settings.alarmVolume;
    }
    set TickingSound( tickingSound: string){
        this.settings.tickingSound = tickingSound;
        this.notifySubscribers();
    }
    get TickingSound(){
        return this.settings.tickingSound;
    }
    set TickingVolume(tickingVolume: number){
        if(tickingVolume > 100 || tickingVolume < 0) throw new Error("Głośność cykania zegara powinna mieć od 0 do 100%");
        this.settings.tickingVolume = tickingVolume;
        this.notifySubscribers();
    }
    get TickingVolume(){
        return this.settings.tickingVolume;
    }
}
