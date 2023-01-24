import { useState, useEffect } from "react";
import { TaskItem, Task } from "../typings/Task";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export function useTaskList() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [taskGroup, setTaskGroup] = useState<string[]>([]);

  /**
   * taskListの情報を読み取る
   *
   */
  const fetchTaskList = async () => {
    const result = await axios.get("/tasklist");
    const data: Task = result.data;

    setTaskList(data.task.list);
    setTaskGroup(data.task.group);
  };

  /**
   * 新規タスク作成
   *
   * @param {string} newTaskName
   * @param {string} groupName
   */
  const createTask = (newTaskName: string, groupName: string) => {
    const newTask = {
      id: uuidv4(),
      group: groupName,
      name: newTaskName,
    };
    setTaskList((prevState) => [...prevState, newTask]);
  };
  /**
   * タスク削除
   *
   * @param {string} taskID
   */
  const deleteTask = (taskID: string) => {
    setTaskList(
      taskList.filter((taskItem: TaskItem) => {
        return taskID !== taskItem.id;
      })
    );
  };

  /**
   * 指定のタスクの名前を編集する
   *
   */
  const editTask = (newTaskName: string, taskID: string) => {
    setTaskList((prevState) => {
      return prevState.map((taskItem) => {
        if (taskItem.id === taskID) {
          taskItem.name = newTaskName;
        }
        return taskItem;
      });
    });
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  // TODO: api通信を行い、成功したタイミングでsetをかけるが望ましいため修正
  useEffect(() => {
    axios.post("tasklist", {
      task: {
        list: taskList,
        group: taskGroup,
      },
    });
  }, [taskList, taskGroup]);

  return {
    taskList,
    taskGroup,
    setTaskList,
    setTaskGroup,
    createTask,
    deleteTask,
    editTask,
  };
}
