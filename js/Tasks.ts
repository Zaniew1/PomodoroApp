export class Tasks {
  constructor(
    protected addButton: HTMLDivElement,
    protected taskOptions: HTMLDivElement,
    protected addSurvey: HTMLDivElement,
    protected addWhatText: HTMLInputElement,
    protected estimatedPomodorosInput: HTMLInputElement,
    protected addWhatDescription: HTMLTextAreaElement,
    protected tasksList: HTMLElement
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
    this.createNewTask(this.addWhatText.value, this.estimatedPomodorosInput.value, this.addWhatDescription.value);
  }
  private createNewTask(text: string, estimatedPomodoros: string, description?: string) {
    const li = document.createElement("li");
    // li.classList=""
    this.tasksList.appendChild(li);
  }
  private setEstimatedPomodorosDefaultValue(value: number) {
    this.estimatedPomodorosInput.value = String(value);
  }
  private validateAddedText() {
    console.log("valText");
  }
  private validateAddedDescription() {
    console.log("valDesc");
  }
  private validateAddedEstimatedPomodoros() {
    console.log("valEst");
  }
}

const TaskClass = new Tasks(
  document.querySelector(".button__wrapper") as HTMLDivElement,
  document.querySelector(".tasks__options") as HTMLDivElement,
  document.querySelector(".add__wrapper") as HTMLDivElement,
  document.querySelector(".add__what") as HTMLInputElement,
  document.querySelector(".add__number-of-pomodoros") as HTMLInputElement,
  document.querySelector(".add__note") as HTMLTextAreaElement,
  document.querySelector(".all__list") as HTMLElement
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

document.querySelector(".add__arrow-up")?.addEventListener("click", function () {
  TaskClass.incrementEstimatedPomodoros();
});
document.querySelector(".add__arrow-down")?.addEventListener("click", function () {
  TaskClass.decrementEstimatedPomodoros();
});
document.querySelector(".add__save")?.addEventListener("click", function () {
  TaskClass.saveNewTask();
});
