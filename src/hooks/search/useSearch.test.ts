import { renderHook } from '@testing-library/react-hooks';
import useSearch from './useSearch';
import { getSuggestList } from '../../api/suggest';
import { ChangeEvent } from 'react';

jest.mock('../../api/suggest');

describe('useSearch', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock the timers
  });
  
  afterEach(() => {
    jest.useRealTimers(); // Restore the original timers
  });

  it('should handle search input change and fetch suggestions', async () => {
    const setInputText = jest.fn();
    const setIsLoading = jest.fn();
    const setIsTyping = jest.fn();
    const setSuggestList = jest.fn();
    const params = { current: { q: '', page: 1, limit: 10 } };
    const isMore = { current: false };

    const { result } = renderHook(() =>
      useSearch({ setInputText, setIsLoading, setIsTyping, setSuggestList, params, isMore })
    );

    const event = { target: { value: 'example' } };

    result.current(event as ChangeEvent<HTMLInputElement>);
    
    jest.runAllTimers();

    expect(setInputText).toHaveBeenCalledWith('example');
    expect(setIsTyping).toHaveBeenCalledWith(true);
    // expect(setSuggestList).toHaveBeenCalledTimes(1);
    // expect(setIsLoading).toHaveBeenCalledTimes(2);
    // expect(setIsLoading).toHaveBeenNthCalledWith(1, true);
    // expect(setIsLoading).toHaveBeenNthCalledWith(2, false);
    expect(getSuggestList).toHaveBeenCalledTimes(1);
    expect(getSuggestList).toHaveBeenCalledWith({ q: 'example', page: 1, limit: 10 });
    // Assert other expectations for isMore, result, etc.
  });

  // it('should clear suggest list when input value is empty', async () => {
  //   const setInputText = jest.fn();
  //   const setIsLoading = jest.fn();
  //   const setIsTyping = jest.fn();
  //   const setSuggestList = jest.fn();
  //   const params = { current: { q: '', page: 1, limit: 10 } };
  //   const isMore = { current: false };

  //   const { result } = renderHook(() =>
  //     useSearch({ setInputText, setIsLoading, setIsTyping, setSuggestList, params, isMore })
  //   );

  //   const event = { target: { value: '' } };

  //   await result.current(event as ChangeEvent<HTMLInputElement>);

  //   expect(setInputText).toHaveBeenCalledWith('');
  //   expect(setIsTyping).toHaveBeenCalledWith(true);
  //   expect(setSuggestList).toHaveBeenCalledWith([]);
  //   expect(setIsLoading).toHaveBeenCalledTimes(1);
  //   expect(setIsLoading).toHaveBeenCalledWith(false);
  //   // Assert other expectations
  // });
});
