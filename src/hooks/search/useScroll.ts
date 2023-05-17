import { UIEvent } from "react";
import { getSuggestList } from "../../api/suggest";
import { UseScrollArgs } from "../../types/hook";
import useThrottle from "../common/useThrottle";
import { SCROLL_DELAY_TIME } from "../../constants";

const useScroll = ({ params, isMore, setSuggestList, setIsScrolling }: UseScrollArgs) => {
  const throttle = useThrottle(SCROLL_DELAY_TIME);
  const onScrollHandler = ({ currentTarget }: UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = currentTarget;
    const isAtBottom = scrollTop + clientHeight === scrollHeight;

    if (!isMore.current || !isAtBottom) return;

    const getSuggestions = async () => {
      try {
        if (params.current.q === "") return;

        setIsScrolling(true);
        params.current.page = params.current.page + 1;

        const res = await getSuggestList(params.current);
        const { page, limit, total, result } = res.data;

        isMore.current = page * limit < total;
        setSuggestList(prev => [...prev, ...result]);
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setIsScrolling(false);
        if (params.current.q === "") setSuggestList([]);
      }
    };
    throttle(getSuggestions);
  };

  return onScrollHandler;
};

export default useScroll;
