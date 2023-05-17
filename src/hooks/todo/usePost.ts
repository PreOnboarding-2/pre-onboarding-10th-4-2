import { FormEvent, MouseEvent, useCallback } from "react";
import { UsePostArgs } from "../../types/hook";
import { createTodo } from "../../api/todo";
import { blurInput } from "../../utils";

const usePost = ({
  setIsLoading,
  setInputText,
  setIsTyping,
  setTodos,
  inputText,
  ref,
  formRef,
}: UsePostArgs) => {
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) return alert("Please write something");

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) return setTodos(prev => [...prev, data]);
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsTyping(false);
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  const handleItemClick = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      try {
        setIsLoading(true);

        const suggestion = (e.target as HTMLElement).textContent!;

        const newItem = { title: suggestion };
        const { data } = await createTodo(newItem);

        if (data) return setTodos(prev => [...prev, data]);
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
        setIsTyping(false);
        blurInput(ref, formRef);
      }
    },
    [setTodos]
  );

  return {
    handleSubmit,
    handleItemClick,
  };
};

export default usePost;
