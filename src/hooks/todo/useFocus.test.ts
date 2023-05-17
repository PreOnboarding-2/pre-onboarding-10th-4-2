import { renderHook } from '@testing-library/react-hooks';
import useFocus from './useFocus';
import React from 'react';

describe('useFocus', () => {
  it('should set focus on the input element', () => {
    const { result } = renderHook(() => useFocus());
    const focusSpy = jest.spyOn(result.current.ref.current!, 'focus');

    // Render an input element with the ref from the hook
    React.createElement('input', { ref: result.current.ref });

    // Replace the ref in the hook with the ref from the input element
    // Invoke the setFocus function
    result.current.setFocus();

    // Expect the focus method to have been called
    expect(focusSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy function
    focusSpy.mockRestore();
  });

  // it('should not call focus if the input element is not set', () => {
  //   const { result } = renderHook(() => useFocus());
  //   const mockFocus = jest.fn();

  //   // Ensure the ref value is null
  //   result.current.ref.current = null;

  //   // Replace the focus method with the mock function
  //   document.createElement('input').focus = mockFocus;

  //   // Invoke the setFocus function
  //   result.current.setFocus();

  //   // Expect the focus method not to have been called
  //   expect(mockFocus).not.toHaveBeenCalled();
  // });
});
