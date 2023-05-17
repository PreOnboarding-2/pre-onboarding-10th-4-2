import "./SuggestList.css";
import SuggestItem from "./SuggestItem";
import { useEffect, useRef } from "react";
import { useTodoSuggest } from "../../../application/TodoSuggestProvider";

interface SuggestListProps {
  currentQuery: string;
}

const SuggestList = ({ currentQuery }: SuggestListProps) => {
  const { suggestedTodos, getSuggestedTodos, page, setPage } = useTodoSuggest();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isEmpty = suggestedTodos.length === 0;

  useEffect(() => {
    getSuggestedTodos(currentQuery, page);
  }, [currentQuery, page]);

  const onScroll = () => {
    if (
      scrollRef?.current!.scrollTop + scrollRef?.current!.clientHeight >=
      scrollRef?.current!.scrollHeight
    ) {
      setPage(prev => prev + 1);
    }
  };
  return (
    <div className="suggestion-wrapper" ref={scrollRef} onScroll={onScroll}>
      {isEmpty && <p className="suggest-none">추천 검색어 없음</p>}
      {suggestedTodos.map((item, index) => (
        <SuggestItem key={index} index={index} content={item} currentQuery={currentQuery} />
      ))}
    </div>
  );
};

export default SuggestList;
