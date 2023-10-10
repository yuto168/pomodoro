import styled from "styled-components";
import { FC, ReactNode } from "react";
import layouts from "src/constants/layouts";
import { ConnectDropTarget } from "react-dnd";

type Props = {
  children: ReactNode;
  dropRef: ConnectDropTarget;
  onContextMenu?: (e: React.MouseEvent) => void;
};

// グラスデザインのカンバン
const BoardContainer = styled.div`
  position: relative;
  padding: 2%;
  display: flex;
  flex-flow: column;
  justify-content: start;
  margin: 5px;
  min-height: ${layouts.boardMinHeight}px;
  width: ${layouts.boardWidth}px;
  cursor: pointer;
  box-sizing: border-box;
  background: radial-gradient(
    250.11% 236.72% at 59.77% 49.61%,
    rgba(217, 217, 217, 0) 0%,
    rgba(217, 217, 217, 0.120265) 0.01%,
    rgba(217, 217, 217, 0.78) 53.13%
  );
  backdrop-filter: blur(11px);
  border: 0.5px solid #ffffff;
  border-radius: 24px 16px 16px 16px;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
`;

export const GlassBoard: FC<Props> = (props) => {
  return (
    <BoardContainer ref={props.dropRef} onContextMenu={props.onContextMenu}>
      {props.children}
    </BoardContainer>
  );
};
