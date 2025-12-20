import { StorageInterface, storageInstance } from './Storage';
interface ElementInterface {
    id:number,
    text: string,
    finished: boolean,
    description: string,
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
    protected elements: ElementInterface[] = [];
    constructor(private storage: StorageInterface ){
        
    }
    render(){}
    addElement(){
        this.elements.push({id: 0, text: "asd", finished: false, description:"",time:3})
    }
    editElement(id: number){}
    removeElement(id: number){}
    clearAllTasks(){}
    clearFinishedTasks(){}
    resetAllTasks(){}
}

export const liElementInstance = new Elements(storageInstance)