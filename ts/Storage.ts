export interface StorageInterface{
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
const localStorageInstance = new LocalStorage();
export const storageInstance = new StorageClass(localStorageInstance)