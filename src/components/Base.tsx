import { BoardCanvas } from "src/components/BoardCanvas";
import { Header } from "src/components/Header";
import styled, { createGlobalStyle } from "styled-components";
import { FC } from "react";

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
  }
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Base: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header />
        <BoardCanvas />
      </Layout>
    </>
  );
};
