import styled from "styled-components";

const BoardHeader = styled.div`
  font-size: 30px;
  margin-top: 0;
  text-align: center;
  color: white;
`;

export const Header: React.FC = () => {
  return (
    <BoardHeader>
      <h1>React Kanban</h1>
    </BoardHeader>
  );
};
