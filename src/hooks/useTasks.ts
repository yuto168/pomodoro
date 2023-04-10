import { useCallback, useState, useEffect } from "react";
import { ITEM_TYPES } from "src/typings/itemTypes";
import { TaskItem, RawTaskList } from "src/typings/taskItem";
import { v4 as uuidv4 } from "uuid";
import { useApiClient } from "src/api/useApiClient";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskGroups, setTaskGroups] = useState<TaskItem[]>([]);
  const { get, put, deleteItem } = useApiClient();

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

  const saveCurrentTasks = () => {
    saveTaskList(tasks);
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
   * 取得したデータからtaskとcolumnsの割振りを行う。
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
  const swapTaskGroups = useCallback((dragIndex: number, dropIndex: number) => {
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
  }, []);

  // 初回ローディング
  useEffect(() => {
    fetchTaskList();
  }, []);

  return {
    taskGroups,
    createTaskGroups,
    swapTaskGroups,
    tasks,
    createTask,
    swapTasks,
    deleteTask,
    editTask,
    saveCurrentTasks,
  };
};
