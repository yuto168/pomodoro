// タスクの種別を定義
export const ITEM_TYPES = {
  card: "card",
  column: "column",
} as const;

export type ItemTypes = typeof ITEM_TYPES;

// カラムの型定義
export type Column = {
  id: string;
  groupName: string;
  type: keyof ItemTypes;
};

// カードの型定義
export type Card = Column & {
  contents: string;
  focusTime: number;
};

// Drag Drop対象の型定義
export type DraggableItem =
  | (Column & { index: number })
  | (Card & { index: number });

// APIから取得したタスク情報の型定義
export type TaskItemFromAPI = {
  task: Card[];
  column: Column[];
};
