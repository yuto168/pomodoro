import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { GlassDialog } from "./GlassDialog";

export type Props = {
  showModal: boolean;
  updateShowModal: (showModal: boolean) => void;
  editTaskGroups: (newColumnName: string, targetID: string) => void;
  targetID: string;
};

export const EditColumnModal: React.FC<Props> = ({
  showModal,
  updateShowModal,
  editTaskGroups,
  targetID,
}) => {
  const [newColumnName, setNewColumnName] = useState("");

  const handleOnSubmit = () => {
    if (!newColumnName) return;
    editTaskGroups(newColumnName, targetID);
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
      header="Edit Column"
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
