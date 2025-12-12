import { SettingsClass } from "./Settings";
class SettingsUI {
  constructor(
    protected settings: HTMLDivElement,
    protected blur: HTMLDivElement,
    protected autoBreakAccept: HTMLDivElement,
    protected AutoWorkAccept: HTMLDivElement
  ) {}
  showSettings() {
    this.settings.classList.add("settings--active");
  }
  hideSettings() {
    this.settings.classList.remove("settings--active");
  }
  addBlurToBackground() {
    this.blur.classList.add("blur--active");
  }
  removeBlurToBackground() {
    this.blur.classList.remove("blur--active");
  }
  toggleAutoBreak() {
    this.autoBreakAccept.classList.toggle("settings__auto-breaks-accept--active");
  }
  toggleAutoWork() {
    this.AutoWorkAccept.classList.toggle("settings__auto-pomodoro-accept--active");
  }
}
const settings = document.querySelector(".settings") as HTMLDivElement;
const blurBackground = document.querySelector(".blur") as HTMLDivElement;
const autoBreakAccept = document.querySelector(".settings__auto-breaks-accept") as HTMLDivElement;
const autoWorkAccept = document.querySelector(".settings__auto-pomodoro-accept") as HTMLDivElement;
export const SettingsUIClass = new SettingsUI(settings, blurBackground, autoBreakAccept, autoWorkAccept);

document.querySelector(".nav__item-settings")?.addEventListener("click", () => {
  SettingsUIClass.showSettings();
  SettingsUIClass.addBlurToBackground();
});

document.querySelector(".settings__escape")?.addEventListener("click", () => {
  SettingsUIClass.hideSettings();
  SettingsUIClass.removeBlurToBackground();
});
document.querySelector(".blur")?.addEventListener("click", () => {
  SettingsUIClass.hideSettings();
  SettingsUIClass.removeBlurToBackground();
});
document.querySelector(".settings__accept-button")?.addEventListener("click", function () {
  console.log(SettingsClass.getSettings);
  SettingsUIClass.hideSettings();
  SettingsUIClass.removeBlurToBackground();
});
document.querySelector(".settings__auto-breaks-accept")?.addEventListener("click", function () {
  SettingsUIClass.toggleAutoBreak();
});
document.querySelector(".settings__auto-pomodoro-accept")?.addEventListener("click", function () {
  SettingsUIClass.toggleAutoWork();
});
