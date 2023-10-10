import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import { VscEdit } from "react-icons/vsc";
import { GiTomato } from "react-icons/gi";
import { DialogForEdit } from "./ui-parts/DialogForEdit";
import { Card } from "src/typings/taskItem";
import { GlassItem } from "./ui-parts/GlassItem";

type Props = {
  task: Card;
  deleteTask: (target: Card) => void;
  editTask: (newTaskName: string, taskID: string) => void;
  setSelectedTask: (task: Card) => void;
  setActiveIndex: (index: number) => void;
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
  font-size: 1.3rem;
  color: rgba(55, 53, 47, 0.65);
  border: solid 0.5px rgba(78, 77, 76, 0.65);
  border-radius: 5px;
  &:hover {
    backdrop-filter: blur(10px);
  }
`;

const PomodoroIcon = styled(GiTomato)`
  font-size: 1.3rem;
  color: rgba(236, 35, 69, 0.65);
  border-radius: 5px;
  &:hover {
    backdrop-filter: blur(5px);
  }
`;

const Contents = styled.span`
  color: white;
  overflow-wrap: anywhere;
`;

export const TaskCard: FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const ref = useRef<ContextMenu>(null);

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
            {/* icon押下時、タブを切り替え選択中のタスクを変更する */}
            <PomodoroIcon
              onClick={() => {
                props.setActiveIndex(1);
                props.setSelectedTask(props.task);
              }}
            />
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
};
