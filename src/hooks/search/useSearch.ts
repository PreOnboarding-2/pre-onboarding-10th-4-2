import { ChangeEvent } from "react";
import { INITIAL_PAGE, INPUT_DELAY_TIME } from "../../constants";
import { UseSearchArgs } from "../../types/hook";
import { useDebounce } from "../common/useDebounce";
import { getSuggestList } from "../../api/suggest";

const useSearch = ({
  setInputText,
  setIsLoading,
  setIsTyping,
  setSuggestList,
  params,
  isMore,
}: UseSearchArgs) => {
  const debounce = useDebounce(INPUT_DELAY_TIME);

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setIsTyping(true);
    params.current.q = value;
    params.current.page = INITIAL_PAGE;
    setInputText(value);
    if (value.trim() === "") {
      setSuggestList([]);
      return;
    }

    const getSuggestions = async () => {
      try {
        if (params.current.q === "") return;

        setIsLoading(true);

        const res = await getSuggestList(params.current);
        const { page, limit, total, result } = res.data;

        isMore.current = page * limit < total;
        setSuggestList(result);
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };
    debounce(getSuggestions);
  };

  return onChangeHandler;
};

export default useSearch;
