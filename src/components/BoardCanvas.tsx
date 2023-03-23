import { FC, useState } from "react";
import { Board } from "./Board";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddAColumnModal } from "./ui-parts/DialogForAddColumn";
import { Draggable } from "./Draggable";
import { useTasks } from "../hooks/useTasks";
import { AddColumnButton } from "./ui-parts/AddColumnButton";

const BoardContainer = styled.div`
  background-color: transparent;
  position: relative;
  margin-left: 2%;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: inline-flex;
  justify-content: space-between;
  overflow-x: auto;
`;

const BoardName = styled.span`
  font-weight: bold;
  margin: 5px;
  color: white;
`;

export const BoardCanvas: FC = () => {
  const {
    taskGroups,
    createTaskGroups,
    swapTaskGroups,
    tasks,
    createTask,
    swapTasks,
    deleteTask,
    editTask,
  } = useTasks();

  const [showModal, setShowModal] = useState(false);

  // 最初のタスクのindexを計算するため。
  let index = 0;
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>
        <Wrapper>
          {taskGroups!.map((taskGroup, columnIndex) => {
            const groupedTask = tasks.filter(
              (item) => item.groupName === taskGroup.groupName
            );

            // カンバン毎に持つ最初のタスクのindex。
            // 並び替え時にタスクの順番をカンバンをまたいで管理するため
            const firstIndex = index;
            index = index + groupedTask.length;
            return (
              <div key={taskGroup.groupName}>
                <BoardName>{taskGroup.groupName}</BoardName>
                <Draggable
                  item={taskGroup}
                  index={columnIndex}
                  swapItems={swapTaskGroups}
                >
                  <Board
                    firstIndex={firstIndex}
                    taskList={groupedTask}
                    groupName={taskGroup.groupName}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    swapTasks={swapTasks}
                    createTask={createTask}
                  />
                </Draggable>
              </div>
            );
          })}
          <AddColumnButton updateShowModal={setShowModal}></AddColumnButton>
        </Wrapper>
      </BoardContainer>
      <AddAColumnModal
        showModal={showModal}
        updateShowModal={setShowModal}
        updateNewColumnName={createTaskGroups}
      ></AddAColumnModal>
    </DndProvider>
  );
};
