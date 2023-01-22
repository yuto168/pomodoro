import React from "react";
import TaskItem from "./TaskItem";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";

type props = {
  taskLists: string[];
};

const TaskWrap = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  display: inline-flex;
`;

function TaskContainer(props: props) {
  const taskConatainer = props.taskLists.map((taskItem) => {
    return <TaskItem taskName={taskItem} />;
  });
  return (
    <>
      <TaskWrap>
        {taskConatainer}
        <Button>
          <IoIosAdd />
          <span>New </span>
        </Button>
      </TaskWrap>
    </>
    //     props.taskLists.map((taskItem) => {
    //     return <TaskItem taskName={taskItem} />
    //   })
  );
}

export default TaskContainer;
