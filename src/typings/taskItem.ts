import { ItemTypes } from "./itemTypes";

export type TaskItem = {
  id: string;
  groupName: string;
  contents: string;
  type: keyof ItemTypes;
};

// APIで取得される型
export type RawTaskList = {
  task: TaskItem[];
};

export type TaskItemWithIndex = TaskItem & { index: number };
