import React from "react";
import { useState, createContext } from "react";
import Board from "./Board";
import styled from "styled-components";
import { useTaskList } from "../hooks/useTaskList";

const BoardContainer = styled.div`
  display: flex;
  background-color: #eee;
  justify-content: space-around;
  padding: 5px;
`;

export const DialogContext = createContext(
  {} as {
    isDialogVisible: boolean;
    setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

function BoardWrapper() {
  const { taskList, taskGroup, createTask, deleteTask } = useTaskList();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ isDialogVisible, setIsDialogVisible }}>
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
            />
          );
        })}
      </BoardContainer>
    </DialogContext.Provider>
  );
}

export default BoardWrapper;
