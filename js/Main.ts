class MainClass {
  private pomodoroTime: number = 25;
  private shortBreakTime: number = 5;
  private longBreakTime: number = 15;
  private seconds: number = 59;
  private intervalSeconds;
  private intervalMinutes;
  private startPomodoroAutomatically;
  private startBreakAutomatically;
  private longBreakInterval;
  constructor(
    private background: HTMLBodyElement,
    private startButton: HTMLButtonElement,
    private clockMinutes: HTMLSpanElement,
    private clockSeconds: HTMLSpanElement,
    private pomodoroButton: HTMLSpanElement,
    private shortButton: HTMLSpanElement,
    private longButton: HTMLSpanElement
  ) {}
  execute() {
    this.startTimer(this.pomodoroTime, this.seconds);
    // this.changeColors();
  }
  startTimer(minutes: number, seconds: number) {
    this.changeBackgroundColor("orange");
    this.startButton.textContent = "Stop";
    minutes -= 1;
    this.clockMinutes.textContent = minutes < 10 ? `0${minutes}` : String(minutes);
    this.clockSeconds.textContent = String(seconds);

    this.intervalSeconds = setInterval(() => {
      this.clockSeconds.textContent = seconds < 10 ? `0${seconds}` : String(seconds);
      seconds -= 1;
      if (seconds == 0) {
        seconds = 60;
      }
    }, 1000);
    this.intervalMinutes = setInterval(() => {
      minutes -= 1;
      this.clockMinutes.textContent = minutes < 10 ? `0${minutes}` : String(minutes);
    }, 60000);
    this.startButton.dataset.start = "true";
  }
  changeBackgroundColor(color: string) {
    this.background.classList.remove("orange");
    this.background.classList.remove("blue");
    this.background.classList.remove("green");
    this.background.classList.add(color);
  }
  stopTimer() {
    this.startButton.textContent = "Start";
    clearInterval(this.intervalMinutes);
    clearInterval(this.intervalSeconds);
    this.startButton.dataset.start = "false";
  }
  changeColors(colorClass: string) {
    this.pomodoroButton.classList.add("clock__button--active");
  }
}
const main = new MainClass(
  document.body as HTMLBodyElement,
  document.querySelector(".clock__start") as HTMLButtonElement,
  document.querySelector(".clock__minutes") as HTMLSpanElement,
  document.querySelector(".clock__seconds") as HTMLSpanElement,
  document.querySelector(".clock__one") as HTMLSpanElement,
  document.querySelector(".clock__two") as HTMLSpanElement,
  document.querySelector(".clock__three") as HTMLSpanElement
);
document.querySelector(".clock__start")?.addEventListener("click", function () {
  if (this.dataset.start == "false") {
    main.execute();
  } else {
    main.stopTimer();
  }
});
// document.querySelector(".clock__start")?.addEventListener("click", () => {});
