import { ItemTypes } from "./itemTypes";

export type TaskItem = {
  id: string;
  groupName: string;
  contents: string;
  type: keyof ItemTypes;
  focusTime: number;
};

export type MockTaskList = {
  task: TaskItem[];
  column: TaskItem[];
};

export type TaskItemWithIndex = TaskItem & { index: number };
