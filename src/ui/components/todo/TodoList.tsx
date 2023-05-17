import React from "react";
import { useTodo } from "../../../application/TodoProvider";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const { todos } = useTodo();

  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};

export default TodoList;
