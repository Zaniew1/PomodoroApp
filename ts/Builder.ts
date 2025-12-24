type ElementType = "div" | "ul" | "li" | "span" | "p" | "button" | "i" | "section"
type DatasetsType = Record<string, string|number|boolean>

interface BuilderInterface {
    create(element: ElementType) : BuilderClass
    addClass(className:string):BuilderClass
    addId(id:string):BuilderClass
    addListener(listener:keyof HTMLElementEventMap, callback:EventListenerOrEventListenerObject):BuilderClass
    dataset(datasets: DatasetsType):BuilderClass
    append(child: HTMLElement):BuilderClass
    end():HTMLElement
}

//// "div" | "ul" | "li" | "span" | "p" | "button" ///////
// Builder pattern
export class BuilderClass implements BuilderInterface{
    private element: HTMLElement | null = null;
    constructor(){}
    create(element:ElementType){
        this.element = null;
        this.element = document.createElement(element);
        return this;
    }
    addClass(className:string){
        if(!this.element){throw new Error("No element, start with create method")}
        this.element.classList.add(className)
        return this;
    }
    addId(id:string){
        if(!this.element){throw new Error("No element, start with create method")}
        this.element.id = id;
        return this;
    }
    addListener(listener:keyof HTMLElementEventMap, callback:EventListenerOrEventListenerObject){
        if(!this.element){throw new Error("No element, start with create method")}
        this.element.addEventListener(listener, callback);
        return this;
    }
    content(text: string){
        if(!this.element){throw new Error("No element, start with create method")}
        this.element.textContent = text;
        return this;
    }
    dataset(datasets: DatasetsType ){
        if(!this.element){throw new Error("No element, start with create method")}
        for (const [key, value] of Object.entries(datasets)) {
            this.element.dataset[key] = String(value)
        }
        return this;
    }
    append(child: HTMLElement){
        if(!this.element){throw new Error("No element, start with create method")}
        this.element?.appendChild(child);
        return this
    }
    end(){
        if(!this.element){throw new Error("No element, start with create method")}
        const element = this.element;
        this.element = null;
        return element;
    }

}







///// INPUTS /////
interface InputBuilderInterface{
    create(): InputBuilderClass
    addClass(className:string): InputBuilderClass
    addId(id:string): InputBuilderClass
    addListener(listener:keyof HTMLElementEventMap, callback:EventListenerOrEventListenerObject): InputBuilderClass
    addValue(value: string): InputBuilderClass
    addType(type: "text" | "number"): InputBuilderClass
    addPlaceholder(placeholder:string): InputBuilderClass
    addName(name: string): InputBuilderClass
}
// Builder pattern
export class InputBuilderClass implements InputBuilderInterface{
    private input : HTMLInputElement | null = null
    constructor(){}
    create(){
        this.input = null;
        this.input = document.createElement("input");
        return this;
    }
    addClass(className:string){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.classList.add(className)
        return this;
    }
    addId(id:string){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.id = id;
        return this;
    }
    addListener(listener:keyof HTMLElementEventMap, callback:EventListenerOrEventListenerObject){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.addEventListener(listener, callback);
        return this;
    }
    addValue(value: string){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.value = value;
        return this;
    }
    addType(type: "text" | "number"){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.type = type;
        return this;
    }
    addPlaceholder(placeholder:string){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.placeholder = placeholder;
        return this;
    }
    addName(name: string){
        if(!this.input){throw new Error("No input, start with create method")}
        this.input.name = name;
        return this;
    }
    end(){
        if(!this.input){throw new Error("No input, start with create method")}
        const input = this.input;
        this.input = null;
        return input;
    }
}