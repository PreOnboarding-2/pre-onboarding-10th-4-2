import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should call callback function after certain time', () => {
    const time = 500;
    const { result } = renderHook(() => useDebounce(time));

    const fnc = jest.fn();

    result.current(fnc);

    jest.advanceTimersByTime(time - 100);
    expect(fnc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fnc).toHaveBeenCalledTimes(1);
  });

  it('should debounce the previous function with clearTimeout', () => {
    const time = 500;
    const { result } = renderHook(() => useDebounce(time));

    const fnc1 = jest.fn();
    const fnc2 = jest.fn();

    result.current(fnc1);
    jest.advanceTimersByTime(time - 100);
    result.current(fnc2);
    
    jest.advanceTimersByTime(100);
    expect(fnc1).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(time - 100);
    expect(fnc2).toHaveBeenCalledTimes(1);
  });
});
