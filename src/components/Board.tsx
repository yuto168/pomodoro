import { useState } from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import { IoIosAdd } from "react-icons/io";
import DialogForAddTask from "./ui-parts/DialogForAddTask";
import { useDrop } from "react-dnd";
import { Draggable } from "./Draggable";
import { TaskItem, TaskItemWithIndex } from "src/typings/taskItem";
import { ITEM_TYPES } from "src/typings/itemTypes";
import layouts from "src/css/layouts";

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

const GlassBox = styled.div`
  box-sizing: border-box;
  background-color: rgba(230, 199, 210, 0.369);
  backdrop-filter: blur(11px);
  border: 0.5px solid #ffffff;
  border-radius: 24px 16px 16px 16px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
`;

const TaskWrapper = styled(GlassBox)`
  position: relative;
  padding: 2%;
  display: flex;
  flex-flow: column;
  justify-content: start;
  margin: 5px;
  min-height: ${layouts.boardMinHeight}px;
  width: ${layouts.boardWidth}px;
  cursor: pointer;
`;

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

export const Board: React.FC<props> = (props) => {
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
        <BoardFooter onClick={() => setShowModal(true)}>
          <span>New</span>
          <IoIosAdd />
        </BoardFooter>
      </TaskWrapper>
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

export default Board;
