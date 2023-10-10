import styled from "styled-components";
import { Session } from "@supabase/supabase-js";
import layouts from "src/constants/layouts";
import { FiLogOut } from "react-icons/fi";

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

// PC画面のログアウトボタン
const LogoutPc = styled.div`
  border: none;
  cursor: pointer;
  color: #ffffff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  min-width: ${layouts.boardWidth}px;
  display: flex;
  justify-content: center;
  gap: 0.3em;
  align-items: center;

  /* スマホの場合ボタンを表示しない */
  @media (max-width: 600px) {
    display: none;
  }
`;

//　スマホ画面のログアウトボタン
const LogoutSp = styled(FiLogOut)`
  display: none;
  @media (max-width: 600px) {
    display: block;
    font-size: 2.5em;
    position: absolute;
    right: 1.3rem;
    top: 0%.5;
    z-index: 1000;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const Header: React.FC<Props> = ({ session, signOut }) => {
  return (
    <BoardHeader>
      <Title>React Kanban*Pomodoro</Title>
      {session && (
        <>
          <LogoutPc
            onClick={() => {
              signOut();
            }}
          >
            <FiLogOut />
            <span>ログアウト</span>
          </LogoutPc>
          <LogoutSp
            onClick={() => {
              signOut();
            }}
          ></LogoutSp>
        </>
      )}
    </BoardHeader>
  );
};
