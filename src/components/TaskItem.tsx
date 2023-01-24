import { useRef } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import { VscTrash } from "react-icons/vsc";

type props = {
  taskName: string;
  taskID: string;
  deleteTask: (taskID: string) => void;
  parentRef: React.MutableRefObject<any>;
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0edf8;
  margin: 2%;
`;

const Trash = styled(VscTrash)`
  cursor: pointer;
`;

function TaskItem(props: props) {
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
        <Trash
          onClick={() => {
            props.deleteTask(props.taskID);
          }}
        />
      </Item>
    </>
  );
}

export default TaskItem;
