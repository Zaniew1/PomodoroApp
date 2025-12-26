import { SettingsType, SubscriberInterface } from "./Settings";

export class Timer implements Clocks,SubscriberInterface{
    protected minutesSpan = document.querySelector('.clock__minutes');
    protected secondsSpan = document.querySelector('.clock__seconds');
    private settings: SettingsType | null = null;
    private timerInstance: Clocks = new Work();
    constructor(){
    }
    setTime(e:Event){
        const target = e.target as HTMLElement | null;

        if (target?.dataset?.key) {
           const type =  target.dataset.key;
           console.log(type)
           switch(type){
                case"work": 
                    this.timerInstance = new Work();
                    break;
                case"short": 
                    this.timerInstance = new ShortBreak();
                    break;
                case"long": 
                    this.timerInstance = new LongBreak();
                    break;
            }
            this.timerInstance.setTime(e);
        }
    }
    startClock(){
        console.log("start")
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
    }
}
export interface Clocks {
    setTime(e:Event) : void
    startClock() : void
    stopClock() : void
    resetClock() : void
}
export class Work implements Clocks{
    private interval: number = 0;
    constructor( ){}
    setTime(e:Event){
        console.log('work instance')
    }
    startClock(){}
    stopClock(){}
    resetClock(){}
    update(settings: SettingsType){
    }
    clear(){
        clearInterval(this.interval)
    }
}
class ShortBreak implements Clocks{
    constructor( ){}
    setTime(e:Event){
        console.log('short instance')

    }
    startClock(){}
    stopClock(){}
    resetClock(){}
}
class LongBreak implements Clocks{
    constructor( ){}
    setTime(e:Event){
        console.log('long instance')

    }
    startClock(){}
    stopClock(){}
    resetClock(){}
}
