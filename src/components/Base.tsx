import { BoardCanvas } from "src/components/BoardCanvas";
import { Header } from "src/components/Header";
import { Button } from "primereact/button";
import { useAuth } from "src/hooks/useAuth";
import styled, { createGlobalStyle } from "styled-components";
import { FC } from "react";
import { AiFillGithub } from "react-icons/ai";

const GlobalStyle = createGlobalStyle`
  html {
    width: auto;
  }
  body {
    margin: 0%;
    background: linear-gradient(111.86deg, rgba(71, 219, 252, 0.630208) 12.97%, rgba(81, 66, 255, 0.272461) 60.21%, rgba(230, 37, 234, 0.16085) 74.95%, rgba(182, 34, 25, 0) 96.19%), linear-gradient(180deg, #4931DD 0%, rgba(22, 17, 231, 0.630208) 0.01%, rgba(234, 0, 238, 0.272461) 56.77%, rgba(182, 34, 25, 0) 100%);
  /* 背景のグラデーションを固定するため */
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    padding: 1%;
  }
`;
const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Contents = styled.div`
  position: relative;
  margin-top: 2rem;
`;

// 画面上下左右中央に表示するためのボタン
const SinginButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  background-color: #272b33;
`;

const GitHubIcon = styled(AiFillGithub)`
  margin-right: 5px;
  font-size: 1.5em;
`;

export const Base: FC = () => {
  const { signInWithGithub, signOut, session } = useAuth();
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header session={session} signOut={signOut} />
        <Contents>{session ? <BoardCanvas /> : null}</Contents>
        {!session && (
          <>
            <SinginButton onClick={signInWithGithub}>
              <GitHubIcon />
              <span>GitHubでログイン</span>
            </SinginButton>
          </>
        )}
      </Layout>
    </>
  );
};
