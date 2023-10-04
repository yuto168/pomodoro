import { FC } from "react";
import { TaskItem, DraggableItem } from "../typings/taskItem";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

type Props = {
  item: TaskItem;
  index: number;
  swapItems: (dragIndex: number, hoverIndex: number, groupName: string) => void;
  saveCurrnetTaskList: () => void;
  children: React.ReactNode;
};

export const Draggable: FC<Props> = ({
  item,
  index,
  swapItems,
  saveCurrnetTaskList,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: item.type,
    drop: () => {
      // drop完了時にタスク更新を行う。
      saveCurrnetTaskList();
    },
    hover(dragItem: DraggableItem, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      if (dragIndex === undefined) return;

      if (item.groupName === dragItem.groupName) {
        // グループ内での並び替えの場合は入れ替え方向とhover位置に応じて入れ替えるかを確定
        const hoverRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
      }

      swapItems(dragIndex, hoverIndex, item.groupName);

      dragItem.index = hoverIndex;
      dragItem.groupName = item.groupName;
    },
  });

  const [, drag] = useDrag({
    type: item.type,
    item: { ...item, index },
    isDragging: (monitor) => monitor.getItem().id === item.id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
  });

  drag(drop(ref));

  return <div ref={ref}>{children}</div>;
};
