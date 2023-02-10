import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export type AddColumnModalProps = {
  showModal: boolean;
  updateShowModal: (showModal: boolean) => void;
  updateNewColumnName: (name: string) => void;
};

export const AddAColumnModal: React.FC<AddColumnModalProps> = ({
  showModal,
  updateShowModal,
  updateNewColumnName,
}) => {
  const [newColumnName, setNewColumnName] = useState("");

  const handleOnSubmit = () => {
    if (!newColumnName) return;
    updateNewColumnName(newColumnName);
    updateShowModal(false);
    setNewColumnName("");
  };

  const closeModal = () => {
    updateShowModal(false);
    setNewColumnName("");
  };
  const renderFooter = () => {
    return (
      <>
        <Button label="Ok" onClick={() => handleOnSubmit()}></Button>
        <Button label="No" onClick={() => closeModal()}></Button>
      </>
    );
  };

  return (
    <Dialog
      modal={true}
      header="Add Column"
      visible={showModal}
      onHide={() => updateShowModal(false)}
      position="center"
      appendTo="self"
      footer={renderFooter()}
    >
      <AutoComplete
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.value)}
      />
    </Dialog>
  );
};
