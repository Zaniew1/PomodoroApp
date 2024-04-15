export class Tasks {
  constructor(
    protected addButton: HTMLDivElement,
    protected taskOptions: HTMLDivElement,
    protected addSurvey: HTMLDivElement,
    protected addWhatText: HTMLInputElement,
    protected estimatedPomodorosInput: HTMLInputElement,
    protected addWhatDescription: HTMLTextAreaElement,
    protected tasksList: HTMLElement,
    protected saveTaskButton: HTMLElement
  ) {}
  public showSurvey() {
    this.setEstimatedPomodorosDefaultValue(1);
    this.addButton.classList.add("button__wrapper--none");
    this.addSurvey.classList.remove("add__wrapper--none");
    this.addWhatText.focus();
  }
  public toggleOptions() {
    this.taskOptions.querySelector(".tasks__options-wrapper")?.classList.toggle("tasks__options-wrapper--none");
  }
  public hideSurvey() {
    this.addButton.classList.remove("button__wrapper--none");
    this.addSurvey.classList.add("add__wrapper--none");
  }
  public incrementEstimatedPomodoros() {
    if (this.estimatedPomodorosInput.value === "50") return;
    this.estimatedPomodorosInput.value = String(Number(this.estimatedPomodorosInput.value) + 1);
  }
  public decrementEstimatedPomodoros() {
    if (this.estimatedPomodorosInput.value === "1") return;
    this.estimatedPomodorosInput.value = String(Number(this.estimatedPomodorosInput.value) - 1);
  }
  public saveNewTask() {
    this.estimatedPomodorosInput;
    this.addWhatDescription;
    this.createNewTask(
      this.validateAddedText(this.addWhatText.value),
      String(this.validateAddedEstimatedPomodoros(+this.estimatedPomodorosInput.value)),
      this.validateAddedDescription(this.addWhatDescription.value)
    );
    this.setAddWhatInputsToDefault();
  }
  public deleteTask(event: Event) {
    console.log(event.target);
    var liElement = (event.target as HTMLElement).closest(".all__item");
    var ulElement = liElement?.parentElement;
    ulElement && liElement ? ulElement.removeChild(liElement) : "";
  }
  public highlightSaveTaskButton() {
    console.log(this.addWhatText.value);
    if (+String(this.addWhatText.value).length > 3) {
      this.enableSaveTaskButton();
    } else {
      this.disableSaveTaskButton();
    }
  }
  public disableSaveTaskButton() {
    this.saveTaskButton.classList.remove("add__save--active");
    this.saveTaskButton.setAttribute("disabled", "true");
  }
  private enableSaveTaskButton() {
    this.saveTaskButton.classList.add("add__save--active");
    this.saveTaskButton.removeAttribute("disabled");
  }
  private setAddWhatInputsToDefault() {
    this.addWhatText.value = "";
    this.addWhatDescription.value = "";
    this.estimatedPomodorosInput.value = "1";
  }
  private createNewTask(text: string, estimatedPomodoros: string, description?: string) {
    const li = document.createElement("li");
    li.classList.add("all__item");
    li.dataset.key = String(this.tasksList.children.length);
    li.dataset.completedTask = String(0);
    li.appendChild(this.createTextWrapperOfLi(text));
    li.appendChild(this.createEstimatesOfLi(estimatedPomodoros));
    description ? li.appendChild(this.createDescriptionOfLi(description ?? "")) : "";
    this.tasksList.appendChild(li);
  }
  private createTextWrapperOfLi(text: string): HTMLDivElement {
    const addTextWrapper = document.createElement("div");
    addTextWrapper.classList.add("all__wrapper-one");
    const icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-check-circle");
    icon.classList.add("all__icon");
    const textOfTask = document.createElement("p");
    textOfTask.textContent = text;
    addTextWrapper.appendChild(icon);
    addTextWrapper.appendChild(textOfTask);
    return addTextWrapper;
  }
  private createEstimatesOfLi(estimatedPomodoros: string): HTMLDivElement {
    const wrapperTwo = document.createElement("div");
    wrapperTwo.classList.add("all__wrapper-two");

    const allNumberOfTasks = document.createElement("div");
    wrapperTwo.classList.add("all__number-of-tasks");

    const spanTasksDone = document.createElement("span");
    spanTasksDone.textContent = String(0);
    spanTasksDone.classList.add("all__number-of-tasks-done");

    const spanTasksToDo = document.createElement("span");
    spanTasksToDo.textContent = estimatedPomodoros;
    spanTasksToDo.classList.add("all__number-of-tasks-to-do");

    allNumberOfTasks.appendChild(spanTasksDone);
    allNumberOfTasks.textContent += " / ";
    allNumberOfTasks.appendChild(spanTasksToDo);
    wrapperTwo.appendChild(allNumberOfTasks);
    wrapperTwo.appendChild(this.createSettingsOfLi());
    return wrapperTwo;
  }
  private createSettingsOfLi(): HTMLDivElement {
    const allOptions = document.createElement("div");
    allOptions.classList.add("all__options");
    const Edit = document.createElement("div");
    Edit.classList.add("all__edit");
    const EditIcon = document.createElement("i");
    EditIcon.classList.add("far");
    EditIcon.classList.add("fa-edit");
    Edit.appendChild(EditIcon);
    const Delete = document.createElement("div");
    Delete.classList.add("all__delete");
    const DeleteIcon = document.createElement("i");
    DeleteIcon.classList.add("fas");
    DeleteIcon.classList.add("fa-trash");
    Delete.appendChild(DeleteIcon);
    allOptions.appendChild(Edit);
    allOptions.appendChild(Delete);
    return allOptions;
  }
  private createDescriptionOfLi(description: string): HTMLDivElement {
    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add("all__wrapper-three");
    const descriptionText = document.createElement("p");
    descriptionText.classList.add("all__note");

    descriptionText.textContent = description;
    descriptionWrapper.appendChild(descriptionText);
    return descriptionWrapper;
  }

  private setEstimatedPomodorosDefaultValue(value: number) {
    this.estimatedPomodorosInput.value = String(value);
  }
  private validateAddedText(text: string) {
    if (text.length > 200) {
      throw new Error("Nazwa zadania może mieć maksymalnie 200 znaków");
    } else if (text.length < 4) {
      throw new Error("Nazwa zadania musi mieć minimum 4 znaki");
    }
    return text.trim();
  }
  private validateAddedDescription(description: string) {
    if (description.length > 300) {
      throw new Error("Opis zadanie może mieć maksymalnie 300 znaków");
    }
    return description.trim();
  }
  private validateAddedEstimatedPomodoros(number: number) {
    if (number > 50) {
      number = 50;
      throw new Error("Szacowane zadania nie mogą być większe od 50");
    } else if (number < 0) {
      number = 1;
      throw new Error("Szacowane zadania muszą być większe niż 0");
    }
    return number;
  }
}

