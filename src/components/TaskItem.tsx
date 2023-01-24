import React, { useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import DialogForEdit from "./ui-parts/DialogForEdit";

type props = {
  taskName: string;
  taskID: string;
  deleteTask: (taskID: string) => void;
  editTask: (newTaskName: string, taskID: string) => void;
  parentRef: React.MutableRefObject<any>;
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0edf8;
  margin: 2%;
`;

const Trash = styled(VscTrash)``;
const Edit = styled(VscEdit)``;

const IconGroup = styled.div`
  display: flex;
  cursor: pointer;
`;

function TaskItem(props: props) {
  const [showModal, setShowModal] = useState(false);
  const menuItem = [
    {
      label: "delete",
      command: () => {
        props.deleteTask(props.taskID);
      },
    },
  ];

  return (
    <>
      <ContextMenu model={menuItem} ref={props.parentRef}></ContextMenu>
      <Item
        onContextMenu={(e) => {
          if (props.parentRef.current != null) props.parentRef.current.show(e);
        }}
      >
        {props.taskName}
        <IconGroup>
          <Trash
            onClick={() => {
              props.deleteTask(props.taskID);
            }}
          />
          <Edit
            onClick={() => {
              setShowModal(true);
            }}
          />
        </IconGroup>
      </Item>
      <DialogForEdit
        taskID={props.taskID}
        taskName={props.taskName}
        showModal={showModal}
        setShowModal={setShowModal}
        editTask={props.editTask}
      ></DialogForEdit>
    </>
  );
}

export default TaskItem;
