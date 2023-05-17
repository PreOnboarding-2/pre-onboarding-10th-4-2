/**
 * @jest-environment jsdom
 */

// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

import { renderHook } from '@testing-library/react-hooks';
import useFocus from "../hooks/useFocus";
import usePost from "../hooks/usePost";
// import useScroll from "../hooks/useScroll";
import { useState } from "react";
// import useSearch from '../hooks/useSearch';
import { useDebounce } from "../hooks/useDebounce";
import { INPUT_DELAY_TIME } from '../constants';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("../hooks/useDebounce", () => {
  debounce: jest.fn(() => Promise.resolve());
})

const hooksMock = {
  postArgs: {
    setIsLoading: useState,
    setTodos: useState,
    setInputText: useState,
    setIsTyping: useState,
    inputText: "te",
    ref: document.querySelector(".input-text"),
    formRef: document.querySelector(".form-container"),
  },
  searchArgs: {
    setInputText: useState,
    setIsLoading: useState,
    setIsTyping: useState,
    setSuggestList: useState,
    params: {
      current: {
        q: "te",
        page: 1,
        limit: 10
      }
    },
    isMore: {
      current: false
    },
  }
}

describe("hooks testing", () => {
  test('useDebounce', () => {
    const { result } = renderHook(() => {
      const debounce = useDebounce(INPUT_DELAY_TIME);
      return debounce(debounce)
    });
    console.log(result)
  });

  test('useFocus', () => {
    const { result } = renderHook(() => useFocus());
    console.log(result.current);
  });

  test('usePost', () => {
    const { result } = renderHook(
      (initialProps: any) => usePost(initialProps),
      { initialProps: hooksMock.postArgs }
    );
    console.log(result.current);
  });

  test('useScroll', () => {

  });

  test("useSearch", () => {

  });

  test("useThrottle", () => {

  });
})


