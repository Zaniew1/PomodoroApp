// interface TimerInterface {
//   execute(): void;
//   startTimer(value: number): void;
//   stopTimer(): void;
//   changeColors(colorClass: string): void;
// }

// export class PomodoroTimerClass implements TimerInterface {
//   constructor(private mainButton: HTMLButtonElement | null) {}

//   execute() {
//     this.startTimer(25);
//     console.log("wlazłem do pomodoro");
//   }
//   startTimer(value: number) {
//     console.log(value);
//   }
//   stopTimer() {
//     console.log("stop");
//   }
//   changeColors(colorClass: string) {}
// }

// export class ShortTimerClass implements TimerInterface {
//   constructor(private mainButton: HTMLButtonElement | null) {}

//   execute() {
//     this.startTimer(5);
//     console.log("wlazłem do short break");
//   }
//   startTimer(value: number) {
//     console.log(value);
//   }
//   stopTimer() {
//     console.log("stop");
//   }
//   changeColors(colorClass: string) {
//     console.log("zmiana klasy" + colorClass);
//   }
// }

// export class LongTimerClass implements TimerInterface {
//   constructor(private mainButton: HTMLButtonElement | null) {}
// }
// class TimerHandler {
//   constructor(private timer: TimerInterface) {}
//   start() {
//     this.timer.execute();
//   }
// }
// const background = document.body as HTMLBodyElement;
// const startButton = document.querySelector(".clock__start") as HTMLButtonElement;
// const clockMinutes = document.querySelector(".clock__minutes") as HTMLSpanElement;
// const clockSeconds = document.querySelector(".clock__seconds") as HTMLSpanElement;

// const Pomodoro = new PomodoroTimerClass(document.querySelector(".clock__one"));
// const ShortTimer = new ShortTimerClass(document.querySelector(".clock__two"));
// const LongTimer = new LongTimerClass(document.querySelector(".clock__three"));

// document.querySelector(".clock__one")?.addEventListener("click", () => {
//   const timer = new TimerHandler(Pomodoro);
//   timer.start();
// });
// document.querySelector(".clock__two")?.addEventListener("click", () => {
//   const timer = new TimerHandler(ShortTimer);
//   timer.start();
// });
// document.querySelector(".clock__three")?.addEventListener("click", () => {
//   const timer = new TimerHandler(LongTimer);
//   timer.start();
// });
