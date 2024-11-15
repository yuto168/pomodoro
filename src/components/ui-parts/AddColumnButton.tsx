import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";
import layouts from "src/constants/layouts";

type Props = {
  updateShowModal: (showModal: boolean) => void;
};

const ButtonWrapper = styled.div``;

const ButtonContents = styled.div`
  border: none;
  cursor: pointer;
  color: #ffffff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  min-width: ${layouts.boardWidth}px;
`;

export const AddColumnButton: React.FC<Props> = ({ updateShowModal }) => {
  return (
    <ButtonWrapper>
      <ButtonContents
        onClick={() => {
          updateShowModal(true);
        }}
      >
        <IoIosAdd />
        <span>Add Column</span>
      </ButtonContents>
    </ButtonWrapper>
  );
};
