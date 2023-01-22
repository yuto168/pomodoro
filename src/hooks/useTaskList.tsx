import { useState, useEffect } from "react";
import { TaskItem } from "../typings/Task";
import { v4 as uuidv4 } from "uuid";

export function useTaskList() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [taskGroup, setTaskGroup] = useState<string[]>([]);

  const fetchTaskList = async () => {
    const result = await require("../data/task-data-copy.json");
    setTaskList(result.taskList);
    setTaskGroup(result.taskGroup);
  };

  const createTask = (newTaskName: string, groupName: string) => {
    const newTask = {
      id: uuidv4(),
      group: groupName,
      name: newTaskName,
    };
    setTaskList((prevState) => [...prevState, newTask]);
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  return {
    taskList,
    taskGroup,
    setTaskList,
    setTaskGroup,
    createTask,
  };
}
