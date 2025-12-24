import { BuilderClass } from './ts/Builder';
import { Settings } from './ts/Settings';
import { LocalStorage, StorageClass } from './ts/Storage';
import { Tasks } from './ts/Tasks';
import { Timer, Work } from './ts/Timer';





document.addEventListener('DOMContentLoaded', ()=>{
    const localStorageInstance = new LocalStorage();
    const storageInstance = new StorageClass(localStorageInstance);
    const settingsInstance = new Settings(storageInstance);
    const workInstance = new Work();
    const timerInstance = new Timer(workInstance);
    const tasksInstance = new Tasks(storageInstance);

    settingsInstance.addSubscriber(timerInstance);
    settingsInstance.addSubscriber(tasksInstance);
    settingsInstance.addSubscriber(storageInstance);
    settingsInstance.notifySubscribers();

    const builderInstance = new BuilderClass();
    const divElement = builderInstance.create("div").addClass("kutas").addId("kutasID").addListener('click', ()=>console.log('asdad')).dataset({type: "work", id: 2}).end();
})