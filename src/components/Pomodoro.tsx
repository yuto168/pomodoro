import { FC } from "react";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { Card } from "src/typings/taskItem";
import { Dropdown } from "primereact/dropdown";
import { useTimer } from "src/hooks/useTimer";
import { GlassItem } from "src/components/ui-parts/GlassItem";

type Props = {
  tasks: Card[];
  updateTaskTimer: (targetID: string, focusTime: number) => void;
  selectedTask: Card | null;
  setSelectedTask: (task: Card) => void;
};

const PlayButton = styled(AiFillPlayCircle)`
  font-size: 5em;
  background-color: transparent;
  color: white;
  border: 0;
  cursor: pointer;
`;

const PauseButton = styled(AiOutlinePauseCircle)`
  font-size: 5em;
  background-color: transparent;
  color: white;
  border: 0;
  cursor: pointer;
`;

const ResetButton = styled(VscDebugRestart)`
  font-size: 5em;
  color: white;
  border: 0;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TimerWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 400px;
  max-width: 500px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const Timer = styled.div`
  flex-grow: 2;
  font-size: 5rem;
`;

const TaskManager = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const TaskTitle = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;

const ModeText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ModeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Pomodoro: FC<Props> = ({
  tasks,
  selectedTask,
  setSelectedTask,
  updateTaskTimer,
}) => {
  const {
    mode,
    switchMode,
    minutes,
    isPaused,
    formattedSeconds,
    handlePause,
    handleStart,
    resetTimer,
  } = useTimer(selectedTask, updateTaskTimer);

  const grouped = tasks.reduce((acc: Record<string, Card[]>, taskItem) => {
    if (!acc[taskItem.groupName]) {
      acc[taskItem.groupName] = [];
    }
    acc[taskItem.groupName].push(taskItem);
    return acc;
  }, {});

  const groupByGroupName = Object.entries(grouped).map(
    ([groupName, items]) => ({
      groupName,
      items,
    })
  );

  return (
    <Wrapper>
      <TimerWrapper>
        <ModeWrapper>
          <GlassItem
            onClick={() => {
              handlePause();
              switchMode();
            }}
            isSelected={mode === "Focus"}
          >
            <ModeText>Focus</ModeText>
          </GlassItem>
          <GlassItem
            onClick={() => {
              handlePause();
              switchMode();
            }}
            isSelected={mode === "Break"}
          >
            <ModeText>Short Break</ModeText>
          </GlassItem>
        </ModeWrapper>
        <TaskManager>
          <TaskTitle>Focus on</TaskTitle>
          <Dropdown
            value={selectedTask?.id}
            options={groupByGroupName}
            onChange={(e) => {
              resetTimer();
              const selectedTask =
                tasks.find((task) => task.id === e.value) || null;
              if (selectedTask) setSelectedTask(selectedTask);
            }}
            optionLabel="contents"
            optionGroupLabel="groupName"
            optionGroupChildren="items"
            optionValue="id"
            placeholder="Select a Task"
          />
        </TaskManager>
        <Timer>
          <span>{`${minutes}:${formattedSeconds}`}</span>
        </Timer>
        <ButtonWrapper>
          {isPaused ? (
            <PlayButton onClick={handleStart} />
          ) : (
            <PauseButton
              onClick={() => {
                handlePause();
              }}
            />
          )}
          <ResetButton onClick={resetTimer} />
        </ButtonWrapper>
      </TimerWrapper>
    </Wrapper>
  );
};
