class Timer{
    private minutesSpan = document.querySelector('.clock__minutes');
    private secondsSpan = document.querySelector('.clock__seconds');
    constructor(private timerInstance: Clocks){
    }
    start(){
        this.timerInstance.startClock()
    }
    stop(){
        this.timerInstance.stopClock()
    }
    reset(){
         this.timerInstance.resetClock()
    }
}
interface Clocks {
    setTime() : void
    startClock() : void
    stopClock() : void
    resetClock() : void
    changeColor() : void

}
class Work implements Clocks{
    constructor(private minutes: number, private color: string){}
    setTime(){}
    startClock(){}
    stopClock(){}
    resetClock(){}
    changeColor(){}

}
class ShortBreak{}
class LongBreak{}

interface SoundsInterface{
    set AlarmSound(alarmSound: string )
    get AlarmSound() : string
    set AlarmVolume(alarmVolume: number)
    get AlarmVolume() : number
    set TickingSound( tickingSound: string)
    get TickingSound() : string
    set TickingVolume(tickingVolume: number)
    get TickingVolume() : number
}

interface ElementInterface {
    id:number,
    text: string,
    finished: boolean,
    desciption: string,
    time: number,
  
}
interface ElementsClassInterface {
    render(): void
    addElement(): void
    editElement(id: number): void
    removeElement(id: number): void
    clearAllTasks(): void
    clearFinishedTasks(): void
    resetAllTasks(): void
}

class Elements implements ElementsClassInterface{
    constructor(private elements: ElementInterface[], private storage: StorageInterface ){}
    render(){}
    addElement(){}
    editElement(id: number){}
    removeElement(id: number){}
    clearAllTasks(){}
    clearFinishedTasks(){}
    resetAllTasks(){}
}


class Sounds{
    constructor(private alarmSound: string, private alarmVolume: number, private tickingSound: string, private tickingVolume: number){}
    set AlarmSound(alarmSound: string ){
        this.alarmSound = alarmSound
    }
    get AlarmSound(){
        return this.alarmSound;
    }
    set AlarmVolume(alarmVolume: number){
        this.alarmVolume = alarmVolume
    }
    get AlarmVolume(){
        return this.alarmVolume;
    }
    set TickingSound( tickingSound: string){
        this.tickingSound = tickingSound
    }
    get TickingSound(){
        return this.tickingSound;
    }
    set TickingVolume(tickingVolume: number){
        this.tickingVolume = tickingVolume
    }
    get TickingVolume(){
        return this.tickingVolume;
    }
}

interface SettingsInterface{
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
class Settings implements SettingsInterface{
    constructor(
        private workTime: number,
        private shortBreakTime: number,
        private longBreakTime: number,
        private autoBreak: boolean,
        private autoWork: boolean, 
        private longBreakInterval: number, 
        private darkMode: boolean
    ){}
    set WorkTime(workTime: number ) {
        this.workTime = workTime;
    }
    get WorkTime(){
        return this.workTime;
    }
    set ShortBreakTime(shortBreakTime: number ) {
        this.shortBreakTime = shortBreakTime;
    }
    get ShortBreakTime(){
        return this.shortBreakTime;
    }
    set LongBreakTime(longBreakTime: number ) {
        this.longBreakTime = longBreakTime;
    }
    get LongBreakTime(){
        return this.longBreakTime;
    }
    set AutoBreak(autoBreak: boolean ) {
        this.autoBreak = autoBreak;
    }
    get AutoBreak(){
        return this.autoBreak;
    }
    set AutoWork(autoWork: boolean) {
        this.autoWork = autoWork;
    }
    get AutoWork(){
        return  this.autoWork;
    }
    set LongBreakInterval(interval: number) {
        this.longBreakInterval = interval
    }
    get LongBreakInterval(){
        return this.longBreakInterval;
    }
    set DarkMode(darkMode: boolean) {
        this.darkMode = darkMode;
    }
    get DarkMode(){return this.darkMode;}
}



interface StorageInterface{
    getData(): any
    saveData() : void

}
class StorageClass implements StorageInterface{
    constructor(private storageInstace: StorageInterface){}
    getData(){
       return this.storageInstace.getData();
    }
    saveData(){
         this.storageInstace.saveData();
    }
}
class LocalStorage implements StorageInterface{
    constructor(){}
    getData(){
        return {
            settings: {
                workTime: 25,
                shortBreakTime: 5,
                longBreakTim: 15,
                autoBreak: false,
                autoWork: false,
                longBreakInterval: 4,
                darkMode: false,
            },
            li: [
                    {
                        id: 1,
                        text: "asd",
                        finished: true,
                        desciption: "13123123",
                        time: 5,
                        current:1
                    }
            ]
        }

    }
    saveData(){}

}
