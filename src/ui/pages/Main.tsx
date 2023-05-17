import { useEffect } from "react";
import "./Main.css";
import Header from "../components/common/Header";
import InputTodo from "../components/todo/InputTodo";
import TodoList from "../components/todo/TodoList";
import { useTodo } from "../../application/TodoProvider";

const Main = () => {
  const { getTodos } = useTodo();
  useEffect(() => {
    (async () => {
      await getTodos();
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default Main;
