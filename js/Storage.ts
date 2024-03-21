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

  get getPomodoroTime() {
    return this.pomodoroTime;
  }
  set setPomodoroTime(PomodoroTime: number) {
    this.pomodoroTime = PomodoroTime;
  }
}
