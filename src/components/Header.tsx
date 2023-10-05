import styled from "styled-components";
import { Session } from "@supabase/supabase-js";
import layouts from "src/constants/layouts";

export type Props = {
  session: Session | null;
  signOut: () => Promise<void>;
};

const BoardHeader = styled.div`
  margin-top: 0;
  color: white;
  height: 6em;
  display: flex;
  justify-content: space-between;
  padding: 2em;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 2em;
  display: block;
  text-align: center;
`;

const ButtonContents = styled.div`
  border: none;
  cursor: pointer;
  color: #ffffff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  min-width: ${layouts.boardWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header: React.FC<Props> = ({ session, signOut }) => {
  return (
    <BoardHeader>
      <Title>React Kanban*Pomodoro</Title>
      {session && (
        <ButtonContents
          onClick={() => {
            signOut();
          }}
        >
          <span>ログアウト</span>
        </ButtonContents>
      )}
    </BoardHeader>
  );
};
