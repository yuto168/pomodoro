import { useCallback, useState } from "react";
import { ITEM_TYPES } from "src/typings/itemTypes";
import { TaskItem } from "../typings/taskItem";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "./useTaskList";

export const useTaskGroups = (): [
  TaskItem[],
  (name: string) => void,
  (indexI: number, indexJ: number) => void,
  TaskItem[],
  (newTask: TaskItem, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (target: TaskItem) => void,
  (newTaskName: string, targetID: string) => void
] => {
  const [taskGroups, setTaskGroups] = useState<TaskItem[] | undefined>([
    {
      id: "1",
      groupName: "open",
      contents: "Human Interest Form",
      type: "column",
    },
    {
      id: "1",
      groupName: "done",
      contents: "Human Interest Form",
      type: "column",
    },
  ]);
  const [tasks, createTask, swapTasks, alignTasks, deleteTask, editTask] =
    useTasks();

  const createTaskGroups = useCallback(
    (name: string) => {
      setTaskGroups((current) => {
        const newTaskGroup = {
          id: uuidv4(),
          groupName: name,
          contents: "",
          type: ITEM_TYPES.column,
        };
        return [...(current ?? []), newTaskGroup];
      });
    },
    [setTaskGroups]
  );

  const swapTaskGroups = useCallback(
    (indexI: number, indexJ: number) => {
      setTaskGroups((current) => {
        if (!current) return;
        const newTaskGroups = current.filter((_, index) => index !== indexI);
        newTaskGroups.splice(indexJ, 0, { ...current[indexI] });
        alignTasks(
          newTaskGroups.map((taskGroup) => {
            return taskGroup.groupName;
          })
        );
        return [...newTaskGroups];
      });
    },
    [alignTasks, setTaskGroups]
  );

  return [
    taskGroups ?? [],
    createTaskGroups,
    swapTaskGroups,
    tasks ?? [],
    createTask,
    swapTasks,
    deleteTask,
    editTask,
  ];
};