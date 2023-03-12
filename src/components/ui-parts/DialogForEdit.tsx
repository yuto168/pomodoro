import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { GlassDialog } from "./GlassDialog";

type Props = {
  taskID: string;
  taskName: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editTask: (newTaskName: string, groupName: string) => void;
};

function DialogForEdit(props: Props) {
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
    <GlassDialog
      modal={false}
      header="Edit Task"
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
}

export default DialogForEdit;
