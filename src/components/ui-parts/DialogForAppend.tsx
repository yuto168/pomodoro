import { Dialog } from "primereact/dialog";
import { useState, useContext } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  groupName: string;
  createTask: (newTaskName: string, groupName: string) => void;
};

function DialogForAppend(props: Props) {
  console.log(props.groupName);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const renderFooter = () => {
    return (
      <>
        <Button
          label="Ok"
          onClick={() => {
            props.createTask(newTaskName, props.groupName);
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
