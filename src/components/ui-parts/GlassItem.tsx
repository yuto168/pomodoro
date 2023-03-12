import styled from "styled-components";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onContextMenu?: (e: any) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const GlassItemContainer = styled.div`
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
`;

export const GlassItem = (props: Props) => {
  return (
    <GlassItemContainer
      onContextMenu={props.onContextMenu}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </GlassItemContainer>
  );
};
