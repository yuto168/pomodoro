import { FC, useState, useRef } from "react";
import styled from "styled-components";
import { TaskCard } from "./TaskCard";
import { IoIosAdd } from "react-icons/io";
import { DialogForAddTask } from "./ui-parts/DialogForAddTask";
import { useDrop } from "react-dnd";
import { Draggable } from "./Draggable";
import { DraggableItem, Card, Column, ITEM_TYPES } from "src/typings/taskItem";
import layouts from "src/constants/layouts";
import { ContextMenu } from "primereact/contextmenu";
import { GlassBoard } from "./ui-parts/GlassBoard";
import { EditColumnModal } from "src/components/ui-parts/DialogForEditColumn";

// boardはあくまでfilterされたlistを表示するのみにする
type Props = {
  isOver?: any;
  firstIndex: number;
  groupName: string;
  currentGroup: Column;
  taskList: Card[];
  createTask: (newTask: Card, index: number) => void;
  deleteTask: (target: Card) => void;
  editTask: (newTaskName: string, taskID: string) => void;
  swapTasks: (dragIndex: number, hoverIndex: number, groupName: string) => void;
  saveCurrnetTaskList: () => void;
  deleteColumn: (target: Column) => void;
  editColumn: (newGroupName: string, targetID: string) => void;
  setSelectedTask: (task: Card) => void;
  setActiveIndex: (index: number) => void;
};

const BoardFooter = styled.div`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  margin: 2px;
  padding-left: 0.3rem;
  height: ${layouts.boardFooterHeight}px;
  color: #ffffff;
  &:hover {
    backdrop-filter: blur(11px);
  }
`;

export const Board: FC<Props> = (props) => {
  const ref = useRef<any>(null);
  const menuItem = [
    {
      label: "delete columun",
      command: () => {
        props.deleteColumn(props.currentGroup);
      },
    },
    {
      label: "edit columun",
      command: () => {
        setShowEditColumnModal(true);
      },
    },
  ];

  const [_, drop] = useDrop(() => ({
    accept: ITEM_TYPES.card,
    hover(dragItem: DraggableItem) {
      if (dragItem.groupName === props.groupName) return;
      const dragIndex = dragItem.index;
      const targetIndex = props.firstIndex;

      props.swapTasks(dragIndex, targetIndex, props.groupName);
      dragItem.index = targetIndex;
      dragItem.groupName = props.groupName;
    },
  }));

  const [showEditColumnModal, setShowEditColumnModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ContextMenu model={menuItem} ref={ref} />
      <GlassBoard
        dropRef={drop}
        onContextMenu={(e) => {
          if (ref.current != null) ref.current.show(e);
        }}
      >
        {props.taskList.map((taskItem, i) => {
          return (
            <div key={taskItem.id}>
              <Draggable
                item={taskItem}
                index={props.firstIndex + i}
                swapItems={props.swapTasks}
                saveCurrnetTaskList={props.saveCurrnetTaskList}
              >
                <TaskCard
                  task={taskItem}
                  deleteTask={props.deleteTask}
                  editTask={props.editTask}
                  setSelectedTask={props.setSelectedTask}
                  setActiveIndex={props.setActiveIndex}
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
      <EditColumnModal
        showModal={showEditColumnModal}
        updateShowModal={setShowEditColumnModal}
        editTaskGroups={props.editColumn}
        targetID={props.currentGroup.id}
      ></EditColumnModal>
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
