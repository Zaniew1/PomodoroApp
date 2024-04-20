import { StorageData } from "./Storage";

class Timer {
  private seconds: number = 60;
  private intervalSeconds: number | undefined = undefined;
  private intervalMinutes: number | undefined = undefined;
  private initialMinutes: number = 0;
  private initialSeconds: number = 0;
  private progressBar: HTMLSpanElement = document.querySelector(".header__span__progress--child") as HTMLSpanElement;
  private storage = new StorageData();

  constructor(
    protected background: HTMLBodyElement,
    protected startButton: HTMLButtonElement,
    protected resetButton: HTMLButtonElement,
    protected clockMinutes: HTMLSpanElement,
    protected clockSeconds: HTMLSpanElement
  ) {}
  public loadDataFromDatabase() {
    this.storage.loadSettings();
  }
  protected start(timerTime: number) {
    this.startTimer(timerTime);
    this.showResetButton();
    this.buttonTextContent("Stop");
    this.buttonStartDataset("true");
  }
  protected stop() {
    this.stopTimer();
    this.hideResetButton();
    this.buttonTextContent("Start");
    this.buttonStartDataset("false");
  }
  protected reset(timerTime: number) {
    this.stop();
    this.intervalSeconds = undefined;
    this.intervalMinutes = undefined;
    this.initialMinutes = 0;
    this.initialSeconds = 0;
    this.clockMinutes.textContent = timerTime < 10 ? `0${timerTime}` : String(timerTime);
    this.clockSeconds.textContent = "00";
    this.clearProgressBar();
  }
  protected setButtonReady(button: HTMLButtonElement) {
    button.classList.add("clock__button--active");
    button.dataset.active = "true";
  }
  protected startButtonSetTimerType(typeOfTimer: string) {
    this.startButton.dataset.work = typeOfTimer;
  }
  protected resetSetTimerType(typeOfTimer: string) {
    this.resetButton.dataset.work = typeOfTimer;
  }
  protected unsetButtonReady(button: HTMLButtonElement) {
    button.classList.remove("clock__button--active");
    button.dataset.active = "false";
  }
  protected changeBackgroundColor(color: string) {
    this.background.style.backgroundColor = color;
  }
  protected changeButtonColor(color: string) {
    this.startButton.style.color = color;
  }
  protected setTimeOnTimer(time: number) {
    this.clockMinutes.textContent = time < 10 ? `0${time}` : String(time);
  }
  private startTimer(minutes: number) {
    if (this.initialMinutes === 0 && this.initialSeconds === 0) {
      this.initialMinutes = minutes -= 1;
      this.initialSeconds = this.seconds !== 60 ? this.seconds : 59;
    }
    this.clockMinutes.textContent = this.initialMinutes < 10 ? `0${this.initialMinutes}` : String(this.initialMinutes);
    this.clockSeconds.textContent = this.initialSeconds < 10 ? `0${this.initialSeconds}` : String(this.initialSeconds);

    this.intervalSeconds = setInterval(() => {
      this.runProgressBar(this.initialMinutes, this.initialSeconds);
      this.initialSeconds -= 1;
      this.clockSeconds.textContent = this.initialSeconds < 10 ? `0${this.initialSeconds}` : String(this.initialSeconds);
      if (this.initialSeconds === 0) {
        this.initialSeconds = 60;
      }
    }, 1000);

    this.intervalMinutes = setInterval(() => {
      this.initialMinutes -= 1;
      this.clockMinutes.textContent = this.initialMinutes < 10 ? `0${this.initialMinutes}` : String(this.initialMinutes);
    }, 60000);
  }
  private stopTimer() {
    clearInterval(this.intervalMinutes);
    clearInterval(this.intervalSeconds);
  }
  private runProgressBar(minutes: number, seconds: number) {
    const currentDurationInSeconds = minutes * 60 + seconds;
    const totalDurationTimeInSeconds = (this.initialMinutes + 1) * 60;
    const progressPercentage = (currentDurationInSeconds / totalDurationTimeInSeconds) * 100;
    this.progressBar.style.width = `${100 - progressPercentage}%`;
  }
  private clearProgressBar() {
    this.progressBar.style.width = `0%`;
  }
  private buttonTextContent(text: string) {
    this.startButton.textContent = text;
  }
  private buttonStartDataset(flag: string) {
    this.startButton.dataset.start = flag;
  }
  private showResetButton() {
    this.resetButton.classList.add("reset--visible");
  }
  private hideResetButton() {
    this.resetButton.classList.remove("reset--visible");
  }
}

class WorkTimer extends Timer {
  constructor(
    protected background: HTMLBodyElement,
    protected startButton: HTMLButtonElement,
    protected resetButton: HTMLButtonElement,
    protected clockMinutes: HTMLSpanElement,
    protected clockSeconds: HTMLSpanElement,
    private workButton: HTMLButtonElement,
    private workTime: number,
    private workColor: string
  ) {
    super(background, startButton, resetButton, clockMinutes, clockSeconds);
  }
  public start() {
    super.start(this.workTime);
  }
  public stop() {
    super.stop();
  }
  public reset() {
    super.reset(this.workTime);
  }
  public initialize() {
    super.setTimeOnTimer(this.workTime);
    super.resetSetTimerType("work");
    super.setButtonReady(this.workButton);
    super.startButtonSetTimerType("work");
    super.changeButtonColor(this.workColor);
    super.changeBackgroundColor(this.workColor);
  }
  public deinitialize() {
    super.unsetButtonReady(this.workButton);
    super.reset(this.workTime);
  }
}

