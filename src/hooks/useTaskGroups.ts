import { useCallback, useState, useEffect } from "react";
import { ITEM_TYPES } from "src/typings/itemTypes";
import { TaskItem, RawTaskList } from "src/typings/taskItem";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "./useTaskList";
import { useApiClient } from "src/api/useApiClient";

export const useTaskGroups = (): [
  TaskItem[],
  (newName: string) => void,
  (dragIndex: number, dropIndex: number) => void,
  TaskItem[],
  (newTask: TaskItem, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (target: TaskItem) => void,
  (newTaskName: string, targetID: string) => void
] => {
  const [taskGroups, setTaskGroups] = useState<TaskItem[]>([]);
  const {
    tasks,
    createTask,
    swapTasks,
    alignTasks,
    deleteTask,
    editTask,
    setTasks,
  } = useTasks();
  const { get } = useApiClient();

  /**
   * taskList取得API実行
   *
   */
  const fetchTaskList = async () => {
    const result = await get<RawTaskList>("/tasklist");
    const tasksAndGroups = distributeTasksToColumns(result.task);
    setTasks(tasksAndGroups.tasks);
    setTaskGroups(tasksAndGroups.groups);
  };

  /**
   * taskとcolumnsの割振りを行う。
   *
   * @param {TaskItem[]} taskList
   * @return {*}
   */
  const distributeTasksToColumns = (taskList: TaskItem[]) => {
    return taskList.reduce(
      (acc, current) => {
        if (current.type === "card") acc.tasks.push(current);
        else if (current.type === "column") acc.groups.push(current);
        return acc;
      },
      { tasks: [] as TaskItem[], groups: [] as TaskItem[] }
    );
  };

  // 初回ローディング
  useEffect(() => {
    fetchTaskList();
  }, []);

  /**
   * 新規タスクグループ作成
   * @param {string} newName
   *
   */
  const createTaskGroups = useCallback(
    (newName: string) => {
      setTaskGroups((current) => {
        const newTaskGroup = {
          id: uuidv4(),
          groupName: newName,
          contents: "",
          type: ITEM_TYPES.column,
        };
        return [...(current ?? []), newTaskGroup];
      });
    },
    [setTaskGroups]
  );

  /**
   * drag dropによるタスクグループの順番入れ替え
   * @param {number} dragIndex drag対象のグループのindex
   * @param {number} dropIndex drop対象のグループのindex
   *
   */
  const swapTaskGroups = useCallback(
    (dragIndex: number, dropIndex: number) => {
      setTaskGroups((current) => {
        const newTaskGroups = current.filter((_, index) => index !== dragIndex);
        newTaskGroups.splice(dropIndex, 0, { ...current[dragIndex] });

        // タスクグループの整列完了後、各タスクをそれぞれのグループに割り振る
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
