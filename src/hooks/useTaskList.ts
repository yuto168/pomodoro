import axios from "axios";
import { find } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { data, statusList } from "../mocks/data/data";
import { TaskItem } from "../typings/taskItem";
import { useState, useCallback, useEffect } from "react";

export const useTasks = (): [
  TaskItem[],
  (newTask: TaskItem, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (groupNames: string[]) => void,
  (target: TaskItem) => void,
  (newTaskName: string, targetID: string) => void
] => {
  const [tasks, setTasks] = useState<TaskItem[] | undefined>([
    // TODO:暫定的に初期値を設定。useEffectが解決次第対応
    {
      id: "2",
      groupName: "open",
      contents: "Purchase present",
      type: "card",
    },
  ]);

  /**
   * taskListの情報取得
   *
   */
  const fetchTaskList = async () => {
    const result = await axios.get("/tasklist");
    debugger;
    const data: TaskItem[] = result.data.task.list;
    setTasks(data);
  };

  // useEffect(() => {
  //   const initiate = async () => {
  //     await fetchTaskList();
  //   };
  //   initiate();
  // }, []);

  // TODO: api通信を行い、成功したタイミングでsetをかけるが望ましいため修正
  // useEffect(() => {
  //   axios.post("tasklist", {
  //     task: {
  //       list: taskList,
  //       group: taskGroup,
  //     },
  //   });
  // }, [taskList, taskGroup]);

  /** @type {*} */
  const createTask = useCallback(
    (newTask: TaskItem, index: number) => {
      setTasks((current) => {
        const newTasks = [...(current ?? [])];
        newTasks.splice(index, 0, newTask);
        return newTasks;
      });
    },
    [setTasks]
  );

  const swapTasks = useCallback(
    (dragIndex: number, hoverIndex: number, groupName: string) => {
      setTasks((current) => {
        if (!current) return;
        const item = current[dragIndex];
        if (!item) return;
        const newItems = current?.filter((_, idx) => idx !== dragIndex);
        newItems?.splice(hoverIndex, 0, { ...item, groupName });
        return newItems;
      });
    },
    [setTasks]
  );

  /**
   * 指定のタスクの名前を編集する
   *
   */
  const editTask = useCallback(
    (newTaskName: string, targetID: string) => {
      setTasks((prevState) => {
        return prevState!.map((taskItem) => {
          if (taskItem.id === targetID) {
            taskItem.contents = newTaskName;
          }
          return taskItem;
        });
      });
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (target: TaskItem) => {
      setTasks((current) => {
        if (!current) return;
        const items = current.filter((item) => {
          return item !== target;
        });
        return items;
      });
    },
    [setTasks]
  );

  const alignTasks = useCallback(
    (groupNames: string[]) => {
      setTasks((current) => {
        if (!current) return;
        const newTasks: TaskItem[] = [];
        groupNames.map((groupName) => {
          const grouped = current.filter((task) => {
            return task.groupName === groupName;
          });
          newTasks.push(...grouped);
        });
        return newTasks;
      });
    },
    [setTasks]
  );

  return [tasks ?? [], createTask, swapTasks, alignTasks, deleteTask, editTask];
};
