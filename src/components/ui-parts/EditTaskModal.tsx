import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";

type Props = {
  taskID: string;
  taskName: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editTask: (newTaskName: string, groupName: string) => void;
};

function DialogForAppend(props: Props) {
  const [newTaskName, setNewTaskName] = useState<string>(props.taskName);

  const renderFooter = () => {
    return (
      <>
        <Button
          label="Ok"
          onClick={() => {
            props.editTask(newTaskName, props.taskID);
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
      <AutoComplete
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.value)}
      />
    </Dialog>
  );
}

export default DialogForAppend;
