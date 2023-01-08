import React, { useState, useEffect } from "react";
import Board from "./Board";
import { Boards, BoardItem } from "@/typings/Board";
import styled from "styled-components";

const BoardContainer = styled.div`
  display: flex;
  background-color: #eee;
  justify-content: space-around;
  padding: 5px;
`;

function BoardWrapper() {
  const [boards, setBoards] = useState<Boards>([]);

  // TODO: APIモックを作ってaxiosを設定する。一旦はrequireで代用
  const fetchBoardsInfo = async () => {
    const result = await require("../data/task-data.json");
    setBoards(result.boards);
  };

  useEffect(() => {
    fetchBoardsInfo();
  }, []);

  return (
    <>
      <BoardContainer>
        {boards.map((board: BoardItem) => {
          return <Board key={board.id} board={board} />;
        })}
      </BoardContainer>
    </>
  );
}

export default BoardWrapper;
