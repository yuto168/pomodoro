import { Draggable } from "../components/Draggable";
// タスクの種別を定義
export const ITEM_TYPES = {
  card: "card",
  column: "column",
} as const;

export type ItemTypes = typeof ITEM_TYPES;

export type Column = {
  id: string;
  groupName: string;
  type: keyof ItemTypes;
};

export type Card = Column & {
  contents: string;
  focusTime: number;
};

type DraggableItem = (Column & { index: number }) | (Card & { index: number });

// タスクの型定義
export type TaskItem = {
  id: string;
  groupName: string;
  contents: string;
  type: keyof ItemTypes;
  focusTime: number;
};

// APIから取得したタスク情報の型定義
export type TaskItemFromAPI = {
  task: TaskItem[];
  column: TaskItem[];
};

// drag dropによるタスクの順番入れ替え用の型定義
export type TaskItemWithIndex = TaskItem & { index: number };
