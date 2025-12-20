import { settingsInstance } from './ts/Settings';
import { liElementInstance } from './ts/Elements';
import { soundInstance } from './ts/Sounds';
import { storageInstance } from './ts/Storage';
import { Timer, Work } from './ts/Timer';





document.addEventListener('DOMContentLoaded', ()=>{
    const workInstance = new Work();
    const TimerInstance = new Timer(workInstance);
})