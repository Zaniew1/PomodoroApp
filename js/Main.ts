class Timer {
  private seconds: number = 60;
  private intervalSeconds: number | undefined = undefined;
  private intervalMinutes: number | undefined = undefined;
  private initialMinutes: number = 0;
  private initialSeconds: number = 0;
  constructor(
    protected background: HTMLBodyElement,
    protected startButton: HTMLButtonElement,
    protected resetButton: HTMLButtonElement,
    protected clockMinutes: HTMLSpanElement,
    protected clockSeconds: HTMLSpanElement
  ) {}
  protected start(timerTime: number, color: string) {
    this.startTimer(timerTime);
    this.changeButtonColor(color);
    this.changeBackgroundColor(color);
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
    this.clockMinutes.textContent = String(timerTime);
    this.clockSeconds.textContent = "00";
  }
  protected setButtonReady(button: HTMLButtonElement) {
    button.classList.add("clock__button--active");
    button.dataset.active = "true";
  }
  protected unsetButtonReady(button: HTMLButtonElement) {
    button.classList.remove("clock__button--active");
    button.dataset.active = "false";
  }
  private startTimer(minutes: number) {
    if (this.initialMinutes === 0 && this.initialSeconds === 0) {
      this.initialMinutes = minutes -= 1;
      this.initialSeconds = this.seconds !== 60 ? this.seconds : 59;
    }
    this.clockMinutes.textContent = this.initialMinutes < 10 ? `0${this.initialMinutes}` : String(this.initialMinutes);
    this.clockSeconds.textContent = this.initialSeconds < 10 ? `0${this.initialSeconds}` : String(this.initialSeconds);

    this.intervalSeconds = setInterval(() => {
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
  private changeBackgroundColor(color: string) {
    this.background.style.backgroundColor = color;
  }
  private changeButtonColor(color: string) {
    this.background.style.backgroundColor = color;
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
    this.workButton = workButton;
    this.workTime = workTime;
  }
  public start() {
    super.start(this.workTime, this.workColor);
  }
  public stop() {
    super.stop();
  }
  public reset() {
    super.reset(this.workTime);
  }
  public initialize() {
    super.setButtonReady(this.workButton);
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
    this.shortButton = shortButton;
    this.shortTime = shortTime;
  }
  public start() {
    super.start(this.shortTime, this.shortColor);
  }
  public stop() {
    super.stop();
  }
  public reset() {
    super.reset(this.shortTime);
  }
  public initialize() {
    super.setButtonReady(this.shortButton);
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
    this.longButton = longButton;
    this.longTime = longTime;
    this.longColor = longColor;
  }
  public start() {
    super.start(this.longTime, this.longColor);
  }
  public stop() {
    super.stop();
  }
  public reset() {
    super.reset(this.longTime);
  }
  public initialize() {
    super.setButtonReady(this.longButton);
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
document.querySelector(".clock__start")?.addEventListener("click", function () {
  const clockOne = document.querySelector(".clock__one");
  const clockTwo = document.querySelector(".clock__two");
  const clockOneActive = clockOne instanceof HTMLElement && clockOne.dataset.active === "true";
  const clockTwoActive = clockTwo instanceof HTMLElement && clockTwo.dataset.active === "true";
  if (this.dataset.start == "false") {
    if (clockOneActive) {
      work.start();
    } else if (clockTwoActive) {
      short.start();
    } else {
      long.start();
    }
  } else {
    work.stop();
  }
});
document.querySelector(".reset")?.addEventListener("click", function () {
  work.reset();
  short.reset();
  long.reset();
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
