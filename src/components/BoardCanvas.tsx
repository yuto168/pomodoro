import { useState } from "react";
import Board from "./Board";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddAColumnModal } from "./ui-parts/DialogForAddColumn";
import { Draggable } from "./Draggable";
import { useTaskGroups } from "../hooks/useTaskGroups";
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
  overflow-x: auto;
`;

const BoardName = styled.span`
  font-weight: bold;
  margin: 5px;
  color: white;
`;

const BoardCanvas = () => {
  const [
    taskGroups,
    createTaskGroups,
    swapTaskGroups,
    tasks,
    createTask,
    swapTasks,
    deleteTask,
    editTask,
  ] = useTaskGroups();

  const [showModal, setShowModal] = useState(false);
  let index = 0;
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>
        <Wrapper>
          {taskGroups!.map((taskGroup, columnIndex) => {
            const groupedTask = tasks.filter(
              (item) => item.groupName === taskGroup.groupName
            );
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

export default BoardCanvas;