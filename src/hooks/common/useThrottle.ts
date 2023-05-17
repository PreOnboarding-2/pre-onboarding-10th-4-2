import { useState } from "react"

const useThrottle = (time: number) => {
  const [isThrottle, setIsThrottle] = useState(false);

  return (fnc: (...args: never[]) => unknown) => {
    if (isThrottle) return;
    setIsThrottle(true);
    setTimeout(() => {
      fnc();
      setIsThrottle(false);
    }, time);
  }
};

export default useThrottle;