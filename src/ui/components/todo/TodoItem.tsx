import React, { useState } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { MouseEvent, useCallback } from "react";
import "./TodoItem.css";
import { useTodo } from "../../../application/TodoProvider";

type TodoItemProps = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { onDeleteTodo } = useTodo();

  const handleRemoveTodo = useCallback(async () => {
    await onDeleteTodo(id, setIsLoading);
  }, [id, setIsLoading]);

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest(".item-option")) alert(title);
  };

  return (
    <li className="item" onClick={clickHandler}>
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={handleRemoveTodo}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
