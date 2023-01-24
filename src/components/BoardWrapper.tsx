import Board from "./Board";
import styled from "styled-components";
import { useTaskList } from "../hooks/useTaskList";

const BoardContainer = styled.div`
  display: flex;
  background-color: #eee;
  justify-content: space-around;
  padding: 5px;
`;

function BoardWrapper() {
  const { taskList, taskGroup, createTask, deleteTask, editTask } =
    useTaskList();

  return (
    <BoardContainer>
      {taskGroup.map((groupName, index) => {
        const groupedTask = taskList.filter((task) => {
          return task.group === groupName;
        });
        return (
          <Board
            key={index}
            groupName={groupName}
            taskList={groupedTask}
            createTask={createTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        );
      })}
    </BoardContainer>
  );
}

export default BoardWrapper;
