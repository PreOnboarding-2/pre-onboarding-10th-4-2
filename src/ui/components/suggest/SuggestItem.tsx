import { useTodo } from "../../../application/TodoProvider";
import "./SuggestItem.css";

interface SuggestItemProps {
  index: number;
  content: string;
  currentQuery: string;
}

const SuggestItem = ({ index, content, currentQuery }: SuggestItemProps) => {
  const { onCreateTodo } = useTodo();
  const regex = new RegExp(`(${currentQuery})`, "gi");
  const newText = content.split(regex).map((str, idx) => {
    if (currentQuery.toLowerCase() === str.toLowerCase())
      return (
        <span className="highlight" key={idx}>
          {str}
        </span>
      );
    return str;
  });
  const handleClickItem = async () => {
    await onCreateTodo(content);
  };
  return (
    <li className="suggest-item" onClick={handleClickItem}>
      {index}
      {newText}
    </li>
  );
};

export default SuggestItem;
