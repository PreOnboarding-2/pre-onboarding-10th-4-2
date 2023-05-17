import React from "react";
//import { ImSpinner8 } from "react-icons/im";
import { BiSearch } from "react-icons/bi";
import "./InputTodo.css";
import { useEffect, useRef, useState } from "react";
import useFocus from "../../../application/useFocus";
import SuggestList from "../suggest/SuggestList";
import { blurInput } from "../../../utils";
import { useTodo } from "../../../application/TodoProvider";
import { useTodoSuggest } from "../../../application/TodoSuggestProvider";

const InputTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const { onCreateTodo } = useTodo();
  const { resetSuggestedTodos } = useTodoSuggest();
  //const [isTyping, setIsTyping] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { ref, setFocus } = useFocus();

  const handleBlur = ({ target }: Event) => {
    if ((target as HTMLElement).matches(".input-text")) return;
    //setIsTyping(false);
    ref.current?.blur();
    blurInput(ref, formRef);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onCreateTodo(inputValue);
    setInputValue("");
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    resetSuggestedTodos();
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setFocus();
    document.addEventListener("click", handleBlur);
  }, [setFocus]);

  return (
    <form className="form-container" onSubmit={handleSubmit} ref={formRef}>
      <BiSearch className="search-icon" />
      <div className="input-container">
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      {inputValue && <SuggestList currentQuery={inputValue} />}
    </form>
  );
};

export default InputTodo;