class ShortTimer extends Timer {
  constructor(
    protected background: HTMLBodyElement,
    protected startButton: HTMLButtonElement,
    protected resetButton: HTMLButtonElement,
    protected clockMinutes: HTMLSpanElement,
    protected clockSeconds: HTMLSpanElement,
    private shortButton: HTMLButtonElement,
    private shortTime: number,
    private shortColor: string
  ) {
    super(background, startButton, resetButton, clockMinutes, clockSeconds);
  }
  public start() {
    super.start(this.shortTime);
  }
  public stop() {
    super.stop();
  }
  public reset() {
    super.reset(this.shortTime);
  }
  public initialize() {
    super.setTimeOnTimer(this.shortTime);
    super.resetSetTimerType("short");
    super.startButtonSetTimerType("short");
    super.setButtonReady(this.shortButton);
    super.changeButtonColor(this.shortColor);
    super.changeBackgroundColor(this.shortColor);
  }
  public deinitialize() {
    super.unsetButtonReady(this.shortButton);
    super.reset(this.shortTime);
  }
}

class LongTimer extends Timer {
  constructor(
    protected background: HTMLBodyElement,
    protected startButton: HTMLButtonElement,
    protected resetButton: HTMLButtonElement,
    protected clockMinutes: HTMLSpanElement,
    protected clockSeconds: HTMLSpanElement,
    private longButton: HTMLButtonElement,
    private longTime: number,
    private longColor: string
  ) {
    super(background, startButton, resetButton, clockMinutes, clockSeconds);
  }
  public start() {
    super.start(this.longTime);
  }
  public stop() {
    super.stop();
  }
  public reset() {
    super.reset(this.longTime);
  }
  public initialize() {
    super.setTimeOnTimer(this.longTime);
    super.resetSetTimerType("long");
    super.startButtonSetTimerType("long");
    super.setButtonReady(this.longButton);
    super.changeButtonColor(this.longColor);
    super.changeBackgroundColor(this.longColor);
  }
  public deinitialize() {
    super.unsetButtonReady(this.longButton);
    super.reset(this.longTime);
  }
}
const work = new WorkTimer(
  document.body as HTMLBodyElement,
  document.querySelector(".clock__start") as HTMLButtonElement,
  document.querySelector(".reset") as HTMLButtonElement,
  document.querySelector(".clock__minutes") as HTMLSpanElement,
  document.querySelector(".clock__seconds") as HTMLSpanElement,
  document.querySelector(".clock__one") as HTMLButtonElement,
  25,
  "#DB524D"
);
const short = new ShortTimer(
  document.body as HTMLBodyElement,
  document.querySelector(".clock__start") as HTMLButtonElement,
  document.querySelector(".reset") as HTMLButtonElement,
  document.querySelector(".clock__minutes") as HTMLSpanElement,
  document.querySelector(".clock__seconds") as HTMLSpanElement,
  document.querySelector(".clock__two") as HTMLButtonElement,
  5,
  "rgb(67, 126, 168)"
);
const long = new LongTimer(
  document.body as HTMLBodyElement,
  document.querySelector(".clock__start") as HTMLButtonElement,
  document.querySelector(".reset") as HTMLButtonElement,
  document.querySelector(".clock__minutes") as HTMLSpanElement,
  document.querySelector(".clock__seconds") as HTMLSpanElement,
  document.querySelector(".clock__three") as HTMLButtonElement,
  15,
  "rgb(70, 142, 145)"
);

document.addEventListener("DOMContentLoaded", () => {
  work.initialize();
});

document.querySelector(".clock__start")?.addEventListener("click", function () {
  if (this.dataset.work === "work") this.dataset.start === "false" ? work.start() : work.stop();
  else if (this.dataset.work === "short") this.dataset.start === "false" ? short.start() : short.stop();
  else if (this.dataset.work === "long") this.dataset.start === "false" ? long.start() : long.stop();
});
document.querySelector(".reset")?.addEventListener("click", function () {
  if (this.dataset.work === "work") work.reset();
  else if (this.dataset.work === "short") short.reset();
  else if (this.dataset.work === "long") long.reset();
});
document.querySelector(".clock__one")?.addEventListener("click", function () {
  short.deinitialize();
  long.deinitialize();
  work.initialize();
});

document.querySelector(".clock__two")?.addEventListener("click", function () {
  long.deinitialize();
  work.deinitialize();
  short.initialize();
});

document.querySelector(".clock__three")?.addEventListener("click", function () {
  short.deinitialize();
  work.deinitialize();
  long.initialize();
});
