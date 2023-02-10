export const ITEM_TYPES = {
  card: "card",
  column: "column",
} as const;

export type ItemTypes = typeof ITEM_TYPES;
