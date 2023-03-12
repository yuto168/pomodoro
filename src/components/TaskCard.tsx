import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import { VscEdit } from "react-icons/vsc";
import DialogForEdit from "./ui-parts/EditTaskModal";
import { TaskItem } from "src/typings/taskItem";

type props = {
  task: TaskItem;
  deleteTask: (target: TaskItem) => void;
  editTask: (newTaskName: string, taskID: string) => void;
};

type CustomProps = {
  isDragging?: boolean;
};

const Edit = styled(VscEdit)``;

const IconGroup = styled.div`
  display: flex;
  cursor: pointer;
`;
const Item = styled.div<CustomProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0edf8;
  margin: 4%;
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
  cursor: move;
`;

function TaskCard(props: props) {
  const [showModal, setShowModal] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const ref = useRef<any>(null);

  const menuItem = [
    {
      label: "delete",
      command: () => {
        props.deleteTask(props.task);
      },
    },
    {
      label: "edit",
      command: () => {
        setShowModal(true);
      },
    },
  ];

  return (
    <>
      <ContextMenu model={menuItem} ref={ref}></ContextMenu>
      <Item
        onContextMenu={(e) => {
          if (ref.current != null) ref.current.show(e);
        }}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Contents>{props.task.contents}</Contents>

        {showIcon && (
          <IconGroup>
            <Edit
              onClick={() => {
                setShowModal(true);
              }}
            />
          </IconGroup>
        )}
      </Item>
      <DialogForEdit
        taskID={props.task.id}
        taskName={props.task.contents}
        showModal={showModal}
        setShowModal={setShowModal}
        editTask={props.editTask}
      ></DialogForEdit>
    </>
  );
}

export default TaskCard;
