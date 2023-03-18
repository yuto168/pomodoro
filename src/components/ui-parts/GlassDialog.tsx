import styled from "styled-components";
import { ReactNode } from "react";
import { Dialog } from "primereact/dialog";
import { DialogTemplateType } from "primereact/dialog";

type Props = {
  modal?: boolean;
  header?: string;
  visible?: boolean;
  onHide: () => void;
  footer?: DialogTemplateType;
  children: ReactNode;
};

// グラスデザインのダイアログ
const DialogWrapper = styled(Dialog)`
  .p-dialog,
  .p-dialog-header,
  .p-dialog-footer,
  .p-dialog-content {
    border: none;
    background-color: rgba(230, 199, 210, 0.369);
    backdrop-filter: blur(8px);
  }
  .p-dialog-title {
    color: aliceblue;
  }
`;

export const GlassDialog = ({
  modal,
  header,
  visible,
  onHide,
  footer,
  children,
}: Props) => {
  return (
    <DialogWrapper
      modal={modal}
      header={header}
      visible={visible}
      onHide={onHide}
      footer={footer}
    >
      {children}
    </DialogWrapper>
  );
};
