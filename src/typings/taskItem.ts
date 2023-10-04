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

export type DraggableItem =
  | (Column & { index: number })
  | (Card & { index: number });

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
