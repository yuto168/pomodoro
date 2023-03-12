import BoardCanvas from "./components/BoardCanvas";
import { Header } from "./components/ui-parts/Header";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: auto;
  }
  body {
    margin: 0%;
    background: linear-gradient(
    107.54deg,
    #12c2e9 0.88%,
    #2fb5ea 7.72%,
    #6ca4fc 22.18%,
    #c471ed 51.57%,
    #d875d6 63.68%,
    #ff7daa 87.09%,
    #eebbbe 105.05%
  );
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

function Base() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header />
        <BoardCanvas />
      </Layout>
    </>
  );
}

export default Base;
