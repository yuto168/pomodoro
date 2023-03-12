import { useRef, useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import { VscEdit } from "react-icons/vsc";
import DialogForEdit from "./ui-parts/DialogForEdit";
import { TaskItem } from "src/typings/taskItem";
import { GlassItem } from "./ui-parts/GlassItem";

type props = {
  task: TaskItem;
  deleteTask: (target: TaskItem) => void;
  editTask: (newTaskName: string, taskID: string) => void;
};

type CustomProps = {
  isDragging?: boolean;
};

const Item = styled(GlassItem)<CustomProps>`
  position: relative;
  box-shadow: none;
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
  cursor: move;
`;

const IconGroup = styled.div`
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const Edit = styled(VscEdit)`
  padding: 1%;
  font-size: 1.3rem;
  color: rgba(55, 53, 47, 0.65);
  &:hover {
    backdrop-filter: blur(5px);
  }
`;

const Contents = styled.span`
  color: white;
  overflow-wrap: anywhere;
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
