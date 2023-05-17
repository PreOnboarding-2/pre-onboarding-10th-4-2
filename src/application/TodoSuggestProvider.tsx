import React, { createContext, SetStateAction, useContext, useState } from "react";
import todoRepository from "../infrastructure/TodoRepository";

type TodoSuggestContextType = {
  suggestedTodos: string[];
  getSuggestedTodos: (query: string, page: number) => Promise<void>;
  resetSuggestedTodos: () => void;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
};

const TodoSuggestContext = createContext<TodoSuggestContextType>({
  suggestedTodos: [],
  getSuggestedTodos: async () => {},
  resetSuggestedTodos: () => {},
  page: 1,
  setPage: () => {},
});

interface TodoSuggestProviderProps {
  children: React.ReactNode;
}

const TodoSuggestProvider = ({ children }: TodoSuggestProviderProps) => {
  const [suggestedTodos, setSuggestedTodos] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const repo = todoRepository;

  const getSuggestedTodos = async (query: string, page: number) => {
    try {
      if (query === "") {
        return;
      }
      const data = await repo.getTodoSearchList(query, page, 10);
      setSuggestedTodos(prev => [...prev, ...data.result]);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSuggestedTodos = () => {
    setSuggestedTodos([]);
    setPage(1);
  };
  const value = { suggestedTodos, getSuggestedTodos, resetSuggestedTodos, page, setPage };
  return <TodoSuggestContext.Provider value={value}>{children}</TodoSuggestContext.Provider>;
};

const useTodoSuggest = () => {
  return useContext(TodoSuggestContext);
};

export { TodoSuggestProvider, useTodoSuggest };
