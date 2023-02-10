import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { TaskItem } from "src/typings/taskItem";
import { ITEM_TYPES } from "src/typings/itemTypes";

type Props = {
  index: number;
  createTask: (newTask: TaskItem, index: number) => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: string;
};

function DialogForAppend(props: Props) {
  const [newTaskName, setNewTaskName] = useState<string>("");

  const renderFooter = () => {
    return (
      <>
        <Button
          label="Ok"
          onClick={() => {
            // props.createTask(newTaskName, props.groupName);
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
    <Dialog
      modal={true}
      header="Add Task"
      visible={props.showModal}
      onHide={() => props.setShowModal(false)}
      position="center"
      appendTo="self"
      footer={renderFooter()}
    >
      {props.groupName}
      <AutoComplete
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.value)}
      />
    </Dialog>
  );
}

export default DialogForAppend;
