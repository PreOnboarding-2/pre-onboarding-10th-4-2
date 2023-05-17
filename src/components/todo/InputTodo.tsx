import { ImSpinner8 } from "react-icons/im";
import { BiSearch } from "react-icons/bi";
import "./InputTodo.css";
import { useEffect, useRef, useState } from "react";
import useFocus from "../../hooks/todo/useFocus";
import { InputTodoProps } from "../../types/todo";
import { SuggestList } from "../suggest/SuggestList";
import useSearch from "../../hooks/search/useSearch";
import usePost from "../../hooks/todo/usePost";
import { blurInput } from "../../utils";
import { PARAM_OBJ } from "../../constants";
import useScroll from "../../hooks/search/useScroll";

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestList, setSuggestList] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const params = useRef(PARAM_OBJ);
  const isMore = useRef<boolean>(false);

  const { ref, setFocus } = useFocus();
  const postArgs = {
    setIsLoading,
    setTodos,
    setInputText,
    setIsTyping,
    inputText,
    ref,
    formRef,
  };
  const searchArgs = {
    setIsLoading,
    setInputText,
    setIsTyping,
    setSuggestList,
    params,
    isMore,
  };
  const scrollArgs = {
    params,
    isMore,
    setSuggestList,
    setIsScrolling,
  };
  const handleChange = useSearch(searchArgs);
  const { handleSubmit, handleItemClick } = usePost(postArgs);
  const handleScroll = useScroll(scrollArgs);

  const handleBlur = ({ target }: Event) => {
    if ((target as HTMLElement).matches(".input-text")) return;
    setIsTyping(false);
    ref.current!.blur();
    blurInput(ref, formRef);
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
          value={inputText}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      {isLoading && <ImSpinner8 className="spinner" />}
      {isTyping && (
        <SuggestList
          suggestList={suggestList}
          clickHandler={handleItemClick}
          inputText={inputText}
          isMore={isMore}
          scrollHandler={handleScroll}
          isScrolling={isScrolling}
        />
      )}
    </form>
  );
};

export default InputTodo;
