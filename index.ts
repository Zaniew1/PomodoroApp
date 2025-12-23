import { settingsInstance } from './ts/Settings';
import { liTaskInstance } from './ts/Tasks';
import { soundInstance } from './ts/Sounds';
import { storageInstance } from './ts/Storage';
import { Timer, Work } from './ts/Timer';





document.addEventListener('DOMContentLoaded', ()=>{
    const workInstance = new Work();
    const TimerInstance = new Timer(workInstance);
})