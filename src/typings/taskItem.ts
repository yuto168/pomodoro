import { ItemTypes } from "./itemTypes";

export type TaskItem = {
  id: string;
  groupName: string;
  contents: string;
  type: keyof ItemTypes;
};

export type TaskItemWithIndex = TaskItem & { index: number };
