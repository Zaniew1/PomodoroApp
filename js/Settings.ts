import { StorageData } from "./Storage";
import { SettingsUIClass } from "./SettingsUI";
import { SettingsType } from "../types/types";

export class Settings {
  private storage = new StorageData();
  constructor(
    protected workTime: HTMLInputElement,
    protected shortTime: HTMLInputElement,
    protected longTime: HTMLInputElement,
    protected autoBreakStart: HTMLDivElement,
    protected autoWorkStart: HTMLDivElement,
    protected longBreakInterval: HTMLInputElement,
    protected alarmSound: HTMLSelectElement,
    protected alarmVolume: HTMLInputElement,
    protected tickingSound: HTMLSelectElement,
    protected tickingVolume: HTMLInputElement
  ) {}

  saveSettings() {
    this.validateWorkTime();
    this.validateShortTime();
    this.validateLongTime();
    this.validateAutoBreakStart();
    this.validateAutoWorkStart();
    this.validateLongBreakInterval();
    this.validateAlarmSound();
    this.validateAlarmVolume();
    this.validateTickingSound();
    this.validateTickingVolume();
    const settings: SettingsType = {
      workTime: this.workTime.value,
      shortTime: this.shortTime.value,
      longTime: this.longTime.value,
      autoBreakStart: this.autoBreakStart.classList.contains("settings__auto-breaks-accept--active") ? true : false,
      autoWorkStart: this.autoWorkStart.classList.contains("settings__auto-pomodoro-accept--active") ? true : false,
      longBreakInterval: this.longBreakInterval.value,
      alarmSound: this.alarmSound.value,
      alarmVolume: this.alarmVolume.value,
      tickingSound: this.tickingSound.value,
      tickingVolume: this.tickingVolume.value,
    };
    this.storage.saveSettings(settings);
  }
  loadSettings() {
    const settings = this.storage.loadSettings();
    settings?.workTime ? (this.workTime.value = settings?.workTime) : "";
    settings?.shortTime ? (this.shortTime.value = settings?.shortTime) : "";
    settings?.longTime ? (this.longTime.value = settings?.longTime) : "";
    settings?.autoBreakStart === true
      ? this.autoBreakStart.classList.add("settings__auto-breaks-accept--active")
      : this.autoBreakStart.classList.remove("settings__auto-breaks-accept--active");
    settings?.autoWorkStart === true
      ? this.autoWorkStart.classList.add("settings__auto-pomodoro-accept--active")
      : this.autoBreakStart.classList.remove("settings__auto-pomodoro-accept--active");
    settings?.longBreakInterval ? (this.longBreakInterval.value = settings?.longBreakInterval) : "";
    settings?.alarmSound ? (this.alarmSound.value = settings?.alarmSound) : "";
    settings?.alarmVolume ? (this.alarmVolume.value = settings?.alarmVolume) : "";
    settings?.tickingSound ? (this.tickingSound.value = settings?.tickingSound) : "";
    settings?.tickingVolume ? (this.tickingVolume.value = settings?.tickingVolume) : "";
  }
  validateWorkTime() {
    if (+this.workTime < 1) {
      throw new Error("Long Break cannot be less than 0");
    } else if (+this.workTime > 180) {
      throw new Error("Long Break cannot be greater than 180");
    }
  }
  validateShortTime() {
    if (+this.shortTime < 1) {
      throw new Error("Short Break cannot be less than 0");
    } else if (+this.shortTime > 30) {
      throw new Error("Short Break cannot be less than 30");
    }
  }
  validateLongTime() {
    if (+this.longTime < 1) {
      throw new Error("Long Break cannot be less than 0");
    } else if (+this.longTime > 120) {
      throw new Error("Long Break cannot be greater than 120");
    }
  }
  validateAutoBreakStart() {
    return this.autoBreakStart.classList.contains("settings__auto-breaks-accept--active") ? true : false;
  }
  validateAutoWorkStart() {
    return this.autoBreakStart.classList.contains("settings__auto-pomodoro-accept--active") ? true : false;
  }
  validateLongBreakInterval() {
    if (+this.longBreakInterval < 1) {
      throw new Error("Long Break Interval cannot be less than 0");
    } else if (+this.longBreakInterval > 10) {
      throw new Error("Long Break Interval cannot be greater than 10");
    }
  }
  validateAlarmSound() {
    if (+this.alarmSound.value < 0 || +this.alarmSound.value > Number([...this.alarmSound.options].length)) {
      throw new Error("Nieprawidłowa opcja Dźwięku alarmu");
    }
  }
  validateAlarmVolume() {
    if (+this.alarmVolume < 1) {
      throw new Error("Alarm Volume cannot be less than 0");
    } else if (+this.alarmVolume > 100) {
      throw new Error("Alarm Volume  cannot be greater than 100");
    }
  }
  validateTickingSound() {
    if (+this.tickingSound.value < 0 || +this.tickingSound.value > Number([...this.tickingSound.options].length)) {
      throw new Error("Nieprawidłowa opcja Dźwięku cykania");
    }
  }
  validateTickingVolume() {
    if (+this.tickingVolume < 1) {
      throw new Error("Ticking Volume cannot be less than 0");
    } else if (+this.tickingVolume > 100) {
      throw new Error("Ticking Volume cannot be greater than 100");
    }
  }
}

export const SettingsClass = new Settings(
  document.querySelector(".settings__time-of-clock-input--pomodoro") as HTMLInputElement,
  document.querySelector(".settings__time-of-clock-input--short") as HTMLInputElement,
  document.querySelector(".settings__time-of-clock-input--long") as HTMLInputElement,
  document.querySelector(".settings__auto-breaks-accept") as HTMLDivElement,
  document.querySelector(".settings__auto-pomodoro-accept") as HTMLDivElement,
  document.querySelector(".settings__long-interval-input") as HTMLInputElement,
  document.querySelector(".settings__alarm-sound-select") as HTMLSelectElement,
  document.querySelector(".settings__alarm-volume-input") as HTMLInputElement,
  document.querySelector(".settings__ticking-sound-select") as HTMLSelectElement,
  document.querySelector(".settings__ticking-volume-input") as HTMLInputElement
);
document.querySelector(".settings__accept-button")?.addEventListener("click", function () {
  SettingsClass.saveSettings();
  SettingsUIClass.hideSettings();
});
document.addEventListener("DOMContentLoaded", function () {
  SettingsClass.loadSettings();
});
