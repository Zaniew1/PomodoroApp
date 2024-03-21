interface TimerInterface {
  execute(): void;
  startTimer(value: number): void;
  stopTimer(): void;
  changeColors(colorClass: string): void;
}

export class PomodoroTimerClass implements TimerInterface {
  constructor(protected pomoBtn: HTMLButtonElement | null) {}

  execute() {
    this.startTimer(25);
    console.log("wlazłem do pomodoro");
  }
  startTimer(value: number) {
    console.log(value);
  }
  stopTimer() {
    console.log("stop");
  }
  changeColors(colorClass: string) {}
}

export class ShortTimerClass implements TimerInterface {
  constructor(protected pomoBtn: HTMLButtonElement | null) {}

  execute() {
    this.startTimer(5);
    console.log("wlazłem do short break");
  }
  startTimer(value: number) {
    console.log(value);
  }
  stopTimer() {
    console.log("stop");
  }
  changeColors(colorClass: string) {
    console.log("zmiana klasy" + colorClass);
  }
}

export class LongTimerClass implements TimerInterface {
  constructor(protected pomoBtn: HTMLButtonElement | null) {}
  execute() {
    this.startTimer(15);
    console.log("wlazłem do long break");
  }
  startTimer(value: number) {
    console.log(value);
  }
  stopTimer() {
    console.log("stop");
  }
  changeColors(colorClass: string) {
    console.log("zmiana klasy" + colorClass);
  }
}
class TimerHandler {
  constructor(
    private timer: TimerInterface,
    protected background: HTMLBodyElement | null,
    protected startButton: HTMLButtonElement | null,
    protected clockMinutes: HTMLSpanElement | null,
    protected clockSeconds: HTMLSpanElement | null
  ) {}
  start() {
    this.timer.execute();
  }
}

const Pomodoro = new PomodoroTimerClass(document.querySelector(".clock__one"));
const ShortTimer = new ShortTimerClass(document.querySelector(".clock__two"));
const LongTimer = new LongTimerClass(document.querySelector(".clock__three"));
const background = document.body as HTMLBodyElement;
const startButton = document.querySelector(
  ".clock__start"
) as HTMLButtonElement;
const clockMinutes = document.querySelector(
  ".clock__minutes"
) as HTMLSpanElement;
const clockSeconds = document.querySelector(
  ".clock__seconds"
) as HTMLSpanElement;

document.querySelector(".clock__one")?.addEventListener("click", () => {
  const timer = new TimerHandler(
    Pomodoro,
    background,
    startButton,
    clockMinutes,
    clockSeconds
  );
  timer.start();
});
document.querySelector(".clock__two")?.addEventListener("click", () => {
  const timer = new TimerHandler(
    ShortTimer,
    background,
    startButton,
    clockMinutes,
    clockSeconds
  );
  timer.start();
});
document.querySelector(".clock__three")?.addEventListener("click", () => {
  const timer = new TimerHandler(
    LongTimer,
    background,
    startButton,
    clockMinutes,
    clockSeconds
  );
  timer.start();
});
