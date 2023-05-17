import { useState } from "react";

export const useDebounce = (time: number) => {
  const [debounce, setDebounce] = useState(0);

  return (fnc: (...args: never[]) => unknown) => {
    if (debounce !== 0) clearTimeout(debounce);
    setDebounce(setTimeout(fnc, time));
  };
};