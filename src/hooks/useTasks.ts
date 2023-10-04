import { useCallback, useState, useEffect } from "react";
import { ITEM_TYPES } from "src/typings/taskItem";
import { TaskItem, TaskItemFromAPI } from "src/typings/taskItem";
import { v4 as uuidv4 } from "uuid";
import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "src/constants/supabase";
import { useAuth } from "src/hooks/useAuth";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [taskGroups, setTaskGroups] = useState<TaskItem[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { userID } = useAuth();

  /**
   * newTaskとtaskGroupを結合して、DB登録用のデータを作成して返す
   *
   * @param {TaskItem[]} newTasks : 更新後のtaskList
   * @return {*}
   */
  const createPostData = useCallback(
    (newTasks: TaskItem[], newTaskGroup: TaskItem[]) => {
      const postData = { task: newTasks, column: newTaskGroup };
      return postData;
    },
    []
  );
  /**
   * taskList更新API実行
   * @param {TaskItem[]} tasks 変更後のtaskList
   *
   */
  const saveTaskList = useCallback(
    async (newTasks: TaskItem[], newTaskGroup: TaskItem[]) => {
      // DB登録用のデータを作成
      const postData = createPostData(newTasks, newTaskGroup);

      const { error } = await supabase
        .from("gitusers")
        .update({ task_json: postData })
        .eq("id", userID);
      if (error) setError(error);
    },
    [userID, createPostData, setError]
  );

  /**
   * 現在のtaskListをDBに保存。drag dropによるタスクの移動時に使用
   *
   */
  const saveCurrnetTaskList = useCallback(async () => {
    saveTaskList(tasks, taskGroups);
  }, [saveTaskList, tasks, taskGroups]);

  /**
   * 新規タスクの追加
   * @param {TaskItem} newTask
   * @param {number} index
   * @return {*}
   */
  const createTask = useCallback(
    (newTask: TaskItem, index: number) => {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks.splice(index, 0, newTask);

        //　選択状態のタスクが存在しない場合は、新規タスクを選択状態にする
        if (!selectedTask) setSelectedTask(newTask);

        saveTaskList(newTasks, taskGroups);
        return newTasks;
      });
    },
    [setTasks, saveTaskList, taskGroups, selectedTask]
  );

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
        const dragItem = current[dragIndex];
        if (!dragItem) return current;

        // 一旦drag対象のタスク以外の配列を作成し、
        // drag対象のタスクをdrop先のindexへ挿入する。
        const newItems = current.filter((_, index) => index !== dragIndex);
        newItems.splice(hoverIndex, 0, { ...dragItem, groupName });
        return newItems ? newItems : current;
      });
    },
    []
  );

  // タスクのタイマーを更新する
  const updateTaskTimer = useCallback(
    (targetID: string, focusTime: number) => {
      setTasks((current) => {
        const newTasks = current.map((taskItem) => {
          if (taskItem.id === targetID) {
            taskItem.focusTime += focusTime;
          }
          return taskItem;
        });
        saveTaskList(newTasks, taskGroups);
        return newTasks;
      });
    },
    [saveTaskList, taskGroups]
  );

  /**
   * 指定のタスクの名前を編集する
   *　@param {string} newTaskName 新タスク名
   *　@param {string} targetID 編集対象のタスクのID
   *
   */
  const editTask = useCallback(
    (newTaskName: string, targetID: string) => {
      setTasks((current) => {
        const newTasks = current.map((taskItem) => {
          if (taskItem.id === targetID) {
            taskItem.contents = newTaskName;
          }
          return taskItem;
        });
        saveTaskList(newTasks, taskGroups);
        return newTasks;
      });
    },
    [saveTaskList, taskGroups]
  );

  /**
   * 指定のタスクの削除
   *　@param {string} targetID 削除対象のタスクのID
   *
   */
  const deleteTask = useCallback(
    (target: TaskItem) => {
      setTasks((current) => {
        const newTasks = current.filter((item) => {
          return item.id !== target.id;
        });
        // 削除対象のタスクが選択状態であれば、別のタスクを選択状態にする
        if (selectedTask?.id === target.id) {
          // 他にもタスクがあれば、最初のタスクを選択状態にする
          if (newTasks.length > 0) setSelectedTask(newTasks[0]);
        }
        saveTaskList(newTasks, taskGroups);
        return newTasks;
      });
    },
    [saveTaskList, taskGroups, selectedTask]
  );

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
          focusTime: 0,
        };
        const newGroups = [...current, newTaskGroup];
        saveTaskList(tasks, newGroups);
        return newGroups;
      });
    },
    [setTaskGroups, saveTaskList, tasks]
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
    [alignTasks]
  );

  // 指定したtaskGroupの消去。同じgroupNameのタスクも消去する
  const deleteTaskGroup = useCallback(
    (target: TaskItem) => {
      let newTaskGroups = taskGroups.filter((item) => {
        return item.id !== target.id;
      });

      let newTasks = tasks.filter((item) => {
        return item.groupName !== target.groupName;
      });

      // 削除対象のタスクが選択状態であれば、別のタスクを選択状態にする
      if (selectedTask?.groupName === target.groupName) {
        // 他にもタスクがあれば、最初のタスクを選択状態にする
        if (newTasks.length > 0) setSelectedTask(newTasks[0]);
      }

      setTaskGroups(newTaskGroups);
      setTasks(newTasks);

      saveTaskList(newTasks, newTaskGroups);
    },
    [saveTaskList, taskGroups, tasks, selectedTask]
  );

  // groupの名前を編集する
  const editTaskGroup = useCallback(
    (newGroupName: string, targetID: string) => {
      setTaskGroups((current) => {
        // 変更対象のタスクグループの名前を取得
        const targetGroupName = current.find((taskGroup) => {
          return taskGroup.id === targetID;
        })?.groupName;

        // 名前を変更し、前の名前のタスクを新しいカラムのタスクに変更する
        const newTaskGroups = current.map((taskGroup) =>
          taskGroup.id === targetID
            ? { ...taskGroup, groupName: newGroupName }
            : taskGroup
        );

        // 変更対象のタスクグループに属するタスクのgroupNameを変更する
        const newTasks = tasks.map((task) =>
          task.groupName === targetGroupName
            ? { ...task, groupName: newGroupName }
            : task
        );
        setTasks(newTasks);
        saveTaskList(newTasks, newTaskGroups);
        return newTaskGroups;
      });
    },
    [saveTaskList, tasks]
  );

  /**
   * taskList取得API
   *
   */
  const fetchTaskList = async () => {
    // supabaseのrlsでログインIDと一致するテーブルを取得するように設定している
    const { data, error } = await supabase.from("gitusers").select("task_json");
    if (error) {
      setError(error);
      return;
    }
    const tasklist = data[0].task_json as TaskItemFromAPI;

    // taskが一つでもあれば、最初のタスクを選択状態にする
    if (tasklist.task.length > 0) setSelectedTask(tasklist.task[0]);
    setTasks(tasklist.task);
    setTaskGroups(tasklist.column);
  };

  // 初回ローディング
  useEffect(() => {
    fetchTaskList();
  }, []);

  return {
    error,
    setError,
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
  };
};
