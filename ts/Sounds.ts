

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


class Sounds{
    private alarmSound: string = 'asd'; 
    private alarmVolume: number = 50; 
    private tickingSound: string = 'asd'; 
    private tickingVolume: number = 50;
    constructor(){}
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

export const soundInstance = new Sounds();