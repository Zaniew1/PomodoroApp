export type SettingsType = {
  workTime: string;
  shortTime: string;
  longTime: string;
  autoBreakStart: boolean;
  autoWorkStart: boolean;
  longBreakInterval: string;
  alarmSound: string;
  alarmVolume: string;
  tickingSound: string;
  tickingVolume: string;
};
export type SingleTaskType = {
  text: string;
  finishedTasks: string;
  estimatedTasks: string;
  descriptionTasks?: string;
};
