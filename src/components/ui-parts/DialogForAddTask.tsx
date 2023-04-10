import { useState, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { TaskItem } from "src/typings/taskItem";
import { ITEM_TYPES } from "src/typings/itemTypes";
import { GlassDialog } from "./GlassDialog";

type Props = {
  index: number;
  createTask: (newTask: TaskItem, index: number) => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: string;
};

export const DialogForAddTask: FC<Props> = (props) => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const renderFooter = () => {
    return (
      <>
        <Button
          label="Ok"
          onClick={() => {
            props.createTask(
              {
                id: uuidv4(),
                groupName: props.groupName,
                contents: newTaskName,
                type: ITEM_TYPES.card,
              },
              props.index
            );
            props.setShowModal(false);
            setNewTaskName("");
          }}
        ></Button>
        <Button
          label="No"
          onClick={() => {
            props.setShowModal(false);
            setNewTaskName("");
          }}
        ></Button>
      </>
    );
  };
  return (
    <GlassDialog
      modal={false}
      header="Add Task"
      visible={props.showModal}
      onHide={() => props.setShowModal(false)}
      footer={renderFooter()}
    >
      <AutoComplete
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.value)}
      />
    </GlassDialog>
  );
};
