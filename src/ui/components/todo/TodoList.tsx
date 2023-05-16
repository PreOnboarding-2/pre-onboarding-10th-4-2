import React from "react";
import { SetStateAction } from "react";
import { Todo } from "../../../domain/Todo";
import TodoItem from "./TodoItem";
import "./TodoList.css";

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};

export default TodoList;
