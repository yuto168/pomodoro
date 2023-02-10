import { useState } from "react";

export default function useAddColumnModal() {
  const [showModal, setShowModal] = useState(false);
  return { showModal, setShowModal };
}