const TaskClass = new Tasks(
  document.querySelector(".button__wrapper") as HTMLDivElement,
  document.querySelector(".tasks__options") as HTMLDivElement,
  document.querySelector(".add__wrapper") as HTMLDivElement,
  document.querySelector(".add__what") as HTMLInputElement,
  document.querySelector(".add__number-of-pomodoros") as HTMLInputElement,
  document.querySelector(".add__note") as HTMLTextAreaElement,
  document.querySelector(".all__list") as HTMLElement,
  document.querySelector(".add__save") as HTMLButtonElement
);
document.querySelector(".button__wrapper")?.addEventListener("click", function () {
  TaskClass.showSurvey();
});
document.querySelector(".add__cancel")?.addEventListener("click", function () {
  TaskClass.hideSurvey();
});
document.querySelector(".tasks__options")?.addEventListener("click", function () {
  TaskClass.toggleOptions();
});
document.querySelector(".add__what")?.addEventListener("input", function () {
  console.log("123");
  TaskClass.highlightSaveTaskButton();
});
document.querySelector(".add__arrow-up")?.addEventListener("click", function () {
  TaskClass.incrementEstimatedPomodoros();
});
document.querySelector(".add__arrow-down")?.addEventListener("click", function () {
  TaskClass.decrementEstimatedPomodoros();
});
document.querySelector(".add__save")?.addEventListener("click", function () {
  TaskClass.saveNewTask();
  TaskClass.disableSaveTaskButton();
});
document.querySelector(".all__delete")?.addEventListener(
  "click",
  function (event) {
    TaskClass.deleteTask(event);
  },
  true
);
