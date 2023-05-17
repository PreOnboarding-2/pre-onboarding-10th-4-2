import React, { createContext, SetStateAction, useContext, useState } from "react";
import { Todo } from "../domain/Todo";
import todoRepository from "../infrastructure/TodoRepository";

type TodoContextType = {
  todos: Todo[];
  getTodos: () => Promise<void>;
  onCreateTodo: (title: string) => Promise<void>;
  onDeleteTodo: (
    id: string,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
};

const TodoContext = createContext<TodoContextType>({
  todos: [],
  getTodos: async () => {},
  onCreateTodo: async () => {},
  onDeleteTodo: async () => {},
});

interface TodoProviderProps {
  children: React.ReactNode;
}

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const repo = todoRepository;

  const getTodos = async () => {
    try {
      const data = await repo.getTodoList();
      setTodos(
        data.map(item => {
          return { id: item.id, title: item.title };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateTodo = async (title: string) => {
    try {
      const data = await repo.createTodo(title);
      setTodos(prev => [...prev, { id: data.id, title: data.title }]);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteTodo = async (
    id: string,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setIsLoading(true);
      await repo.deleteTodo(id);
      setIsLoading(false);
      setTodos(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Something went wrong.");
    }
  };

  const value = {
    todos,
    getTodos,
    onCreateTodo,
    onDeleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const useTodo = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodo };
