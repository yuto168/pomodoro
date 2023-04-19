import { FC, useState } from "react";
import styled from "styled-components";
import { TaskCard } from "./TaskCard";
import { IoIosAdd } from "react-icons/io";
import { DialogForAddTask } from "./ui-parts/DialogForAddTask";
import { useDrop } from "react-dnd";
import { Draggable } from "./Draggable";
import { TaskItem, TaskItemWithIndex } from "src/typings/taskItem";
import { ITEM_TYPES } from "src/typings/itemTypes";
import layouts from "src/constants/layouts";
import { GlassBoard } from "./ui-parts/GlassBoard";

// boardはあくまでfilterされたlistを表示するのみにする
type Props = {
  isOver?: any;
  firstIndex: number;
  groupName: string;
  taskList: TaskItem[];
  createTask: (newTask: TaskItem, index: number) => void;
  deleteTask: (target: TaskItem) => void;
  editTask: (newTaskName: string, taskID: string) => void;
  swapTasks: (dragIndex: number, hoverIndex: number, groupName: string) => void;
  saveCurrentTasks: () => void;
};

const BoardFooter = styled.div`
  border: none;
  cursor: pointer;
  margin: 2px;
  height: ${layouts.boardFooterHeight}px;
  color: #ffffff;
  &:hover {
    backdrop-filter: blur(11px);
  }
`;

export const Board: FC<Props> = (props) => {
  const [_, drop] = useDrop(() => ({
    accept: ITEM_TYPES.card,
    hover(dragItem: TaskItemWithIndex) {
      if (dragItem.groupName === props.groupName) return;
      const dragIndex = dragItem.index;
      const targetIndex =
        dragIndex < props.firstIndex
          ? props.firstIndex + props.taskList.length - 1
          : props.firstIndex + props.taskList.length;
      props.swapTasks(dragIndex, targetIndex, props.groupName);
      dragItem.index = targetIndex;
      dragItem.groupName = props.groupName;
    },
  }));

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <GlassBoard dropRef={drop}>
        {props.taskList.map((taskItem, i) => {
          return (
            <div key={taskItem.id}>
              <Draggable
                item={taskItem}
                index={props.firstIndex + i}
                swapItems={props.swapTasks}
                saveCurrentTasks={props.saveCurrentTasks}
              >
                <TaskCard
                  task={taskItem}
                  deleteTask={props.deleteTask}
                  editTask={props.editTask}
                />
              </Draggable>
            </div>
          );
        })}
        <BoardFooter onClick={() => setShowModal(true)}>
          <span>New</span>
          <IoIosAdd />
        </BoardFooter>
      </GlassBoard>
      <DialogForAddTask
        showModal={showModal}
        setShowModal={setShowModal}
        index={props.firstIndex + props.taskList.length}
        createTask={props.createTask}
        groupName={props.groupName}
      ></DialogForAddTask>
    </>
  );
};
