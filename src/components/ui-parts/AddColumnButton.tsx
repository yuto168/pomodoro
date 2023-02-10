import { IoIosAdd } from "react-icons/io";

type AddColumnButtonProps = {
  updateShowModal: (showModal: boolean) => void;
};

export const AddColumnButton: React.FC<AddColumnButtonProps> = ({
  updateShowModal,
}) => {
  return (
    <button
      onClick={() => {
        updateShowModal(true);
      }}
    >
      <div>
        <IoIosAdd />
        <span>Add column</span>
      </div>
    </button>
  );
};
