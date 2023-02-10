import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import { IoIosAdd } from "react-icons/io";
import DialogForAppend from "./ui-parts/AddTaskModal";
import { useDrop } from "react-dnd";
import { Draggable } from "./Draggable";
import { TaskItem, TaskItemWithIndex } from "src/typings/taskItem";
import { ITEM_TYPES } from "src/typings/itemTypes";

// boardはあくまでfilterされたlistを表示するのみにする
type props = {
  isOver?: any;
  firstIndex: number;
  groupName: string;
  taskList: TaskItem[];
  createTask: (newTask: TaskItem, index: number) => void;
  deleteTask: (target: TaskItem) => void;
  editTask: (newTaskName: string, taskID: string) => void;
  swapTasks: (dragIndex: number, hoverIndex: number, groupName: string) => void;
};

const BoardName = styled.span`
  margin: 5px;
`;

const TaskWrapper = styled.div`
  display: flex;
  margin: 5px;
  flex-flow: column;
  border: 1px solid lightgray;
  justify-content: space-around;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  display: inline-flex;
`;

export const Board: React.FC<props> = (props) => {
  const [_, drop] = useDrop(() => ({
    accept: ITEM_TYPES.card,
    hover(dragItem: TaskItemWithIndex) {
      if (dragItem.groupName === props.groupName) return;
      const dragIndex = dragItem.index;
      const targetIndex =
        dragIndex < props.firstIndex
          ? // forward
            props.firstIndex + props.taskList.length - 1
          : // backward
            props.firstIndex + props.taskList.length;
      props.swapTasks(dragIndex, targetIndex, props.groupName);
      dragItem.index = targetIndex;
      dragItem.groupName = props.groupName;
    },
  }));

  const [showModal, setShowModal] = useState(false);
  return (
    <TaskWrapper ref={drop}>
      {props.taskList.map((taskItem, i) => {
        return (
          <div key={taskItem.id}>
            <Draggable
              item={taskItem}
              index={props.firstIndex + i}
              swapItems={props.swapTasks}
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
      <Button onClick={() => setShowModal(true)}>
        <IoIosAdd />
        <span>New </span>
      </Button>
      <DialogForAppend
        showModal={showModal}
        setShowModal={setShowModal}
        index={props.firstIndex + props.taskList.length}
        createTask={props.createTask}
        groupName={props.groupName}
      ></DialogForAppend>
    </TaskWrapper>
  );
};

export default Board;
