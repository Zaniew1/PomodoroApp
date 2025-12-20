export class Timer{
    protected minutesSpan = document.querySelector('.clock__minutes');
    protected secondsSpan = document.querySelector('.clock__seconds');
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
    set newColor(color: string)

}
export class Work implements Clocks{
    protected minutes: number = 25;
    protected color: string = "red";
    constructor(){}
    setTime(){}
    startClock(){}
    stopClock(){}
    resetClock(){}
    set newColor(color:string){
        this.color = color;
    }
}
class ShortBreak{}
class LongBreak{}
