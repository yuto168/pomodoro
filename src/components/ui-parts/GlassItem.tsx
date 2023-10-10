import styled from "styled-components";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onContextMenu?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
};

// グラスデザインのタスクアイテム
const ItemContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  backdrop-filter: blur(0.05px);
  margin: 2%;
  border-radius: 10px;
  border: solid rgba(255, 255, 255, 0.18);
  padding: 8px 10px 6px 6px;
  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.4);
  }
  background-color: ${(props) =>
    props.isSelected ? "rgba(255, 255, 255, 0.4)" : "transparent"};

  cursor: pointer;
`;

export const GlassItem: FC<Props> = (props) => {
  return (
    <ItemContainer
      onContextMenu={props.onContextMenu}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
      isSelected={props.isSelected}
    >
      {props.children}
    </ItemContainer>
  );
};
