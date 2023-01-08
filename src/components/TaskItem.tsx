import styled from "styled-components";

type props = {
  taskName: string;
};

const Item = styled.div`
  display: block;
  background-color: #e0edf8;
  margin: 2%;
`;

function TaskItem(props: props) {
  return <Item>{props.taskName}</Item>;
}

export default TaskItem;
