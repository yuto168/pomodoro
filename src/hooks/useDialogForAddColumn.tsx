import { useState } from "react";

export default function useDialogForAddColumn() {
  const [showModal, setShowModal] = useState(false);
  return { showModal, setShowModal };
}
