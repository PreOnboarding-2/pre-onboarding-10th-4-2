import { renderHook, act } from '@testing-library/react-hooks';
import usePost from './usePost';
import { createTodo } from '../../api/todo';
import { FormEvent } from 'react';

// Mock the createTodo function
jest.mock("../../api/todo");
const createTodoMock = createTodo as jest.Mock<Promise<any>>;
createTodoMock.mockImplementation((data) => Promise.resolve({ data }));

describe('usePost', () => {

// Set a specific return value for the mock createTodo function
  it('should handle form submission', async () => {
    const setIsLoading = jest.fn();
    const setInputText = jest.fn();
    const setIsTyping = jest.fn();
    const setTodos = jest.fn();
    const inputText = 'Sample input';
    const ref = { current: null };
    const formRef = { current: null };
    
    // Mock the createTodo function to return a mock data response
    const mockData = { id: 1, title: 'Sample todo' };
    createTodoMock.mockResolvedValueOnce({ data: mockData });
    
    // Render the hook
    const { result } = renderHook(() =>
      usePost({
        setIsLoading,
        setInputText,
        setIsTyping,
        setTodos,
        inputText,
        ref,
        formRef
      })
    );

    // Invoke the handleSubmit function
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as FormEvent<HTMLFormElement>);
    });

    // Assertions
    expect(setIsLoading).toHaveBeenCalledTimes(2);
    expect(setInputText).toHaveBeenCalledWith('');
    expect(setIsTyping).toHaveBeenCalledWith(false);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(createTodo).toHaveBeenCalledWith({ title: 'Sample input' });
    expect(setTodos).toHaveBeenCalledWith([mockData]);
  });

  // it('should handle item click', async () => {
  //   const setIsLoading = jest.fn();
  //   const setInputText = jest.fn();
  //   const setIsTyping = jest.fn();
  //   const setTodos = jest.fn();
  //   const ref = { current: null };
  //   const formRef = { current: null };
    
  //   // Mock the createTodo function to return a mock data response
  //   const mockData = { id: 2, title: 'Clicked todo' };
  //   createTodo.mockResolvedValueOnce({ data: mockData });
    
  //   // Render the hook
  //   const { result } = renderHook(() =>
  //     usePost({
  //       setIsLoading,
  //       setInputText,
  //       setIsTyping,
  //       setTodos,
  //       inputText: '',
  //       ref,
  //       formRef
  //     })
  //   );

  //   // Invoke the handleItemClick function
  //   await act(async () => {
  //     await result.current.handleItemClick({
  //       target: { textContent: 'Clicked suggestion' }
  //     });
  //   });

  //   // Assertions
  //   expect(setIsLoading).toHaveBeenCalledTimes(2);
  //   expect(setInputText).toHaveBeenCalledWith('');
  //   expect(setIsTyping).toHaveBeenCalledWith(false);
  //   expect(setIsLoading).toHaveBeenCalledWith(false);
  //   expect(createTodo).toHaveBeenCalledWith({ title: 'Clicked suggestion' });
  //   expect(setTodos).toHaveBeenCalledWith([mockData]);
  // });
});
