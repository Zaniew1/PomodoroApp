import { SettingsType, SubscriberInterface } from "./Settings";

export class Timer implements Clocks,SubscriberInterface{
    protected minutesSpan = document.querySelector('.clock__minutes');
    protected secondsSpan = document.querySelector('.clock__seconds');
    private settings: SettingsType | null = null;
    constructor(private timerInstance: Clocks){
    }
    setTime(){
    }
    startClock(){
        this.timerInstance.startClock()
    }
    stopClock(){
        this.timerInstance.stopClock()
    }
    resetClock(){
         this.timerInstance.resetClock()
    }
    update(settings: SettingsType){
        this.settings = settings;
        console.log(this.settings)
    }
}
export interface Clocks {
    setTime() : void
    startClock() : void
    stopClock() : void
    resetClock() : void
}
export class Work implements Clocks{
    private interval: number = 0;
    constructor( ){}
    setTime(){}
    startClock(){}
    stopClock(){}
    resetClock(){}
    update(settings: SettingsType){
        console.log(settings)
    }
    clear(){
        clearInterval(this.interval)
    }
}
class ShortBreak implements Clocks{
    constructor( ){}
    setTime(){}
    startClock(){}
    stopClock(){}
    resetClock(){}
}
class LongBreak implements Clocks{
    constructor( ){}
    setTime(){}
    startClock(){}
    stopClock(){}
    resetClock(){}
}
