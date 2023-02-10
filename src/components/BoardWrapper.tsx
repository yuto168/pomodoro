import Board from "./Board";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddAColumnModal } from "./ui-parts/AddColumnModal";
import { Draggable } from "./Draggable";
import { useTaskGroups } from "../hooks/useTaskGroups";
import { AddColumnButton } from "./ui-parts/AddColumnButton";
import useAddColumnModal from "src/hooks/useAddColumnModal";

const BoardContainer = styled.div`
  display: flex;
  background-color: #eee;
  justify-content: space-around;
  padding: 5px;
  overflow: auto;
`;

const BoardWrapper = () => {
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

  const { showModal, setShowModal } = useAddColumnModal();
  let index = 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>
        {taskGroups!.map((taskGroup, columnIndex) => {
          const groupedTask = tasks.filter(
            (item) => item.groupName === taskGroup.groupName
          );
          const firstIndex = index;
          index = index + groupedTask.length;
          return (
            <div key={taskGroup.groupName}>
              <h2>{taskGroup.groupName.toUpperCase()}</h2>
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
        <AddAColumnModal
          showModal={showModal}
          updateShowModal={setShowModal}
          updateNewColumnName={createTaskGroups}
        ></AddAColumnModal>
      </BoardContainer>
    </DndProvider>
  );
};

export default BoardWrapper;
