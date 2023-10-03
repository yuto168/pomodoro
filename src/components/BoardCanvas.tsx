import { FC, useState } from "react";
import { Board } from "./Board";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddAColumnModal } from "./ui-parts/DialogForAddColumn";
import { Draggable } from "./Draggable";
import { useTasks } from "../hooks/useTasks";
import { AddColumnButton } from "./ui-parts/AddColumnButton";
import { TabView, TabPanel } from "primereact/tabview";
import { Pomodoro } from "src/components/Pomodoro";
import { History } from "src/components/History";

const BoardContainer = styled.div`
  background-color: transparent;
  position: relative;
  margin-left: 2%;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: inline-flex;
  justify-content: space-between;
  gap: 1rem;
  overflow-x: auto;
  margin-top: 2rem;
`;

const BoardName = styled.span`
  font-weight: bold;
  margin: 5px;
  color: white;
`;

const TabViewStyle = styled(TabView)`
  .p-tabview-panels,
  .p-tabview-nav-container,
  .p-tabview-nav-link,
  .p-tabview-nav {
    background-color: transparent !important;
    color: white !important;
  }
`;

export const BoardCanvas: FC = () => {
  const {
    error,
    taskGroups,
    createTaskGroups,
    swapTaskGroups,
    tasks,
    createTask,
    swapTasks,
    deleteTask,
    editTask,
    saveCurrnetTaskList,
    updateTaskTimer,
    deleteTaskGroup,
    editTaskGroup,
    selectedTask,
    setSelectedTask,
  } = useTasks();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  // 最初のタスクのindexを計算するため。
  let index = 0;
  return (
    <>
      {error ? (
        <div>error</div>
      ) : (
        <TabViewStyle
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Board">
            <DndProvider backend={HTML5Backend}>
              <BoardContainer>
                <Wrapper>
                  {taskGroups!.map((taskGroup, columnIndex) => {
                    const groupedTask = tasks.filter(
                      (item) => item.groupName === taskGroup.groupName
                    );

                    // カンバン毎に持つ最初のタスクのindex。
                    // 並び替え時にタスクの順番をカンバンをまたいで管理するため
                    const firstIndex = index;
                    index = index + groupedTask.length;
                    return (
                      <div key={taskGroup.groupName}>
                        <BoardName>{taskGroup.groupName}</BoardName>
                        <Draggable
                          item={taskGroup}
                          index={columnIndex}
                          swapItems={swapTaskGroups}
                          saveCurrnetTaskList={saveCurrnetTaskList}
                        >
                          <Board
                            firstIndex={firstIndex}
                            taskList={groupedTask}
                            groupName={taskGroup.groupName}
                            editTask={editTask}
                            deleteTask={deleteTask}
                            swapTasks={swapTasks}
                            createTask={createTask}
                            saveCurrnetTaskList={saveCurrnetTaskList}
                            currentGroup={taskGroup}
                            deleteColumn={deleteTaskGroup}
                            editColumn={editTaskGroup}
                            setSelectedTask={setSelectedTask}
                            setActiveIndex={setActiveIndex}
                          />
                        </Draggable>
                      </div>
                    );
                  })}
                  <AddColumnButton
                    updateShowModal={setShowAddColumnModal}
                  ></AddColumnButton>
                </Wrapper>
              </BoardContainer>
              <AddAColumnModal
                showModal={showAddColumnModal}
                updateShowModal={setShowAddColumnModal}
                createTaskGroups={createTaskGroups}
              ></AddAColumnModal>
            </DndProvider>
          </TabPanel>
          <TabPanel header="Pomodoro">
            <Pomodoro
              tasks={tasks}
              taskGroups={taskGroups}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              updateTaskTimer={updateTaskTimer}
            />
          </TabPanel>
          <TabPanel header="Focus History">
            <History tasks={tasks} />
          </TabPanel>
        </TabViewStyle>
      )}
    </>
  );
};
