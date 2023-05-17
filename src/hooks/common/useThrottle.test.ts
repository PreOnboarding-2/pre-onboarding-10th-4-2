import { renderHook } from "@testing-library/react-hooks";
import useThrottle from "./useThrottle";

jest.useFakeTimers();

describe('useThrottle', () => {
  it('should call callback function after a designated time', () => {
    const time = 500;
    const { result } = renderHook(() => useThrottle(time));

    const fnc = jest.fn();

    result.current(fnc);
    
    jest.advanceTimersByTime(time - 100);
    expect(fnc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fnc).toHaveBeenCalledTimes(1);
  });

  it('should throttle and not call callback functions that were passed during designated time', () => {
    const time = 500;
    const { result } = renderHook(() => useThrottle(time));

    const fnc1 = jest.fn();
    const fnc2 = jest.fn();

    result.current(fnc1);
    jest.advanceTimersByTime(time - 100);
    result.current(fnc2);

    jest.advanceTimersByTime(100);
    expect(fnc1).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(fnc2).not.toHaveBeenCalled();
  });
})