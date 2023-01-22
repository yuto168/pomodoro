export type TaskItem = {
  id: string;
  name: string;
  group: string;
};

export type groupedList = TaskItem[];

export type TaskList = TaskItem[];

export type TaskGroup = string[];

export type Task = {
  task: {
    list: groupedList;
    group: TaskGroup;
  };
};
