class MainClass {
  private pomodoroTime: number;
  private shortBreakTime: number;
  private longBreakTime: number;
  private seconds: number;
  private intervalSeconds;
  private intervalMinutes;
  private startPomodoroAutomatically;
  private startBreakAutomatically;
  private longBreakInterval;
  constructor(
    private background: HTMLBodyElement,
    private startButton: HTMLButtonElement,
    private resetButton: HTMLButtonElement,
    private clockMinutes: HTMLSpanElement,
    private clockSeconds: HTMLSpanElement,
    private pomodoroButton: HTMLSpanElement,
    private shortButton: HTMLSpanElement,
    private longButton: HTMLSpanElement
  ) {}
  start() {
    this.startTimer(this.pomodoroTime, this.seconds);
    this.changeButtonColor("orange");
    this.changeBackgroundColor("orange");
    this.showResetButton();
    this.buttonTextContent("Stop");
    this.buttonStartDataset("true");
  }
  stop() {
    this.stopTimer();
    this.hideResetButton();
    this.buttonTextContent("Start");
    this.buttonStartDataset("false");
  }
  startTimer(minutes: number, seconds: number) {
    minutes -= 1;
    this.clockMinutes.textContent = minutes < 10 ? `0${minutes}` : String(minutes);
    this.clockSeconds.textContent = String(seconds);

    this.intervalSeconds = setInterval(() => {
      seconds -= 1;
      this.clockSeconds.textContent = seconds < 10 ? `0${seconds}` : String(seconds);
      if (seconds == 0) {
        seconds = 60;
      }
    }, 1000);
    this.intervalMinutes = setInterval(() => {
      minutes -= 1;
      this.clockMinutes.textContent = minutes < 10 ? `0${minutes}` : String(minutes);
    }, 60000);
  }
  buttonTextContent(text: string) {
    this.startButton.textContent = text;
  }
  buttonStartDataset(flag: string) {
    this.startButton.dataset.start = flag;
  }
  showResetButton() {
    this.resetButton.classList.add("reset--visible");
  }
  hideResetButton() {
    this.resetButton.classList.remove("reset--visible");
  }
  changeBackgroundColor(color: string) {
    this.background.classList.remove("orange");
    this.background.classList.remove("blue");
    this.background.classList.remove("green");
    this.background.classList.add(color);
  }
  changeButtonColor(color: string) {
    this.startButton.classList.remove("orange");
    this.startButton.classList.remove("blue");
    this.startButton.classList.remove("green");
    this.startButton.classList.add(color);
  }
  stopTimer() {
    clearInterval(this.intervalMinutes);
    clearInterval(this.intervalSeconds);
  }
  changeTimerButtonActive(button) {
    button.classList.add("clock__button--active");
  }
}
const main = new MainClass(
  document.body as HTMLBodyElement,
  document.querySelector(".clock__start") as HTMLButtonElement,
  document.querySelector(".reset") as HTMLButtonElement,
  document.querySelector(".clock__minutes") as HTMLSpanElement,
  document.querySelector(".clock__seconds") as HTMLSpanElement,
  document.querySelector(".clock__one") as HTMLSpanElement,
  document.querySelector(".clock__two") as HTMLSpanElement,
  document.querySelector(".clock__three") as HTMLSpanElement
);
document.querySelector(".clock__start")?.addEventListener("click", function () {
  if (this.dataset.start == "false") {
    main.start();
  } else {
    main.stop();
  }
});
