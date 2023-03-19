import { TaskItem } from "../typings/taskItem";
import { useState, useCallback } from "react";
import { useApiClient } from "src/api/useApiClient";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const { put, post, deleteItem } = useApiClient();

  const createTask = useCallback((newTask: TaskItem, index: number) => {
    setTasks((current) => {
      const newTasks = [...(current ?? [])];
      newTasks.splice(index, 0, newTask);
      saveTaskList(newTasks);
      return newTasks;
    });
  }, []);

  const swapTasks = useCallback(
    (dragIndex: number, hoverIndex: number, groupName: string) => {
      setTasks((current) => {
        const item = current[dragIndex];
        if (!item) return current;
        const newItems = current?.filter((_, idx) => idx !== dragIndex);
        newItems?.splice(hoverIndex, 0, { ...item, groupName });
        return newItems ? newItems : current;
      });
    },
    []
  );

  /**
   * 指定のタスクの名前を編集する
   *
   */
  const editTask = useCallback((newTaskName: string, targetID: string) => {
    setTasks((prevState) => {
      const newTaskList = prevState!.map((taskItem) => {
        if (taskItem.id === targetID) {
          taskItem.contents = newTaskName;
        }
        return taskItem;
      });
      saveTaskList(newTaskList);
      return newTaskList;
    });
  }, []);

  const deleteTask = useCallback((target: TaskItem) => {
    setTasks((current) => {
      const items = current.filter((item) => {
        return item.id !== target.id;
      });
      return items;
    });
    deleteSelectedTask(target.id);
  }, []);

  const alignTasks = useCallback((groupNames: string[]) => {
    setTasks((current) => {
      const newTasks: TaskItem[] = [];
      groupNames.map((groupName) => {
        const grouped = current.filter((task) => {
          return task.groupName === groupName;
        });
        newTasks.push(...grouped);
      });
      return newTasks;
    });
  }, []);

  /**
   * taskList更新API実行
   *
   */
  const saveTaskList = async (tasks: TaskItem[]) => {
    const result = await put<TaskItem[]>("/taskList", tasks);
    setTasks(result.data);
  };

  /**
   *　taskList削除API実行
   *
   * @param {string} taskID 削除対象のtaskのID
   */
  const deleteSelectedTask = async (taskID: string) => {
    await deleteItem("/taskList", {
      TaskId: taskID,
    });
  };

  return {
    tasks,
    createTask,
    swapTasks,
    alignTasks,
    deleteTask,
    editTask,
    setTasks,
  };
};
