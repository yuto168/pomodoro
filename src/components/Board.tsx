import React from "react";
import { BoardItem } from "@/typings/Board";
import styled from "styled-components";
import TaskContainer from "./TaskContainer";

type props = {
  board: BoardItem;
};

// カードそれぞれで異なるタスクを持つ。カードのidとタスクを結びつける
// TODO: 画面の動作確認後、データを作りこむ。それまでは文字列のみでテスト
// それぞれのカードでstateとしてタスクを管理する。　stateの移動などはできるのだろうかねえ。
// const taskLists = ["hogehogehogehogehoge", "hugahuga", "hogehoge"];

const BoardName = styled.span`
  margin: 5px;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid lightgray;
  justify-content: space-around;
`;

function Card(props: props) {
  return (
    <TaskWrapper>
      <BoardName>{props.board.name}</BoardName>
      <TaskContainer taskLists={props.board.taskList} />
    </TaskWrapper>
  );
}

export default Card;
