import { FC } from "react";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { Card } from "src/typings/taskItem";
import { GiTomato } from "react-icons/gi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type Props = {
  tasks: Card[];
};

const PomodoroIcon = styled(GiTomato)`
  font-size: 1em;
  color: red;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const StyledDataTable = styled(DataTable)`
  .p-datatable .p-datatable-tbody .p-datatable-thead {
    background-color: red !important;
  }
`;

export const History: FC<Props> = ({ tasks }) => {
  //ポモドーロの数を計算する関数
  const totalPomodoro = (task: Card) => {
    const pomodoro = task.focusTime / (60 * 25); //1ポモドーロ25分;
    const pomodoroArray = [];

    for (let i = 1; i <= pomodoro; i++) {
      pomodoroArray.push(<PomodoroIcon key={i} />);
    }
    return pomodoroArray;
  };

  const formattedFocusTime = (task: Card) => {
    const minutes = Math.floor(task.focusTime / 60);
    return <span>{minutes}</span>;
  };

  return (
    <Wrapper>
      <StyledDataTable value={tasks} tableStyle={{ minWidth: "50rem" }}>
        <Column field="groupName" sortable header="Category"></Column>
        <Column field="contents" header="Task"></Column>
        <Column
          field="focusTime"
          sortable
          body={formattedFocusTime}
          header="Focused Time(min)"
        ></Column>
        <Column
          field="focusTime"
          body={totalPomodoro}
          sortable
          header="Total Pomodoros"
        ></Column>
      </StyledDataTable>
    </Wrapper>
  );
};
