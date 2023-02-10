import { TaskItem } from "../../typings/taskItem";

const data: TaskItem[] = [
  {
    id: "1",
    // icon: "⭕️",
    groupName: "open",
    contents: "Human Interest Form",
    type: "card",
    // content: "Fill out human interest distribution form",
  },
  {
    id: "2",
    // icon: "⭕️",
    groupName: "open",
    contents: "Purchase present",
    type: "card",

    // content: "Get an anniversary gift",
  },
  {
    id: "3",
    // icon: "⭕️",
    groupName: "open",
    contents: "Invest in investments",
    type: "card",

    // content: "Call the bank to talk about investments",
  },
  {
    id: "4",
    // icon: "⭕️",
    groupName: "open",
    contents: "Daily reading",
    type: "card",

    // content: "Finish reading Intro to UI/UX",
  },
];

const statusList = [
  {
    status: "open",
    icon: "⭕️",
    color: "#EB5A46",
  },
  {
    status: "in progress",
    icon: "🔆️",
    color: "#00C2E0",
  },
  {
    status: "in review",
    icon: "📝",
    color: "#C377E0",
  },
  {
    status: "done",
    icon: "✅",
    color: "#3981DE",
  },
];

export { data, statusList };
