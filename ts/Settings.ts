
export type SettingsType = {
    workTime: number,
    shortBreakTime: number,
    longBreakTime: number,
    autoBreak: boolean,
    autoWork: boolean,
    longBreakInterval: number,
    darkMode: boolean

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
    private workTime: number = 25 ;
    private shortBreakTime: number = 5 ;
    private longBreakTime: number = 10 ;
    private autoBreak: boolean = false ;
    private autoWork: boolean = false ; 
    private longBreakInterval: number = 4 ; 
    private darkMode: boolean = false;
    constructor(
       
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

export const settingsInstance = new Settings();