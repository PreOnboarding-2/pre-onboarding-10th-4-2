/**
 * @jest-environment jsdom
 */

// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

import { renderHook } from '@testing-library/react-hooks';
import useFocus from "../hooks/useFocus";
import usePost from "../hooks/usePost";
import useScroll from "../hooks/useScroll";
import { useState } from "react";


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

const hooksMock = {
  postArgs: {
    setIsLoading: useState,
    setTodos: useState,
    setInputText: useState,
    setIsTyping: useState,
    inputText: "te",
    ref: document.querySelector(".input-text"),
    formRef: document.querySelector(".form-container"),
  }
}

describe("hooks testing", () => {
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


