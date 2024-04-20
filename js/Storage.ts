type singleTaskType = {
  text: string;
  finishedTasks: string;
  estimatedTasks: string;
  descriptionTasks?: string;
};
import { SettingsType } from "./Settings";
export class StorageData {
  private pomodoroTime: number;
  private shortBreakTime: number;
  private LongBreakTime: number;
  private autoBreakStart: boolean;
  private autoPomoStart: boolean;
  private longBreakInterval: number;
  private alarmSound: string;
  private alarmvolume: number;
  private tickingSound: string;
  private tickingVolume: number;
  constructor() {}

  saveTasks(ulList: HTMLUListElement) {
    const tasks: singleTaskType[] = [];
    const liElements = [...ulList.getElementsByTagName("li")];
    liElements.forEach((li, index) => {
      const text = li.querySelector(".task__text")?.textContent;
      const finishedTasks = li.querySelector(".all__number-of-tasks-done")?.textContent;
      const estimatedTasks = li.querySelector(".all__number-of-tasks-to-do")?.textContent;
      const descriptionTasks = li.querySelector(".all__note")?.textContent ?? "";

      const task: singleTaskType = {
        text: text ? text : "",
        finishedTasks: finishedTasks ? finishedTasks : "0",
        estimatedTasks: estimatedTasks ? estimatedTasks : "1",
        descriptionTasks,
      };
      tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  saveSettings(settings: any) {
    localStorage.setItem("settings", JSON.stringify(settings));
  }
  loadSettings(): SettingsType | undefined {
    const settings = localStorage.getItem("settings");
    console.log(settings);
    if (settings) {
      return JSON.parse(settings);
    }
  }
  loadTasks(): singleTaskType[] | undefined {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
  }
  clearTasks() {
    localStorage.setItem("tasks", "");
  }

  get getPomodoroTime() {
    return this.pomodoroTime;
  }
  set setPomodoroTime(PomodoroTime: number) {
    this.pomodoroTime = PomodoroTime;
  }
}
