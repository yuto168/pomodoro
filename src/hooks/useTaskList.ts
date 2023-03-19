import { TaskItem } from "../typings/taskItem";
import { useState, useCallback } from "react";
import { useApiClient } from "src/api/useApiClient";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const { put, deleteItem } = useApiClient();

  /**
   * 新規タスクの追加
   * @param {TaskItem} newTask
   * @param {number} index
   * @return {*}
   */
  const createTask = useCallback((newTask: TaskItem, index: number) => {
    setTasks((current) => {
      const newTasks = [...(current ?? [])];
      newTasks.splice(index, 0, newTask);
      saveTaskList(newTasks);
      return newTasks;
    });
  }, []);

  /**
   * drag dropによるタスクの移動
   * @param {number} dragIndex drag対象のタスクのindex
   * @param {number} hoverIndex drop対象のタスクのindex
   * @param {string} groupName 移動対象のグループ名
   *
   */
  const swapTasks = useCallback(
    (dragIndex: number, hoverIndex: number, groupName: string) => {
      setTasks((current) => {
        const item = current[dragIndex];
        if (!item) return current;

        // 一旦drag対象のタスク以外の配列を作成し、
        // drag対象のタスクをdrop先のindexへ挿入する。
        const newItems = current.filter((_, index) => index !== dragIndex);
        newItems.splice(hoverIndex, 0, { ...item, groupName });
        return newItems ? newItems : current;
      });
    },
    []
  );

  /**
   * 指定のタスクの名前を編集する
   *　@param {string} newTaskName 新タスク名
   *　@param {string} targetID 編集対象のタスクのID
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

  /**
   * 指定のタスクの削除
   *　@param {string} targetID 削除対象のタスクのID
   *
   */
  const deleteTask = useCallback((target: TaskItem) => {
    setTasks((current) => {
      const items = current.filter((item) => {
        return item.id !== target.id;
      });
      return items;
    });
    deleteSelectedTask(target.id);
  }, []);

  /**
   * 各タスクをそれぞれのグループに割り振る
   * @param {string} groupNames タスクグループ名の配列
   *
   */
  const alignTasks = useCallback((groupNames: string[]) => {
    setTasks((current) => {
      const newTasks: TaskItem[] = [];
      groupNames.forEach((groupName) => {
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
   * @param {TaskItem[]} tasks 変更後のtaskList
   *
   */
  const saveTaskList = async (tasks: TaskItem[]) => {
    const result = await put<TaskItem[]>("/taskList", tasks);
    setTasks(result.data);
  };

  /**
   *　taskList削除API実行
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
