import { useState, useRef } from "react";
import { TaskList } from "../typings/Task";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import { IoIosAdd } from "react-icons/io";
import DialogForAppend from "./ui-parts/DialogForAppend";

// boardはあくまでfilterされたlistを表示するのみにする
type props = {
  groupName: string;
  taskList: TaskList;
  createTask: (newTaskName: string, groupName: string) => void;
  deleteTask: (taskID: string) => void;
  editTask: (newTaskName: string, taskID: string) => void;
};

const BoardName = styled.span`
  margin: 5px;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid lightgray;
  justify-content: space-around;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  display: inline-flex;
`;

function Board(props: props) {
  const ref = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const taskConatainer = props.taskList.map((taskItem) => {
    return (
      <TaskItem
        key={taskItem.id}
        taskName={taskItem.name}
        taskID={taskItem.id}
        deleteTask={props.deleteTask}
        editTask={props.editTask}
        parentRef={ref}
      />
    );
  });

  return (
    <TaskWrapper>
      <BoardName>{props.groupName}</BoardName>
      {taskConatainer}
      <Button onClick={() => setShowModal(true)}>
        <IoIosAdd />
        <span>New </span>
      </Button>
      <DialogForAppend
        showModal={showModal}
        setShowModal={setShowModal}
        groupName={props.groupName}
        createTask={props.createTask}
      ></DialogForAppend>
    </TaskWrapper>
  );
}

export default Board;
