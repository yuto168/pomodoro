import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { GlassDialog } from "./GlassDialog";

export type Props = {
  showModal: boolean;
  updateShowModal: (showModal: boolean) => void;
  updateNewColumnName: (name: string) => void;
};

export const AddAColumnModal: React.FC<Props> = ({
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
    <GlassDialog
      modal={false}
      header="Add Column"
      visible={showModal}
      onHide={() => updateShowModal(false)}
      footer={renderFooter()}
    >
      <AutoComplete
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.value)}
      />
    </GlassDialog>
  );
};
