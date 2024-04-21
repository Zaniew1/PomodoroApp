import { SettingsType, SingleTaskType } from "../types/types";
export class StorageData {
  constructor() {}

  public saveTasks(ulList: HTMLUListElement) {
    const tasks: SingleTaskType[] = [];
    const liElements = [...ulList.getElementsByTagName("li")];
    liElements.forEach((li, index) => {
      const text = li.querySelector(".task__text")?.textContent;
      const finishedTasks = li.querySelector(".all__number-of-tasks-done")?.textContent;
      const estimatedTasks = li.querySelector(".all__number-of-tasks-to-do")?.textContent;
      const descriptionTasks = li.querySelector(".all__note")?.textContent ?? "";

      const task: SingleTaskType = {
        text: text ? text : "",
        finishedTasks: finishedTasks ? finishedTasks : "0",
        estimatedTasks: estimatedTasks ? estimatedTasks : "1",
        descriptionTasks,
      };
      tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  public saveSettings(settings: SettingsType) {
    console.log(settings);
    localStorage.setItem("settings", JSON.stringify(settings));
  }
  public loadSettings(): SettingsType | undefined {
    const settings = localStorage.getItem("settings");
    if (settings) {
      return JSON.parse(settings);
    }
  }
  public loadTasks(): SingleTaskType[] | undefined {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
  }
}
